import { ReactElement } from 'react'
import ListItem from './ListItem'

type Props = {
    value: string[]
    onSelect: (index: number) => void
}

export default function List({
    value,
    onSelect,
}: Props): ReactElement {
    return <div>
        {value.map((v, i) => <ListItem key={v} value={v} index={i} onSelect={onSelect} />)}
    </div>
}