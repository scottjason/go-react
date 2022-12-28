import React from 'react';
import { IoIosFlash } from 'react-icons/io';

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900'>
      <div className='flex flex-wrap items-center justify-between mx-auto'>
        <div className='nav-left'>
          <IoIosFlash id='flash-icon' />
          <h1>Authentication Boilerplate</h1>
          <h3>Go, Gin, Postgres & React</h3>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
