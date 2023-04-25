import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { audio } from '../Helpers/Helpers';


const Canvas = (props) => {
    const canvasRef = useRef(null);
    const backgroundRef = useRef(null)
    const dispatch = useDispatch()
    const collision = useSelector(store => store.collisionReducer)
    const battleZoneData = useSelector(store => store.battleZonesReducer)
    const attacks = useSelector(store => store.attacksReducer)
    // const [offset, setOffset] = useState({ x: -956, y: -475 })

    let offset = useSelector(store => store.savePositionReducer)
    console.log('this is offset', offset)

    let [saveCoord, setSaveCoord] = useState({})

    // const fetchData = async () => {
    //     dispatch({ type: 'GET_SAVE_INFO' })
    // }
    // fetchData()

    useEffect(() => {
        if (offset.x != -955) {

            const fetchData = async () => {
                dispatch({ type: 'GET_SAVE_INFO' })
            }
            fetchData()

            if (backgroundRef.current) {
                backgroundRef.current.position.x = offset.x;
                backgroundRef.current.position.y = offset.y;
            }

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
                    context.fillStyle = "rgba(255, 0, 0, 0.0)"
                    context.fillRect(this.position.x, this.position.y, this.width, this.height)
                }
            }

            //Create a new class called sprite which we can use multiple times for various sprites.
            //constructor allows me to define the arguments that each sprite will take it when created.
            class Sprite {
                constructor({
                    position,
                    velocity,
                    image,
                    frames = { max: 1, hold: 10 },
                    sprites = [],
                    animate = false,
                    rotation = 0,
                }) {
                    this.position = position
                    this.image = new Image()
                    this.frames = { ...frames, val: 0, elapsed: 0 }
                    this.image.onload = () => {
                        this.width = this.image.width / this.frames.max
                        this.height = this.image.height
                    }
                    this.image.src = image.src
                    this.animate = animate
                    this.sprites = sprites
                    this.opacity = 1
                    this.rotation = rotation

                }
                //function to draw the image onto the screen at the associated coordinates.
                draw() {
                    context.save() // when using a global canvas property it will only affect the items between save and restore
                    context.translate(
                        this.position.x + this.width / 2,
                        this.position.y + this.height / 2) // moves the translation rotation point to the center of the sprite rather than the default top left corner
                    context.rotate(this.rotation)
                    context.translate(
                        -this.position.x - this.width / 2,
                        -this.position.y - this.height / 2)
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
            }

            class Monster extends Sprite {
                constructor({
                    position,
                    velocity,
                    image,
                    frames = { max: 1, hold: 10 },
                    sprites = [],
                    animate = false,
                    rotation = 0,
                    isEnemy = false,
                    name,
                    attacks
                }) {
                    super({
                        position,
                        velocity,
                        image,
                        frames,
                        sprites,
                        animate,
                        rotation
                    })
                    this.health = 100 // this can be scaled up by passing in additional arguments later
                    this.isEnemy = isEnemy
                    this.name = name
                    this.attacks = attacks
                }

                faint() {
                    document.querySelector('#dialogueBox').innerHTML =
                        this.name + ' fainted! '
                    gsap.to(this.position, {
                        y: this.position.y + 20
                    })
                    gsap.to(this, {
                        opacity: 0
                    })
                    audio.battle.stop()
                    audio.victory.play()
                }

                attack({ attack, recipient, renderedSprites }) {
                    document.querySelector('#dialogueBox').style.display = 'block'
                    document.querySelector('#dialogueBox').innerHTML =
                        this.name + ' used ' + attack.name
                    let healthBar = '#enemyHealthBar'
                    if (this.isEnemy) healthBar = '#playerHealthBar'

                    let rotation = 1
                    if (this.isEnemy) rotation = -2.2

                    recipient.health -= attack.damage

                    switch (attack.name) {
                        case 'Fireball':
                            audio.initFireball.play()
                            const fireballImage = new Image()
                            fireballImage.src = require('../img/fireball.png')
                            const fireball = new Sprite({
                                position: {
                                    x: this.position.x,
                                    y: this.position.y
                                },
                                image: fireballImage,
                                frames: {
                                    max: 4,
                                    hold: 10
                                },
                                animate: true,
                                rotation
                            })

                            renderedSprites.splice(1, 0, fireball)

                            gsap.to(fireball.position, {
                                x: recipient.position.x,
                                y: recipient.position.y,
                                onComplete: () => {
                                    //enemy actually gets hit
                                    audio.fireballHit.play()
                                    gsap.to(healthBar, {
                                        width: recipient.health + '%'
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
                                    renderedSprites.splice(1, 1)
                                }
                            })

                            break

                        case 'Tackle':
                            const tl = gsap.timeline()

                            let movementDistance = 20
                            if (this.isEnemy) movementDistance = -20

                            tl.to(this.position, {
                                x: this.position.x - movementDistance
                            }).to(this.position, {
                                x: this.position.x + movementDistance * 2,
                                duration: 0.1,
                                onComplete: () => {
                                    //enemy actually gets hit
                                    audio.tackleHit.play()
                                    gsap.to(healthBar, {
                                        width: recipient.health + '%'
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

                            break;
                    }
                }
            }

            //Array for pushing our collision boundaries into.
            const boundaries = []

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
            backgroundImage.src = require('../img/StarfallTileMap.png')

            const foregroundImage = new Image()
            foregroundImage.src = require('../img/StarfallForeground.png')

            const playerDownImage = new Image()
            playerDownImage.src = require('../img/playerDown.png')

            const playerUpImage = new Image()
            playerUpImage.src = require('../img/playerUp.png')

            const playerLeftImage = new Image()
            playerLeftImage.src = require('../img/playerLeft.png')

            const playerRightImage = new Image()
            playerRightImage.src = require('../img/playerRight.png')

            const player = new Sprite({
                position: {
                    x: canvas.width / 2 - (192 / 4) / 2,
                    //location to be rendered at on the x coord, 192 is pixels of the sprite-sheet
                    y: canvas.height / 2 - 68 / 2,
                    //location to be rendered at on the y coord, 68 is pixels of the sprite-sheet
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

            backgroundRef.current = background

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
                // console.log(background.position)
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

                            //deactivate current activation loop
                            window.cancelAnimationFrame(animationId)

                            audio.Map.stop()
                            audio.initBattle.play()
                            audio.battle.play()

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
                                            initBattle()
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
            animate()

            const battleBackgoundImage = new Image()
            battleBackgoundImage.src = require('../img/battleBackground.png')
            const battleBackground = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                image: battleBackgoundImage
            })

            //enemy battle combatant
            const draggleImage = new Image()
            draggleImage.src = require('../img/draggleSprite.png')
            let draggle

            //player battle combatant
            const embyImage = new Image()
            embyImage.src = require('../img/embySprite.png')

            let emby
            let renderedSprites
            let battleAnimationId
            //queue for enemy attacks
            let queue

            function initBattle() {
                document.querySelector('#userInterface').style.display = 'block'
                document.querySelector('#dialogueBox').style.display = 'none'
                document.querySelector('#enemyHealthBar').style.width = '100%'
                document.querySelector('#playerHealthBar').style.width = '100%'
                document.querySelector('#attacksBox').replaceChildren()

                draggle = new Monster({
                    position: {
                        x: 750,
                        y: 200
                    },
                    image: {
                        src: require('../img/draggleSprite.png')
                    },
                    frames: {
                        max: 4,
                        hold: 30
                    },
                    animate: true,
                    isEnemy: true,
                    name: 'Draggle',
                    attacks: [attacks.Tackle, attacks.Fireball]
                })
                emby = new Monster({
                    position: {
                        x: 280,
                        y: 350
                    },
                    image: {
                        src: require('../img/embySprite.png')
                    },
                    frames: {
                        max: 4,
                        hold: 30
                    },
                    animate: true,
                    name: 'Emby',
                    attacks: [attacks.Tackle, attacks.Fireball]
                })

                renderedSprites = [draggle, emby]
                queue = []

                emby.attacks.forEach(attack => {
                    const button = document.createElement('button')
                    button.innerHTML = attack.name
                    document.querySelector('#attacksBox').append(button)
                })

                //Event listeners for our attack buttons
                document.querySelectorAll('button').forEach((button) => {
                    button.addEventListener('click', (event) => {

                        //using a hashmap rather than a for loop to quickly target what we want
                        const selectedAttack = attacks[event.currentTarget.innerHTML]
                        emby.attack({
                            attack: selectedAttack,
                            recipient: draggle,
                            renderedSprites
                        })

                        if (draggle.health <= 0) {
                            queue.push(() => {
                                draggle.faint()
                            })
                            queue.push(() => {
                                //fade back to black
                                gsap.to('#overlappingDiv', {
                                    opacity: 1,
                                    onComplete: () => {
                                        cancelAnimationFrame(battleAnimationId)
                                        animate()
                                        document.querySelector('#userInterface').style.display = 'none'
                                        gsap.to('#overlappingDiv', {
                                            opacity: 0
                                        })
                                        battle.initiated = false
                                        audio.Map.play()
                                    }
                                })
                            })
                        }
                        //draggle or enemy attacks here
                        const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]

                        queue.push(() => {
                            draggle.attack({
                                attack: randomAttack,
                                recipient: emby,
                                renderedSprites
                            })
                            if (emby.health <= 0) {
                                queue.push(() => {
                                    emby.faint()
                                })
                                queue.push(() => {
                                    //fade back to black
                                    gsap.to('#overlappingDiv', {
                                        opacity: 1,
                                        onComplete: () => {
                                            cancelAnimationFrame(battleAnimationId)
                                            animate()
                                            document.querySelector('#userInterface').style.display = 'none'
                                            gsap.to('#overlappingDiv', {
                                                opacity: 0
                                            })
                                            battle.initiated = false
                                            audio.Map.play()
                                        }
                                    })
                                })
                            }
                        })
                    })
                    button.addEventListener('mouseenter', (event) => {
                        const selectedAttack = attacks[event.currentTarget.innerHTML]
                        document.querySelector('#attackType').innerHTML = selectedAttack.type
                        document.querySelector('#attackType').style.color = selectedAttack.color
                    })
                })

            }

            function animateBattle() {
                battleAnimationId = window.requestAnimationFrame(animateBattle)
                battleBackground.draw()
                renderedSprites.forEach((sprite) => {
                    sprite.draw()
                })
            }

            document.querySelector('#dialogueBox').addEventListener('click', (event) => {
                if (queue.length > 0) {
                    queue[0]()
                    queue.shift()
                } else
                    event.currentTarget.style.display = 'none'
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
            let clicked = false
            addEventListener('click', () => {
                if (!clicked) {
                    audio.Map.play()
                    clicked = true
                }
            })
        }
    }, []);

    const handleSave = (event) => {
        if (backgroundRef.current) {
            setSaveCoord({
                x: backgroundRef.current.position.x,
                y: backgroundRef.current.position.y
            })
        }
        dispatch({
            type: 'POST_SAVE_INFO',
            payload: saveCoord
        })
        console.log('This is the saveCoord payload', saveCoord)
    }

    return (
        <div className='battleTransitionParent'>
            <div className='battleTransition' id='overlappingDiv'></div>
            <div className='menu'>
                <button className='menuBtn' onClick={handleSave}> Save</button><br />
                <button className='menuBtn'> Menu</button><br />
                <button className='menuBtn'> Sound</button><br />
            </div>
            <canvas ref={canvasRef}
                width="1024"
                height="576"
                {...props}>
            </canvas>
            <div id="userInterface" style={{ display: 'none' }}>
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
                        <div className='healthBar' id="playerHealthBar"></div>
                    </div>
                </div>

                <div className='battleText' >
                    <div className='battleDialogue' id='dialogueBox' style={{ display: 'none' }}></div>
                    <div className='attackDiv' id="attacksBox"></div>
                    <div className='attackTypeDiv'>
                        <h3 className='battleFont' id="attackType">Attack Type</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;