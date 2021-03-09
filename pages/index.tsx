import { ReactElement } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Github from '../components/Github'

const Dragon = dynamic(() => import('../components/Dragon'), { ssr: false })

export default function Home(): ReactElement {
    return <div>
        <Head>
            <title>dragonbones-dom</title>
            <link rel="icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header className="header">dragonbones-dom<Github /></header>
        <Dragon />
    </div>
}
