import { link } from 'fs';
import { SearchIcon, User2, UserCircle, UserIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Input } from '../ui/input';

const Header = () => {

    const navLinks = [
        { name: 'For You', href: '/' },
        { name: 'Dineout', href: '/dineout' },
        { name: 'Sports', href: '/sports' },
        { name: 'Events', href: '/events' },
        { name: 'Movies', href: '/movies' }
    ];

    return (
        <header className='flex flex-col px-5 py-3 gap-4'>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <Link href={'/'} className='text-3xl font-lobster font-bold'>Tiketex</Link>
                </div>
                <div className='flex flex-row gap-4'>
                    {navLinks.map((link, index) => (
                        <Link className='px-3 py-1 rounded-3xl font-semibold text-gray-600' key={index} href={link.href}>{link.name}</Link>
                    ))}
                </div>
                <div>
                    <div className='text-center bg-gray-900 p-2 rounded-full'>
                        <UserIcon className='h-5 w-5 text-gray-300' />
                    </div>
                </div>
            </div>

            <div className='relative'>
                <SearchIcon className='absolute top-2 left-2 z-50 text-blue-500' />
                <Input className='px-10 py-5' placeholder='Search for movies, events and restaurants' />
            </div>
        </header>
    )
}

export default Header