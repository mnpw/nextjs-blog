import Head from 'next/head'
import styles from './layout.module.css'
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import logo_2 from '../public/website_logo.svg'
import logo_1 from '../public/dp.png'
import { useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

import { DebugLayerMaterial, LayerMaterial, Depth, Color, Fresnel, Noise, Normal } from 'lamina'
import { Vector3 } from 'three'

import Flower from "../components/Flower"

// function Bg() {
//   return (
//     <mesh scale={100}>
//       <boxGeometry args={[1, 1, 1]} />
//       <LayerMaterial side={THREE.BackSide}>
//         {/* <Depth colorB="red" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} /> */}
//         <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="beige" mode="subtract" alpha={0.2} />
//       </LayerMaterial>
//     </mesh>
//   )
// }

const name = 'Mrinal Paliwal'
export const siteTitle = 'mnpw\'s garden'

export default function Layout({ children, home, nonBlog }) {

    const logo1 = { src: logo_1, width: 34, height: 34 }
    const logo2 = { src: logo_2, width: 80, height: 34 }
    const props = { base: '#ff4eb8', colorA: '#00ffff', colorB: '#ff00e3' }


    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="This is the garden looked after by Mrinal Paliwal"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            {nonBlog && (<div className={utilStyles.canvas}>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0.5, 10], fov: 2 }}>
                    <Suspense fallback={null}>
                        <Flower {...props} />
                        {/* <Bg {...props} /> */}
                        <OrbitControls />
                        <directionalLight intensity={2} castShadow shadow-mapSize-height={1024} shadow-mapSize-width={1024} />
                        <ambientLight intensity={0.4} />
                    </Suspense>
                </Canvas>
            </div>)}
            <header className={styles.header}>

                <Link href="/" legacyBehavior>
                    {/* onMouseOver={() => changeLogo(logo2)} onMouseOut={() => changeLogo(logo1)} */}
                    <span className={styles.logo}>
                        <span className={styles.logo_hover}>
                            <Image src={logo2.src} height={logo2.height} width={logo2.width} />
                        </span>
                        <span className={styles.logo_base}>
                            <Image src={logo1.src} height={logo1.height} width={logo1.width} />
                        </span>
                    </span>
                </Link>

                <span>
                    <Link href="/now/" className={styles.navbar}>Now</Link>
                    <span className={styles.disc}> •</span>
                    <Link href="/notes/" className={styles.navbar}>Notes</Link>
                    <span className={styles.disc}> •</span>
                    <Link href="https://www.twitter.com/_mnpw" className={styles.navbar}>Twitter</Link>
                </span>
            </header>
            <main>{children}</main>
            {
                !home && (
                    <div className={styles.backToHome}>
                        <Link href="/">
                            ← Back to home
                        </Link>
                    </div>
                )
            }
        </div >
    );
}
