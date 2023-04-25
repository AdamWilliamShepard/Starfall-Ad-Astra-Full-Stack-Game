import React from "react";
import { useRef } from "react";
// Sprite Class needs to be componentized here
export function SpriteWrapper() {
    const canvasRef = useRef(null);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

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
}