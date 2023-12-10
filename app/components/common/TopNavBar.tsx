"use client";
import { useEffect, useState } from "react";
import {
  Navbar, Typography,
  Button,
  IconButton,
  Collapse
} from "@material-tailwind/react";
import Link from "next/link";
import { ListBulletIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, setTheme, switchTheme } from "@/app/store/reducers/theme";
import MaterialUISwitch from "../nav/ThemeSwitch";
import { deleteCookie, getCookie } from "cookies-next";

export default function TopNavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const isLightTheme = useSelector(selectTheme)
  const token = getCookie("token")
  const dispatch = useDispatch()


  useEffect(() => {
    const _isLightTheme = localStorage.getItem('theme') === "light"
    dispatch(setTheme(_isLightTheme))

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
    setLoading(false)
  }, []);

  const logout = () => {
    deleteCookie("token")
    window.location.href = "/"
  }

  const navList = (
    <div className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {!token ? <></> : <Typography
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <PlusIcon className="w-6 h-6 text-slate-500" />
        <Link href="/books/create" className="flex items-center">
          Add new
        </Link>
      </Typography>}
      {!token ? <></> : <Typography
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <ListBulletIcon className="w-6 h-6 text-slate-500" />
        <Link href="/books/create" className="flex items-center">
          My books
        </Link>
      </Typography>}

      <MaterialUISwitch checked={!isLightTheme} sx={{ m: 1 }} onChange={() => dispatch(switchTheme())} />
    </div>
  );

  if (loading) return <></>

  return (
    <div className="flex justify-center">
      <Navbar className={"mx-auto px-4 py-2 lg:px-8 lg:py-4 md:mt-4 md:mx-4 rounded-md lg:w-4/5 w-full max-w-7xl " + (isLightTheme ? "light-theme" : "dark-theme")} color="gray">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900 ">
          <Link
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Books Marketplace
          </Link>
          <div className="hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-1">
            {token ?
              <Button onClick={logout} variant="text" size="sm" className="hidden lg:inline-block">
                <span>Log Out</span>
              </Button>
              : <Link href="/identity/login">
                <Button variant="text" size="sm" className="hidden lg:inline-block">
                  <span>Log In</span>
                </Button>
              </Link>}
            {token ? <></> :
              <Link href="/identity/register">
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                >
                  <span>Sign in</span>
                </Button>
              </Link>
            }

          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

        <Collapse open={openNav} className="overflow-hidden">
          <div className="container mx-auto">
            {navList}
            <div className="flex items-center gap-x-1">
              {token ?
                <Button onClick={logout} variant="text" size="sm">
                  <span>Log Out</span>
                </Button>
                : <Link href="/identity/login">
                  <Button variant="text" size="sm">
                    <span>Log In</span>
                  </Button>
                </Link>}
              {token ? <></> :
                <Link href="/identity/register">
                  <Button fullWidth variant="gradient" size="sm" className="">
                    <span>Sign in</span>
                  </Button>
                </Link>
              }
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>

  );
}