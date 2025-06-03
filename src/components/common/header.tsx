import { Clapperboard, MicVocal, PartyPopper, SearchIcon, Trophy, UserIcon, Utensils } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';
import { signIn } from 'next-auth/react';

const Header = async () => {

    // const { data: session, status } = useSession();

    // console.log("Session Data:", session);
    const navLinks = [
        { name: 'For You', href: '/', icon: PartyPopper },
        { name: 'Dineout', href: '/dineout', icon: Utensils },
        { name: 'Sports', href: '/sports', icon: Trophy },
        { name: 'Events', href: '/events', icon: MicVocal },
        { name: 'Movies', href: '/movies', icon: Clapperboard }
    ];

    return (
        <header className='flex flex-col sm:px-5 px-2 py-3 gap-4'>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <Link href={'/'} className='text-2xl md:text-3xl font-lobster font-bold'>Tiketex</Link>
                </div>
                <div className='md:flex flex-row gap-4 hidden'>
                    {navLinks.map((link, index) => (
                        <Link className='px-3 py-1 rounded-3xl font-semibold text-gray-600' key={index} href={link.href}>{link.name}</Link>
                    ))}
                </div>
                <div>
                </div>
            </div>
            <div className='relative'>
                <SearchIcon className='h-5 w-5 absolute top-2.5 left-2 z-50 text-blue-500' />
                <Input className='px-10 py-5' placeholder='Search for movies, events and restaurants' />
            </div>
            <div className='flex items-center justify-center flex-row gap-1 xs:gap-2 md:hidden'>
                {navLinks.map((link, index) => (
                    <div key={index} className='sm:px-3 px-1 py-1 rounded-xl flex flex-col items-center justify-center hover:bg-gray-200'>
                        <link.icon className='h-5 w-5 text-gray-600' />
                        <Link className='sm:text-md text-sm font-semibold text-gray-600' href={link.href}>{link.name}</Link>
                    </div>
                ))}
            </div>
        </header>
    )
}

export default Header;