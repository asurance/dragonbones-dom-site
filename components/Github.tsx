import { ReactElement } from 'react'
import Link from 'next/link'

export default function Github(): ReactElement {
    return <Link href="https://github.com/asurance/dragonbones-dom">
        <img id="github" src="github.svg" alt="github" />
    </Link>
}