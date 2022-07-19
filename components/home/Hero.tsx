import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Hero.module.css'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src='/images/site/blizzard.jpeg'
          alt='portrait of the blog author'
          width={400}
          height={400}
        />
      </div>
      <h1>Survive the Blizzard</h1>
      <p>or can you...?</p>
      <br />
      <br />
      <Link href='/game'>
        <a className={styles.runBtn}>Run Sandbox</a>
      </Link>
      <br />
      <br />
      <br />
      <br />
    </section>
  )
}

export default Hero
