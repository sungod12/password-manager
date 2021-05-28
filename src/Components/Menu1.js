import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { NavLink } from "react-router-dom";
// import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const classNames = (...className) => {
  return className.filter(Boolean).join(" ");
};

const Navigation = ({ uname, funct }) => {
  const navigation = [
    { name: "Dashboard", href: "/", current: false },
    { name: "Categories", href: "#", current: false },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ];
  if (uname) {
    navigation[0].href = `/passaver/${uname}`;
  }
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <i className="fas fa-times "></i>
                  ) : (
                    <i className="fas fa-bars"></i>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        onClick={() => {
                          navigation[index].current = true;
                        }}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 focus:bg-gray-700 focus:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <div className="h-8 w-8 bg-blue-50 rounded-full"></div>
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            <NavLink
                              to="/"
                              className="block px-4 py-2 text-md text-grey"
                            >
                              Your Profile
                            </NavLink>
                          </Menu.Item>
                          {uname ? (
                            <Menu.Item>
                              <button
                                type="button"
                                onClick={funct}
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Sign out
                              </button>
                            </Menu.Item>
                          ) : (
                            <>
                              <Menu.Item>
                                <NavLink
                                  to="/"
                                  className="block px-4 py-2 text-md text-gray-700"
                                >
                                  Register
                                </NavLink>
                              </Menu.Item>
                              <Menu.Item>
                                <NavLink
                                  to="/signIn"
                                  className="block px-4 py-2 text-md text-gray-700"
                                >
                                  Sign In
                                </NavLink>
                              </Menu.Item>
                            </>
                          )}
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => {
                    navigation[index].current = true;
                  }}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 focus:bg-gray-700 focus:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default function Menu1({ uname, func }) {
  return <Navigation uname={uname} funct={func} />;
}
