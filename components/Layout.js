import Head from 'next/head'
import FloatingActionButton from './FloatingActionButtons/FloatingActionButton'
import Footer from './Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Ane Collections</title>
            </Head>

           {router.pathname !== '/admin' ? <FloatingActionButton /> : null}

            <Navbar />

            <div className="main" style={{ marginBottom: '30px' }}>
                {children}
            </div>

            <Footer />
        </>
    )
}

export default Layout