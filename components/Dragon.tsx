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
                    alert('未找到骨架')
                }
            } catch (e) {
                alert(`解析失败:${e}`)
            }
            this.skeletonJson.text()
        } else {
            alert('骨架配置,图集配置,图集资源三者缺一不可')
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
            <div className="movie" style={{
                transform: `scale(${scale},${scale})`
            }}>
                <DragonBones armature={armature} />
            </div>
            <div className="file-area">
                <DragFile type="骨架配置" onDropFile={this.onDropSkeletonJson} />
                <DragFile type="图集配置" onDropFile={this.onDropTextureJson} />
                <DragFile type="图集资源" onDropFile={this.onDropTexturePng} />
                <button onClick={this.onClickActive}>试试上传的动画</button>
            </div>
            <div className="list-area">
                <List title="骨架" index={armatureIndex} value={armatures.map(armature => armature.name)} onSelect={this.onSelectArmature} />
                <List title="动画" index={animationIndex} value={armature.animation.animationNames.concat()} onSelect={this.onSelectAnimation} />
            </div>
        </main>
    }
}