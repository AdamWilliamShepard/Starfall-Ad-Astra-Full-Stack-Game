import { Howl } from "howler"

export const callMapSound = (src) => {
            const mapSound = new Howl({
                src,
                html5: true,
            })
            mapSound.play()
        }