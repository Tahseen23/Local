import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {persistor} from '../main'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Example() {
  const navigate=useNavigate()
  const username=useSelector(state=>state.sliceData.username)
  const handleLogOut = () => {
    localStorage.removeItem('token');
    
    persistor.purge().then(() => {
      console.log('State purged');
      navigate('/'); 
    }).catch((error) => {
      console.error('Error purging state:', error);
    });
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
         
         
          <MenuItem>
            <Link
              to={'/user/'+username}
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
            >
              Profile
            </Link>
          </MenuItem>
          <form onSubmit={handleLogOut}>
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                Sign out
              </button>
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}
