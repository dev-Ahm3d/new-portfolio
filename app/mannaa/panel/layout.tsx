'use client'
import ProtectProvider from '@/components/ProtectProvider';
import './Panel.css'
import PanelNavbar from '@/components/panel-navbar/PanelNavbar';
import AuthProvider from '@/components/AuthProvider';
const page = ({children}: {children : React.ReactNode}) => {
    return (
        <AuthProvider>
            <ProtectProvider>
                <PanelNavbar/>
                <div className='panel-content'>
                    {children}
                </div>
            </ProtectProvider>
        </AuthProvider>
    )
}

export default page



