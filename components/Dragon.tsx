import { DomFactory } from 'dragonbones-dom'
import { memo, ReactElement } from 'react'
import SkeleteonJson from '../assets/skeleton.json'
import TextureJson from '../assets/texture.json'
import DragonBones from './DragonBones'

const Dragon = memo(function Dragon(): ReactElement {
    const domFactory = new DomFactory()
    domFactory.parseDragonBonesData(SkeleteonJson)
    domFactory.parseTextureAtlasData(TextureJson, 'texture.png')
    const armature = domFactory.buildArmature('Dragon')!
    return <DragonBones armature={armature} />
})

export default Dragon