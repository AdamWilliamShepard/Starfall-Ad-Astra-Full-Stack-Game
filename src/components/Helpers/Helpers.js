import { Howl } from "howler"
import { map, localMapSoundSrc, fireballHit, initBattleSound, initFireball, battle, tackleHit, victory } from '../Audio/AudioHelper';

export const audio = {
    Map: new Howl({
        src: map,
        html5: true,
        volume: 0.1
    }),
    initBattle: new Howl({
        src: initBattleSound,
        html5: true,
        volume: 0.1
    }),
    battle: new Howl({
        src: battle,
        html5: true,
        volume: 0.1
    }),
    tackleHit: new Howl({
        src: tackleHit,
        html5: true,
        volume: 0.1
    }),
    fireballHit: new Howl({
        src: fireballHit,
        html5: true,
        volume: 0.1
    }),
    initFireball: new Howl({
        src: initFireball,
        html5: true,
        volume: 0.1
    }),
    victory: new Howl({
        src: victory,
        html5: true,
        volume: 0.3
    })
}