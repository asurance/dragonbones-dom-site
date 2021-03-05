import { ReactElement, useCallback } from 'react'

type Props = {
    index: number
    value: string
    onSelect: (index: number) => void
}

export default function ListItem({
    index,
    value,
    onSelect,
}: Props): ReactElement {
    const onClick = useCallback(() => {
        onSelect(index)
    }, [onSelect, index])
    return <button onClick={onClick}>{value}</button>
}