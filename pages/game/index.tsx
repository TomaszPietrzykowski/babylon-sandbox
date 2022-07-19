import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Game.module.css'

const GamePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Game</title>
        <meta name='description' content='game' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Babylon Sandbox Environment</h1>
        <br />
        <p>content coming soon</p>
      </main>
    </div>
  )
}

export default GamePage
