import { DomFactory, dragonBones, CreateEventManager } from 'dragonbones-dom'
import SkeleteonJson from '../assets/skeleton.json'
import TextureJson from '../assets/texture.json'



export function GetDefaultArmature(): dragonBones.Armature {
    const factory = new DomFactory(new dragonBones.DragonBones(CreateEventManager()))
    factory.getDragonBonesData
    factory.parseDragonBonesData(SkeleteonJson)!
    factory.parseTextureAtlasData(TextureJson, 'texture.png')
    return factory.buildArmature('Dragon')!
}

export function CreateArmatures(skeletonJson: unknown, textureJson: unknown, textureUrl: string): dragonBones.Armature[] | null {
    const factory = new DomFactory(new dragonBones.DragonBones(CreateEventManager()))
    const data = factory.parseDragonBonesData(skeletonJson)
    if (!data || data.armatureNames.length === 0) return null
    factory.parseTextureAtlasData(textureJson, textureUrl)
    return data.armatureNames.map(armatureName => factory.buildArmature(armatureName)!)
}

export async function JsonLoader(file: File): Promise<unknown> {
    const json = await file.text()
    return JSON.parse(json)
}

let url = ''

export function PngLoader(file: File): string {
    URL.revokeObjectURL(url)
    url = URL.createObjectURL(file)
    return url
}