'use client'
import Link from "next/link"
import {AiFillHome} from 'react-icons/ai'
import {BsFillPersonFill} from 'react-icons/bs'
import {MdOutlineWork} from 'react-icons/md'
import {BiSolidEnvelopeOpen} from 'react-icons/bi'
import {RiAdminFill} from 'react-icons/ri'
import  './Sidenav.css'
import { usePathname } from "next/navigation"
import dynamic from "next/dynamic"
import {useSession} from 'next-auth/react'
const Sidenav = () => {
    const {status} = useSession()
    const pathname = usePathname()
    return (
        <nav className="sidenav">
            <Link className={pathname === '/' ? 'link-active' : ''} href={'/'} title="home">
                <span>HOME</span>
                <AiFillHome size='1.2em'/>
            </Link>
            <Link className={pathname === '/about' ? 'link-active' : ''} href={'/about'} title="about">
                <span>About</span>
                <BsFillPersonFill size='1.2em'/>
            </Link>
            <Link className={pathname === '/portfolio' ? 'link-active' : ''} href={'/portfolio'} title="portfolio">
                <span>Portfolio</span>
                <MdOutlineWork size='1.2em'/>
            </Link>
            <Link className={pathname === '/contact' ? 'link-active' : ''} href={'/contact'} title="contact">
                <span>Contact</span>
                <BiSolidEnvelopeOpen size='1.2em'/>
            </Link>
            {
                status === 'authenticated' && <Link className={pathname === '/panel' ? 'link-active' : ''} href={'/mannaa/panel'} title="panel">
                    <span>Panel</span>
                    <RiAdminFill size='1.2em'/>
                </Link>
            }
        </nav>
    )
}

export default dynamic(()=> Promise.resolve(Sidenav),{ssr:false})