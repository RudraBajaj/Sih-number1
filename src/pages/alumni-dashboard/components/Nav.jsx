import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from './logo-removed.png';

import Dashboard from './Dashboard';
import AlumniDirectory from './AlumniDirectory';
import TopStudents from './TopStudents';
import Events from './Event';
import Donations from './Donations';
import { Link } from "react-router-dom";  // ✅ add this at the top

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Alumni Directory', href: '#' },
  { name: 'Top Students', href: '#' },
  { name: 'Events', href: '#' },
  { name: 'Donations', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const [selected, setSelected] = useState('Dashboard');
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    setFadeKey(k => k + 1);
  }, [selected]);

  return (
    <>


      <Disclosure as="nav" className="fixed top-0 w-full bg-black bg-opacity-70 backdrop-blur-md shadow-lg z-50">

        <div className="mx-auto max-w-7xl px-0 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img src={logo} alt="Logo" className="h-12 w-12 hidden sm:block bg-gray-200 p-2 rounded-full" />

              </div>
              <div className="hidden sm:flex sm:items-center sm:justify-center sm:space-x-8 w-full">
                {navigation.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={e => {
                      e.preventDefault();
                      setSelected(item.name);
                    }}
                    className={classNames(
                      selected === item.name
                        ? 'border-indigo-500 text-white bg-indigo-700 shadow-lg'
                        : 'border-transparent text-gray-300 hover:border-indigo-300 hover:text-white hover:bg-indigo-600',
                      'inline-flex items-center border-b-2 px-3 py-2 text-sm font-semibold rounded-md transition transform hover:scale-105 duration-300 ease-in-out'
                    )}
                    aria-current={selected === item.name ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Profile and Notifications Area */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4 z-[9999]">
              <div className="flex flex-col mr-2 text-right">
                <span className="text-white font-semibold text-sm leading-tight">Kira</span>
                <span className="text-indigo-400 text-xs font-medium">Alumni</span>
              </div>
              <button type="button" className="rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <Menu as="div" className="relative z-[9999]">
                <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <img
                    alt="User Avatar"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    className="h-10 w-10 rounded-full object-cover shadow-md ring-1 ring-indigo-600 ring-opacity-50 transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]">
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-100' : 'text-gray-700'}`}
                      >
                        Your profile
                      </Link>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a href="settings" className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-100' : 'text-gray-700'}`}>
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a href="login" className={`block px-4 py-2 text-sm ${active ? 'bg-indigo-100' : 'text-gray-700'}`}>
                        Sign out
                      </a>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden bg-black bg-opacity-75 backdrop-blur-md">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map(item => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                onClick={e => {
                  e.preventDefault();
                  setSelected(item.name);
                }}
                aria-current={selected === item.name ? 'page' : undefined}
                className={classNames(
                  selected === item.name
                    ? 'bg-indigo-700 text-white'
                    : 'text-gray-300 hover:bg-indigo-600 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-semibold transition transform hover:scale-105 duration-300 ease-in-out'
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>


      {/* Centralized main content - transparent background to show Vanta */}
      <div className="flex flex-col min-h-screen items-center justify-center p-6">
        <section className="w-full max-w-6xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg min-h-[400px] transition-all duration-700 ease-in-out relative z-10">
          <div className="p-8">
            {selected === 'Dashboard' && <Dashboard />}
            {selected === 'Alumni Directory' && <AlumniDirectory />}
            {selected === 'Top Students' && <TopStudents />}
            {selected === 'Events' && <Events />}
            {selected === 'Donations' && <Donations />}
          </div>
        </section>
      </div>

    </>
  );
}
