import { AppProps } from 'next/app'
import { ReactElement } from 'react'
import '../styles/globals.css'

function App({
    Component,
    pageProps,
}: AppProps): ReactElement {
    return <Component {...pageProps} />
}

export default App
