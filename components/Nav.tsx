'use client';

import { NavMessages } from '@app/types';
import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = ({ content }: { content: NavMessages }) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);
  const { data: session } = useSession();

  async function logout() {}
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='assets/images/logo.svg'
          alt='wikiprompt logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>{content.logo_text}</p>
      </Link>
      {/* Mobile navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              {content.create_prompt}
            </Link>
            <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              {content.logout}
            </button>
            <Link href='/profile'>
              <Image
                src='assets/images/logo.svg'
                alt='profile'
                width={37}
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  {content.login}
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src='assets/images/logo.svg'
              alt='profile'
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  {content.profile_title}
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  {content.create_prompt}
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='black_btn mt-5 w-full'
                >
                  {content.logout}
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  {content.login}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
