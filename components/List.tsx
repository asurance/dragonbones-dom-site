import { ReactElement } from 'react'
import ListItem from './ListItem'

type Props = {
    title: string
    value: string[]
    index: number
    onSelect: (index: number) => void
}

export default function List({
    title,
    value,
    index,
    onSelect,
}: Props): ReactElement {
    return <div className="list-container">
        <p>{title}</p>
        <div className="list">
            {value.map((v, i) => <ListItem key={v} value={v} index={i} select={index === i} onSelect={onSelect} />)}
        </div>
    </div>
}