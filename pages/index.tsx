import { ReactElement } from 'react'
import dynamic from 'next/dynamic'

const Dragon = dynamic(() => import('../components/Dragon'), { ssr: false })

export default function Home(): ReactElement {
    return <Dragon />
}
