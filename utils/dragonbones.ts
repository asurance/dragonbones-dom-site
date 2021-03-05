import { DomFactory, dragonBones } from 'dragonbones-dom'
import SkeleteonJson from '../assets/skeleton.json'
import TextureJson from '../assets/texture.json'

const factory = new DomFactory()

export function GetDefaultArmature(): dragonBones.Armature {
    factory.parseDragonBonesData(SkeleteonJson)!
    factory.parseTextureAtlasData(TextureJson, 'texture.png')
    return factory.buildArmature('Dragon')!
}

export function CreateArmatures(skeletonJson: unknown, textureJson: unknown, textureUrl: string): dragonBones.Armature[] | null {
    const data = factory.parseDragonBonesData(skeletonJson)
    if (!data || data.armatureNames.length === 0) return null
    factory.parseTextureAtlasData(textureJson, textureUrl)
    return data.armatureNames.map(armatureName => factory.buildArmature(armatureName)!)
}