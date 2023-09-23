'use client'
import Link from 'next/link';
import {FaUser , FaList , FaAngellist , FaSmileWink} from 'react-icons/fa'
import {MdPlaylistAddCheckCircle} from 'react-icons/md'
import {HiOutlineLogout} from 'react-icons/hi'
import './PanelNavbar.css'
import { usePathname } from 'next/navigation';
import {AiOutlineMessage} from 'react-icons/ai'
import { signOut } from 'next-auth/react'

const PanelNavbar = () => {

    const selectedCategory = usePathname()
    return (
        <nav className='panel-navbar'>
            <div className='navbar-header'>
                <h2>Welcome Admin</h2>
                <FaSmileWink size='1.5em'/>
            </div>
            <Link as={'/mannaa/panel'}  href={'/mannaa/panel'} className={`${selectedCategory.endsWith('panel')?'cat-active':''}`} title='personal-info'>
                <span><FaUser size='1.1em'/></span>
                <span>Perosnal Info</span>
            </Link>
            <Link as={'/mannaa/panel/skills'} href={'/mannaa/panel/skills'} className={`${selectedCategory.endsWith('skills')?'cat-active':''}`} title='skills'>
                <span><FaList size='1.2em'/></span>
                <span>Skills</span>
            </Link>
            <Link as={'/mannaa/panel/achievements'} href={'/mannaa/panel/achievements'} className={`${selectedCategory.endsWith('achievements')?'cat-active':''}`} title='achievements'>
                <span><FaAngellist size='1.5em'/></span>
                <span>Achievements</span>
            </Link>
            <Link as={'/mannaa/panel/portfolio'} href={'/mannaa/panel/portfolio'}  className={`${selectedCategory.endsWith('portfolio')?'cat-active':''}`} title='portfolio'>
                <span><MdPlaylistAddCheckCircle size='1.5em'/></span>
                <span>Portfolio</span>
            </Link>
            <Link as={'/mannaa/panel/messages'}  href={'/mannaa/panel/messages'}  className={`${selectedCategory.endsWith('messages')?'cat-active':''}`} title='portfolio'>
                <span><AiOutlineMessage size='1.5em'/></span>
                <span>Messages</span>
            </Link>
            <Link onClick={e =>{
                e.preventDefault()
                signOut({
                    redirect : true , 
                    callbackUrl : '/'
                })
            }} href={'/logout'} title='logout'>
                <span><HiOutlineLogout size='1.5em'/></span>
                <span>Logout</span>
            </Link>
        </nav>
    )
}

export default PanelNavbar



