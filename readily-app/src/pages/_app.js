import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import { UserDataProvider, UserDataContext } from '@/lib/hooks'
import { useContext } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'
export default function App ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <div>
      <UserDataProvider>
        <Head>
          <title>Readily - Summarize the web</title>
          <meta property="og:title" content="Readily - Summarize the web" key="title" />
          <link rel="readily logo" href="/images/favicon.ico" />
        </Head>
        <AppContent Component={Component} pageProps={pageProps} />
      </UserDataProvider>
    </div>
  )
}

function AppContent ({ Component, pageProps }) {
  const { user, logOut, loading } = useContext(UserDataContext)
  const router = useRouter()
  async function handleLogout () {
    logOut().then(() => {
      window.location.href = '/'
    })
  }

  return (
    <div>
      {router.pathname !== '/' && (
        <Navbar user={user} onLogOut={() => handleLogout()} />
      )}

      <Component {...pageProps} />
    </div>
  )
}
