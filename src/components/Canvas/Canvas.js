import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';


function Canvas(props) {
    const canvasRef = useRef(null);
    const collision = useSelector(store => store.collisionReducer)
    const battleZoneData = useSelector(store => store.battleZonesReducer)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // loops through our array for each row (which is 70 wide) and push them into a new array by row.
        const collisionMap = []
        for (let i = 0; i < collision.length; i += 70) {
            collisionMap.push(collision.slice(i, 70 + i))
        }

        const battleZonesMap = []
        for (let i = 0; i < battleZoneData.length; i += 70) {
            battleZonesMap.push(battleZoneData.slice(i, 70 + i))
        }

        //individual boundary blocks which will create our collision map
        class Boundary {
            static width = 48
            static height = 48
            constructor({ position }) {
                this.position = position
                this.width = 48
                this.height = 48
            }
            //drawing our boundary blocks as red/transparent and filling them based on coords and height/width
            draw() {
                context.fillStyle = "rgba(255, 0, 0, 0.5)"
                context.fillRect(this.position.x, this.position.y, this.width, this.height)
            }
        }

        //Create a new class called sprite which we can use multiple times for various sprites.
        class Sprite {
            //constructor allows me to define the arguments that each sprite will take it when created.
            constructor({ position, velocity, image, frames = { max: 1, hold: 10 }, sprites = [], animate = false, isEnemy = false }) {
                this.position = position
                this.image = image
                this.frames = { ...frames, val: 0, elapsed: 0 }
                this.image.onload = () => {
                    this.width = this.image.width / this.frames.max
                    this.height = this.image.height
                }
                this.animate = animate
                this.sprites = sprites
                this.opacity = 1
                this.health = 100 // this can be scaled up by passing in additional arguments later
                this.isEnemy = isEnemy
            }
            //function to draw the image onto the screen at the associated coordinates.
            draw() {
                context.save() // when using a global canvas property it will only affect the items between save and restore
                context.globalAlpha = this.opacity
                context.drawImage(
                    this.image,
                    this.frames.val * this.width, //starting x coord of crop which will change as the player moves
                    0, //starting y coord of crop
                    this.image.width / this.frames.max, //slicing the sprite-sheet down to 1/4 its size (one sprite)
                    this.image.height, //sprite-sheet is only a single sprite high, so no need for change here.
                    this.position.x,
                    this.position.y,
                    this.image.width / this.frames.max, //resolution to be rendered at
                    this.image.height, //resolution to be rendered at
                )
                context.restore()

                if (!this.animate) return
                if (this.frames.max > 1) { //If we have a sprite-sheet with more than 1 frame
                    this.frames.elapsed++ //incremement frames elapsed
                }
                if (this.frames.elapsed % this.frames.hold === 0) { //if the number is divisible by 10 then call the below statement. This slows down our sprite
                    //so they do not appear to be running.
                    if (this.frames.val < this.frames.max - 1) this.frames.val++ // increment each time we draw the frame.
                    else this.frames.val = 0 //reset to the beginning of the first sprite.
                }
            }
            attack({ attack, recipient }) {
                const tl = gsap.timeline()

                let movementDistance = 20
                if (this.isEnemy) movementDistance -20

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2,
                    duration: 0.1,
                    onComplete: () => {
                        //enemy actually gets hit
                        gsap.to('#enemyHealthBar', {
                            width: this.health - attack.damage + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 10,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.08,
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            repeat: 5,
                            yoyo: true,
                            duration: 0.08
                        })
                    }
                }).to(this.position, {
                    x: this.position.x
                })
            }
        }

        //Array for pushing our collision boundaries into.
        const boundaries = []

        //constant for the offset for our map starting position
        const offset = {
            x: -735,
            y: -655
        }

        //looping over each row where i is the index of the row and each symbol within that row where j is the index of the symbol. 
        //ergo 'i' is the y axis and 'j' is the x axis.
        collisionMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025)
                    boundaries.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y
                            }
                        })
                    )
            })
        })

        const battleZones = []

        battleZonesMap.forEach((row, i) => {
            row.forEach((symbol, j) => {
                if (symbol === 1025)
                    battleZones.push(
                        new Boundary({
                            position: {
                                x: j * Boundary.width + offset.x,
                                y: i * Boundary.height + offset.y
                            }
                        })
                    )
            })
        })

        const backgroundImage = new Image()
        backgroundImage.src = require('../img/PelletTown.png')

        const foregroundImage = new Image()
        foregroundImage.src = require('../img/foregroundObjects.png')

        const playerDownImage = new Image()
        playerDownImage.src = require('../img/playerDown.png')

        const playerUpImage = new Image()
        playerUpImage.src = require('../img/playerUp.png')

        const playerLeftImage = new Image()
        playerLeftImage.src = require('../img/playerLeft.png')

        const playerRightImage = new Image()
        playerRightImage.src = require('../img/playerRight.png')

        const battleBackgoundImage = new Image()
        battleBackgoundImage.src = require('../img/battleBackground.png')

        const draggleImage = new Image()
        draggleImage.src = require('../img/draggleSprite.png')

        const embyImage = new Image()
        embyImage.src = require('../img/embySprite.png')

        //sprite for the player.
        const player = new Sprite({
            position: {
                x: canvas.width / 2 - (192 / 4) / 2, //location to be rendered at on the x coord, 192 is pixels of the sprite-sheet
                y: canvas.height / 2 - 68 / 2, //location to be rendered at on the y coord, 68 is pixels of the sprite-sheet
            },
            image: playerDownImage,
            frames: {
                max: 4,
                hold: 10
            },
            sprites: {
                up: playerUpImage,
                left: playerLeftImage,
                right: playerRightImage,
                down: playerDownImage
            }
        })

        //Create a new sprite called background using the image and at the given coords.
        const background = new Sprite({
            position: {
                x: offset.x,
                y: offset.y
            },
            image: backgroundImage
        })

        //Create a new sprite called foreground using the image and at the given coords.
        const foreground = new Sprite({
            position: {
                x: offset.x,
                y: offset.y
            },
            image: foregroundImage
        })

        //constant for the values of the keys- boolean to control movement.
        const keys = {
            w: {
                pressed: false
            },
            a: {
                pressed: false
            },
            s: {
                pressed: false
            },
            d: {
                pressed: false
            }
        }

        //Constant for items that will move along with the background.
        const moveables = [background, ...boundaries, foreground, ...battleZones]

        //collision detection. rectangle1 is the player, rectangle2 is another object.
        function rectangularCollision({ rectangle1, rectangle2 }) {
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            )
        }

        const battle = {
            initiated: false
        }

        // Loop the image continously to provide animation.
        function animate() {
            const animationId = window.requestAnimationFrame(animate)

            //The background image to be displayed, the x coord and the y coord
            background.draw()
            boundaries.forEach(Boundary => {
                Boundary.draw()
                //collision detection between the player and a boundary.
            })
            battleZones.forEach(battleZone => {
                battleZone.draw()
            })
            player.draw()
            foreground.draw()

            let moving = true
            player.animate = false

            if (battle.initiated) return

            //activate a battle
            if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
                for (let i = 0; i < battleZones.length; i++) {
                    const battleZone = battleZones[i]
                    const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)
                        - Math.max(player.position.x, battleZone.position.x))
                        * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height)
                            - Math.max(player.position.y, battleZone.position.y))

                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: battleZone
                    }) &&
                        overlappingArea > player.width * player.height / 2 //If 1/2 of the sprite is in the battle zone, it is colliding
                        && Math.random() < 0.01
                    ) {
                        console.log('activate battle')
                        //deactivate current activation loop
                        // window.cancelAnimationFrame(animationId)
                        battle.initiated = true
                        gsap.to('#overlappingDiv', {
                            opacity: 1,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.4,
                            onComplete() {
                                gsap.to('#overlappingDiv', {
                                    opacity: 1,
                                    duration: 0.4,
                                    onComplete() {
                                        animateBattle()
                                        gsap.to('#overlappingDiv', {
                                            opacity: 0,
                                            duration: 0.4
                                        })
                                    }
                                })
                            }
                        })
                        break
                    }
                }
            }

            //If any of the associated keys are pressed moved the background position by 3 pixels each 'tick' and detecting for boundary
            //collision
            // let moving = true
            // player.moving = false
            if (keys.w.pressed && lastkey === 'w') {
                player.animate = true
                player.image = player.sprites.up
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y + 3
                            }
                        }
                    })) {
                        moving = false
                        break
                    }
                }

                if (moving)
                    moveables.forEach(movable => { movable.position.y += 3 })
            }
            else if (keys.a.pressed && lastkey === 'a') {
                player.animate = true
                player.image = player.sprites.left
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x + 3,
                                y: boundary.position.y
                            }
                        }
                    })
                    ) {
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.x += 3 })
            }
            else if (keys.s.pressed && lastkey === 's') {
                player.animate = true
                player.image = player.sprites.down
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x,
                                y: boundary.position.y - 3
                            }
                        }
                    })
                    ) {
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.y -= 3 })
            }
            else if (keys.d.pressed && lastkey === 'd') {
                player.animate = true
                player.image = player.sprites.right
                for (let i = 0; i < boundaries.length; i++) {
                    const boundary = boundaries[i]
                    if (rectangularCollision({
                        rectangle1: player,
                        rectangle2: {
                            ...boundary,
                            position: {
                                x: boundary.position.x - 3,
                                y: boundary.position.y
                            }
                        }
                    })
                    ) {
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.x -= 3 })
            }
        }

        //calling the animate function
        // animate() ****************************************De-activated for the moment so I can work on the battle sequence

        const battleBackground = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            image: battleBackgoundImage
        })

        //enemy battle combatant
        const draggle = new Sprite({
            position: {
                x: 800,
                y: 100
            },
            image: draggleImage,
            frames: {
                max: 4,
                hold: 30
            },
            animate: true,
            isEnemy: true
        })

        //player battle combatant
        const emby = new Sprite({
            position: {
                x: 280,
                y: 350
            },
            image: embyImage,
            frames: {
                max: 4,
                hold: 30
            },
            animate: true
        })

        function animateBattle() {
            window.requestAnimationFrame(animateBattle)
            battleBackground.draw()
            draggle.draw()
            emby.draw()
        }

        animateBattle() //************************************Activated so I can work on this. */

        document.querySelectorAll('button').forEach((button) => {
            button.addEventListener('click', () => {
                draggle.attack({
                    attack: {
                        name: 'Tackle',
                        damage: 10,
                        type: 'Normal'
                    },
                    recipient: emby
                })
            })
        })

        //event listener for key-down presses
        let lastkey = ''
        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = true
                    lastkey = 'w'
                    break
                case 'a':
                    keys.a.pressed = true
                    lastkey = 'a'
                    break
                case 's':
                    keys.s.pressed = true
                    lastkey = 's'
                    break
                case 'd':
                    keys.d.pressed = true
                    lastkey = 'd'
                    break
            }
        })

        //event listener for key-up presses
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'w':
                    keys.w.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
                case 's':
                    keys.s.pressed = false
                    break
                case 'd':
                    keys.d.pressed = false
                    break
            }
        })
    }, []);

    return (
        <div className='battleTransitionParent'>
            <div className='battleTransition' id='overlappingDiv'></div>
            <div className='nameCardEnemy'>
                <h1 className='nameBar'>Draggle</h1>
                <div style={{ position: 'relative' }}>
                    <div className='healthBarEmpty'></div>
                    <div className='healthBar' id="enemyHealthBar"></div>
                </div>
            </div>

            <div className='nameCardHero'>
                <h1 className='nameBar'>Emby</h1>
                <div style={{ position: 'relative' }}>
                    <div className='healthBarEmpty'></div>
                    <div className='healthBar'></div>
                </div>
            </div>

            <canvas ref={canvasRef}
                width="1024"
                height="576"
                {...props}></canvas>
            <div className='battleText' >
                <div className='attackDiv'>
                    <button className='attackBtn'>Tackle</button>
                    <button className='attackBtn'>Attack2</button>
                    <button className='attackBtn'>Attack3</button>
                    <button className='attackBtn'>Attack4</button>
                </div>
                <div className='attackTypeDiv'>
                    <h3 className='battleFont'>Attack Type</h3>
                </div>
            </div>
        </div>
    );
}

export default Canvas;