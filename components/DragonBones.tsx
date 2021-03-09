import { dragonBones } from 'dragonbones-dom'
import { Component, createRef, PureComponent, ReactElement } from 'react'
import { WindDown, WindUp } from '../utils/clock'

type Props = {
    armature: dragonBones.Armature
}

export default class DragonBones extends PureComponent<Props>{

    private divRef = createRef<HTMLDivElement>()

    componentDidMount(): void {
        const {
            armature,
        } = this.props
        WindUp(armature)
        this.divRef.current!.appendChild(armature.display)
    }

    componentDidUpdate(prevPros: Props): void {
        WindDown(prevPros.armature)
        this.divRef.current!.removeChild(prevPros.armature.display)
        WindUp(this.props.armature)
        this.divRef.current!.appendChild(this.props.armature.display)
    }

    componentWillUnmount(): void {
        const {
            armature,
        } = this.props
        WindDown(armature)
        this.divRef.current?.removeChild(armature.display)
    }

    render(): ReactElement {
        const {
            armature,
        } = this.props
        const aabb = armature.armatureData.aabb
        return <div ref={this.divRef} style={{
            width: aabb.width,
            height: aabb.height,
            transform: `translate(${-aabb.x}px,${-aabb.y}px)`
        }} />
    }
}