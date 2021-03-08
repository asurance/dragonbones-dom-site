import { dragonBones } from 'dragonbones-dom'
import { memo, ReactElement, useCallback, useRef, useState } from 'react'
import { GetDefaultArmature } from '../utils/dragonbones'
import DragonBones from './DragonBones'
import List from './List'

const Dragon = memo(function Dragon(): ReactElement {
    const [armatures] = useState([GetDefaultArmature()])
    const [armatureIndex, setArmatureIndex] = useState(0)
    const [animationIndex, setAnimationIndex] = useState(0)
    const lastArmature = useRef<dragonBones.Armature | null>(null)
    const armature = armatures[armatureIndex]
    if (armature !== lastArmature.current) {
        lastArmature.current?.animation.stop()
        const animationNames = armature.animation.animationNames
        armature.animation.play(animationNames[animationIndex])
        const aabb = armature.armatureData.aabb
        armature.display.style.transform = `translate(${-aabb.x}px,${-aabb.y}px)`
        lastArmature.current = armature
    }

    const onSelectArmature = useCallback(index => {
        setArmatureIndex(index)
        setAnimationIndex(0)
    }, [])
    const onSelectAnimation = useCallback(index => {
        setAnimationIndex(index)
        const animationNames = armature.animation.animationNames
        armature.animation.play(animationNames[index])
    }, [armature])
    return <div id="movie-container">
        <div id="movie" style={{
            transform: 'scale(0.5,0.5)'
        }}>
            <DragonBones armature={armature} />
        </div>
        <div id="select-area">
            <List title="骨架" index={armatureIndex} value={armatures.map(armature => armature.name)} onSelect={onSelectArmature} />
            <List title="动画" index={animationIndex} value={armature.animation.animationNames.concat()} onSelect={onSelectAnimation} />
        </div>
    </div>
})

export default Dragon