import { dragonBones } from 'dragonbones-dom'

const clock = new dragonBones.WorldClock()
let time = Date.now()
const ticker = () => {
    const now = Date.now()
    clock.advanceTime((now - time) / 1000)
    time = now
    requestAnimationFrame(ticker)
}
ticker()

export function WindUp(obj: dragonBones.IAnimatable): void {
    clock.add(obj)
}

export function WindDown(obj: dragonBones.IAnimatable): void {
    clock.remove(obj)
}