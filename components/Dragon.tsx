import { memo, ReactElement, useState } from 'react'
import { GetDefaultArmature } from '../utils/dragonbones'
import DragonBones from './DragonBones'

const Dragon = memo(function Dragon(): ReactElement {
    const [armatures] = useState([GetDefaultArmature()])
    const armature = armatures[0]
    const aabb = armature.armatureData.aabb
    armature.display.style.transform = `translate(${-aabb.x}px,${-aabb.y}px)`
    return <div>
        <div style={{
            transform: 'scale(0.5,0.5)'
        }}>
            <DragonBones armature={armature} />
        </div>
    </div>
})

export default Dragon