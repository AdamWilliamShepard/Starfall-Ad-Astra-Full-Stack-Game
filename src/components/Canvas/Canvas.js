import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';


function Canvas(props) {
    const canvasRef = useRef(null);
    //collision is an array which comes from the package json from the collision map
    const collision = useSelector(store => store.collisionReducer)
    // console.log(collision)

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        // console.log(context)

        // loops through our array for each row (which is 70 wide) and push
        //them into a new array by row.
        const collisionMap = []
        for (let i = 0; i < collision.length; i += 70) {
            collisionMap.push(collision.slice(i, 70 + i))
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
        class Sprite {
            //constructor allows me to define the arguments that each sprite will take it when created.
            constructor({ position, velocity, image, frames = { max: 1 }, sprites=[] }) {
                this.position = position
                this.image = image
                this.frames = { ...frames, val: 0, elapsed: 0 }
                this.image.onload = () => {
                    this.width = this.image.width / this.frames.max
                    this.height = this.image.height
                }
                this.moving = false
                this.sprites = sprites
            }
            //function to draw the image onto the screen at the associated coordinates.
            draw() {
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
                if (!this.moving) return
                if (this.frames.max > 1) { //If we have a sprite-sheet with more than 1 frame
                    this.frames.elapsed++ //incremement frames elapsed
                }
                if (this.frames.elapsed % 10 === 0) { //if the number is divisible by 10 then call the below statement. This slows down our sprite
                    //so they do not appear to be running.
                    if (this.frames.val < this.frames.max - 1) this.frames.val++ // increment each time we draw the frame.
                    else this.frames.val = 0 //reset to the beginning of the first sprite.
                }
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
                        }))
            })
        })

        //Our background image
        const image = new Image()
        image.src = require('../img/PelletTown.png')

        //Our foreground image
        const foregroundImage = new Image()
        foregroundImage.src = require('../img/foregroundObjects.png')

        //Our player image
        const playerDownImage = new Image()
        playerDownImage.src = require('../img/playerDown.png')

        const playerUpImage = new Image()
        playerUpImage.src = require('../img/playerUp.png')

        const playerLeftImage = new Image()
        playerLeftImage.src = require('../img/playerLeft.png')

        const playerRightImage = new Image()
        playerRightImage.src = require('../img/playerRight.png')

        //sprite for the player.
        const player = new Sprite({
            position: {
                x: canvas.width / 2 - (192 / 4) / 2, //location to be rendered at on the x coord, 192 is pixels of the sprite-sheet
                y: canvas.height / 2 - 68 / 2, //location to be rendered at on the y coord, 68 is pixels of the sprite-sheet
            },
            image: playerDownImage,
            frames: {
                max: 4
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
            image: image
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
        const moveables = [background, ...boundaries, foreground]

        //collision detection. rectangle1 is the player, rectangle2 is another object.
        function rectangularCollision({ rectangle1, rectangle2 }) {
            return (
                rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
                rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
                rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
                rectangle1.position.y + rectangle1.height >= rectangle2.position.y
            )
        }

        // Loop the image continously to provide animation.
        function animate() {
            window.requestAnimationFrame(animate)

            //The background image to be displayed, the x coord and the y coord
            background.draw()
            boundaries.forEach(Boundary => {
                Boundary.draw()
                //collision detection between the player and a boundary.
            })
            player.draw()
            foreground.draw()

            //If any of the associated keys are pressed moved the background position by 3 pixels each 'tick' and detecting for boundary
            //collision
            let moving = true
            player.moving = false
            if (keys.w.pressed && lastkey === 'w') {
                player.moving = true
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
                    })
                    ) {
                        console.log('colliding')
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.y += 3 })
            }
            else if (keys.a.pressed && lastkey === 'a') {
                player.moving = true
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
                        console.log('colliding')
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.x += 3 })
            }
            else if (keys.s.pressed && lastkey === 's') {
                player.moving = true
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
                        console.log('colliding')
                        moving = false
                        break
                    }
                }
                if (moving)
                    moveables.forEach(movable => { movable.position.y -= 3 })
            }
            else if (keys.d.pressed && lastkey === 'd') {
                player.moving = true
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
                        console.log('colliding')
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
        <canvas ref={canvasRef}
            width="1024"
            height="576"
            {...props}></canvas>
    );
}

export default Canvas;
