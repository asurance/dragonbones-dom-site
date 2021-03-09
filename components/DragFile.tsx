import { DragEvent, ReactElement, useCallback, useState } from 'react'

type Props = {
    type: string
    onDropFile: (file: File) => void
}

export default function DragFile({
    type,
    onDropFile,
}: Props): ReactElement {
    const [hover, setHover] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const onDragOver = useCallback((ev: DragEvent) => {
        ev.preventDefault()
        setHover(true)
    }, [])
    const onDragLeave = useCallback((ev: DragEvent) => {
        ev.preventDefault()
        setHover(false)
    }, [])
    const onDrop = useCallback((ev: DragEvent) => {
        ev.preventDefault()
        setHover(false)
        if (ev.dataTransfer.files.length > 0) {
            const file = ev.dataTransfer.files.item(0)!
            setFile(file)
            onDropFile(file)
        }
    }, [onDropFile])
    return <section onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave} className={hover ? 'drag-area hover' : 'drag-area'}>
        {file ? file.name : type}
    </section>
}