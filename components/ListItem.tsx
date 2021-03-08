import { ReactElement, useCallback } from 'react'

type Props = {
    index: number
    value: string
    select: boolean
    onSelect: (index: number) => void
}

export default function ListItem({
    index,
    value,
    select,
    onSelect,
}: Props): ReactElement {
    const onClick = useCallback(() => {
        onSelect(index)
    }, [onSelect, index])
    return <button className={`list-item${select ? ' select' : ''}`} onClick={onClick}>{value}</button>
}