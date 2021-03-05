import { dragonBones } from 'dragonbones-dom'
import { memo, ReactElement, useCallback, useRef, useState } from 'react'
import { GetDefaultArmature } from '../utils/dragonbones'
import DragonBones from './DragonBones'
import List from './List'

const Dragon = memo(function Dragon(): ReactElement {
    const [armatures] = useState([GetDefaultArmature()])
    const [armatureIndex, setArmatureIndex] = useState(0)
    const lastArmature = useRef<dragonBones.Armature | null>(null)
    const armature = armatures[armatureIndex]
    if (armature !== lastArmature.current) {
        lastArmature.current?.animation.stop()
        armature.animation.play()
        const aabb = armature.armatureData.aabb
        armature.display.style.transform = `translate(${-aabb.x}px,${-aabb.y}px)`
        lastArmature.current = armature
    }
    const onSelectArmature = useCallback(index => {
        setArmatureIndex(index)
    }, [])
    const onSelectAnimation = useCallback(index => {
        const animationNames = armature.animation.animationNames
        armature.animation.play(animationNames[index])
    }, [armature])
    return <div>
        <div style={{
            transform: 'scale(0.5,0.5)'
        }}>
            <DragonBones armature={armature} />
        </div>
        <div>
            <List value={armatures.map(armature => armature.name)} onSelect={onSelectArmature} />
            <List value={armature.animation.animationNames.concat()} onSelect={onSelectAnimation} />
        </div>
    </div>
})

export default Dragon