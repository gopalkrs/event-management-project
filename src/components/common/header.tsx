"use client"
import { Handshake, Loader2, MicVocal, PartyPopper, Rocket, SearchIcon, Trophy } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';
import LoginButton from '../header/login-button';
import { usePathname } from 'next/navigation';

const Header = () => {

    const { data: session, status } = useSession();
    const pathname = usePathname();

    const isCheckoutPage = pathname.endsWith("/checkout");

    //console.log(pathname);
    const navLinks = [
        { name: 'For You', href: '/', icon: PartyPopper },
        { name: 'Meetups', href: '/meetups', icon: Handshake },
        { name: 'Sports', href: '/sports', icon: Trophy },
        { name: 'Events', href: '/events', icon: MicVocal },
        { name: 'Activities', href: '/activities', icon: Rocket }
    ];

    return (
        <header className='flex flex-col sm:px-5 px-2 py-3 gap-4'>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <Link href={'/'} className='text-2xl md:text-3xl font-lobster font-bold'>Tiketex</Link>
                </div>
                <div className='md:flex flex-row gap-4 hidden'>
                    {navLinks.map((link, index) => (
                        <Link className={`px-3 py-1 ${pathname.endsWith(link.href)? 'text-gray-50 p-1 bg-blue-400' : 'text-gray-600'} rounded-3xl font-semibold`} key={index} href={link.href}>{link.name}</Link>
                    ))}
                </div>
                {status==='loading'? <div><Loader2 className='animate-spin text-gray-400' /></div> : 
                (session ? <Link href={'/profile'} className='bg-orange-400 text-white font-semibold flex items-center justify-center w-8 h-8 rounded-full'>{session?.user?.name?.charAt(0)}</Link> : 
                <div>
                    <LoginButton />
                </div>)}
            </div>
            {!isCheckoutPage && (<div className='relative'>
                <SearchIcon className='h-5 w-5 absolute top-2.5 left-2 z-50 text-blue-500' />
                <Input className='px-10 py-5' placeholder='Search for movies, events and restaurants' />
            </div>)}
            <div className='flex items-center justify-center flex-row gap-1 xs:gap-2 md:hidden'>
                {navLinks.map((link, index) => (
                    <div key={index} className={`sm:px-3 px-1 py-1 ${pathname.endsWith(link.href)? 'text-gray-50 p-1 bg-blue-400' : 'text-gray-600'} rounded-xl flex flex-col items-center justify-center hover:bg-gray-200`}>
                        <link.icon className='h-5 w-5' />
                        <Link className='sm:text-md text-sm font-semibold' href={link.href}>{link.name}</Link>
                    </div>
                ))}
            </div>
        </header>
    )
}

export default Header;