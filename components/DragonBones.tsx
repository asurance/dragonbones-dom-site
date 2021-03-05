import { dragonBones } from 'dragonbones-dom'
import { Component, ReactElement } from 'react'
import { WindDown, WindUp } from '../utils/clock'

type Props = {
    armature: dragonBones.Armature
}

export default class DragonBones extends Component<Props>{

    componentDidMount(): void {
        const {
            armature,
        } = this.props
        WindUp(armature)
    }

    componentWillUnmount(): void {
        const {
            armature,
        } = this.props
        WindDown(armature)
    }

    render(): ReactElement {
        const {
            armature,
        } = this.props
        const aabb = armature.armatureData.aabb
        return <div ref={this.onGetDivRef} style={{
            width: aabb.width,
            height: aabb.height,
        }} />
    }

    private onGetDivRef = (ref: HTMLDivElement | null) => {
        if (!ref) return
        const {
            armature,
        } = this.props
        if (armature.display.parentNode !== ref) {
            if (armature.display.parentNode) {
                armature.display.parentNode.removeChild(armature.display)
            }
            ref.appendChild(armature.display)
        }
    }
}