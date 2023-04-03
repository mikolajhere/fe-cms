import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  LightBulbIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Art", href: "/?cat=art", current: false },
  { name: "Science", href: "/?cat=science", current: false },
  { name: "Technology", href: "/?cat=technology", current: false },
  { name: "Cinema", href: "/?cat=cinema", current: false },
  { name: "Design", href: "/?cat=design", current: false },
  { name: "Food", href: "/?cat=food", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  console.log({ currentUser });

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="hover:opacity-75 flex gap-1">
                    <LightBulbIcon className="text h-6 w-6 text-violet-400 items-center" />
                    <span className="text-violet-400 font-bold tracking-wide flex items-center">
                      CMS
                    </span>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {currentUser && (
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Write an article</span>
                    <Link to="/write">
                      <PencilSquareIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                        title="Write an article"
                      />
                    </Link>
                  </button>
                )}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="flex items-center justify-center text-white rounded-full bg-teal-800 h-6 w-6">
                        <UserIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <>
                        {currentUser?.username ? (
                          <span
                            className={classNames(
                              "block px-4 py-2 text-sm font-bold text-gray-700 border-b-2"
                            )}
                          >
                            Hello, {currentUser?.username}!
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </>
                      <Menu.Item>
                        {currentUser?.username ? (
                          <Link
                            to={`/user/${currentUser?.id}`}
                            className={classNames(
                              "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                            )}
                          >
                            Your Profile
                          </Link>
                        ) : (
                          <span></span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {currentUser ? (
                          <span
                            onClick={handleSignOut}
                            className={classNames(
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-slate-100"
                            )}
                          >
                            Sign out
                          </span>
                        ) : (
                          <>
                            <Link
                              to="/register"
                              className={classNames(
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                              )}
                            >
                              Register
                            </Link>
                            <Link
                              to="/login"
                              className={classNames(
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100"
                              )}
                            >
                              Login
                            </Link>
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
