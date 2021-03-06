import { dragonBones } from 'dragonbones-dom'
import { PureComponent, ReactElement } from 'react'
import { CreateArmatures, GetDefaultArmature, JsonLoader, PngLoader } from '../utils/dragonbones'
import DragFile from './DragFile'
import DragonBones from './DragonBones'
import List from './List'

const movieWidth = 480
const movieHeight = 480

type State = {
    armatures: dragonBones.Armature[]
    armatureIndex: number
    animationIndex: number
}
export default class Dragon extends PureComponent<unknown, State>{
    private skeletonJson: File | null = null
    private textureJson: File | null = null
    private texturePng: File | null = null
    private lastArmature: dragonBones.Armature

    constructor(props: unknown) {
        super(props)
        this.state = {
            armatures: [GetDefaultArmature()],
            armatureIndex: 0,
            animationIndex: 0,
        }
        this.lastArmature = this.state.armatures[0]
        const animation = this.lastArmature.animation
        animation.play(animation.animationNames[0])
    }

    private onSelectArmature = (index: number) => {
        this.lastArmature.animation.stop()
        this.lastArmature = this.state.armatures[index]
        const animation = this.lastArmature.animation
        animation.play(animation.animationNames[0])
        this.setState({
            armatureIndex: index,
            animationIndex: 0,
        })
    }

    private onSelectAnimation = (index: number) => {
        const armature = this.state.armatures[this.state.armatureIndex]
        const animationNames = armature.animation.animationNames
        armature.animation.play(animationNames[index])
        this.setState({
            animationIndex: index
        })
    }

    private onDropSkeletonJson = (file: File) => {
        this.skeletonJson = file
    }

    private onDropTextureJson = (file: File) => {
        this.textureJson = file
    }

    private onDropTexturePng = (file: File) => {
        this.texturePng = file
    }

    private onClickActive = async () => {
        if (this.skeletonJson && this.textureJson && this.texturePng) {
            try {
                const [skeletonJson, textureJson, texturePng] = await Promise.all([JsonLoader(this.skeletonJson), JsonLoader(this.textureJson), PngLoader(this.texturePng)])
                const armatures = CreateArmatures(skeletonJson, textureJson, texturePng)
                if (armatures) {
                    const armature = this.state.armatures[0]
                    const animationNames = armature.animation.animationNames
                    armature.animation.play(animationNames[0])
                    this.setState({
                        armatures,
                        armatureIndex: 0,
                        animationIndex: 0,
                    })
                } else {
                    alert('???????????????')
                }
            } catch (e) {
                alert(`????????????:${e}`)
            }
            this.skeletonJson.text()
        } else {
            alert('????????????,????????????,??????????????????????????????')
        }
    }

    render(): ReactElement {
        const {
            armatures,
            armatureIndex,
            animationIndex,
        } = this.state
        const armature = armatures[armatureIndex]
        const aabb = armature.armatureData.aabb
        const scale = Math.min(movieWidth / aabb.width, movieHeight / aabb.height)
        return <main className="main">
            <section className="movie" style={{
                transform: `scale(${scale},${scale})`
            }}>
                <DragonBones armature={armature} />
            </section>
            <section className="file-area">
                <DragFile type="????????????(*.json)" onDropFile={this.onDropSkeletonJson} />
                <DragFile type="????????????(*.json)" onDropFile={this.onDropTextureJson} />
                <DragFile type="????????????(*.png)" onDropFile={this.onDropTexturePng} />
                <button onClick={this.onClickActive}>?????????????????????</button>
            </section>
            <section className="select-area">
                <div className="list-area">
                    <List title="??????" index={armatureIndex} value={armatures.map(armature => armature.name)} onSelect={this.onSelectArmature} />
                    <List title="??????" index={animationIndex} value={armature.animation.animationNames.concat()} onSelect={this.onSelectAnimation} />
                </div>
                <header>??????????????????</header>
            </section>
        </main>
    }
}