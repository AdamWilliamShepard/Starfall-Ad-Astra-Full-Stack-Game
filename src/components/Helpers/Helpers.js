import { Howl } from "howler"
import { map, localMapSoundSrc, fireballHit, initBattleSound, initFireball, battle, tackleHit, victory } from '../Audio/AudioHelper';

export const audio = {
    Map: new Howl({
        src: map,
        html5: true
    }),
    initBattle: new Howl({
        src: initBattleSound,
        html5: true
    }),
    battle: new Howl({
        src: battle,
        html5: true
    })
}