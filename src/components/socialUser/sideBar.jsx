"use client";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgFileDocument } from "react-icons/cg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { RiHomeLine } from "react-icons/ri";
import { TbUserDollar } from "react-icons/tb";

const SideBar = () => {
  const { expended, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  // useEffect(() => {
  //   const savedSidebarState = localStorage.getItem("sidebarState");
  //   if (savedSidebarState !== null) {
  //     setExpended(savedSidebarState === "true");
  //   }
  // }, []);

  // const toggleSidebar = () => {
  //   const newState = !expended;
  //   setExpended(newState);
  //   localStorage.setItem("sidebarState", newState.toString());
  // };

  const imgLink = expended
    ? "/img/logo/artlabLogo2.png"
    : "/img/logo/artlabIconWhite.png";

  return (
    <aside
      className={`h-screen ${
        expended ? "w-1/2 md:w-1/6" : "w-[5%] hidden"
      } fixed md:flex flex-col items-center bg-black md:bg-white/10 border-r border-white/15 dark:border-black/10 dark:bg-white text-xs duration-300 z-30`}
    >
      <div
        className={`w-11/12 flex justify-between py-3 ${
          expended ? "" : "gap-1"
        }`}
      >
        <Image
          src={imgLink}
          alt="testPhoto"
          height={120}
          width={120}
          className={`${
            expended
              ? ""
              : "w-2/5 ml-2 lg:ml-3 xl:ml-5 mix-blend-difference dark:bg-dark"
          } hidden sm:block`}
        />
        <button
          onClick={toggleSidebar}
          className={`${
            expended
              ? "hover:border-white bg-white/15 hover:text-white border-transparent"
              : "-mr-4 m-auto bg-white border-black hover:border-transparent"
          } h-fit hidden sm:block border rounded-md p-1 text-black duration-300`}
        >
          {expended ? (
            <IoIosArrowBack size={14} />
          ) : (
            <IoIosArrowForward size={14} />
          )}
        </button>
      </div>
      <div
        className={`${
          expended ? "w-11/12" : "w-3/4"
        } h-px hidden lg:block bg-white/15 dark:bg-black/10 mb-8`}
      ></div>
      <div className="w-11/12 flex flex-col gap-2 px-2 mt-5 lg:mt-0">
        <Link
          href="/social/user"
          className={`${
            pathname === "/social/user" ? "bg-violet-600 text-white" : ""
          } relative flex items-center ${
            expended ? "gap-3" : ""
          }  rounded-lg py-2 hover:bg-white/25 duration-300 group`}
        >
          <RiHomeLine
            size={15}
            className={`${expended ? "ml-3 lg:ml-8" : "m-auto"} `}
          />
          <p
            className={`overflow-hidden transition-all ${
              expended ? "" : "w-0"
            }`}
          >
            Home
          </p>

          {!expended && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100  text-indigo-800 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              Home
            </div>
          )}
        </Link>
        <Link
          href="/social/salary"
          className={`${
            pathname === "/social/salary" ? "bg-violet-600 text-white" : ""
          } relative flex items-center ${
            expended ? "gap-3" : ""
          } rounded-lg py-2 hover:bg-white/25 duration-300 group`}
        >
          <TbUserDollar
            size={15}
            className={`${expended ? "ml-3 lg:ml-8" : "m-auto"} `}
          />
          <p
            className={`overflow-hidden transition-all ${
              expended ? "" : "w-0"
            }`}
          >
            Salary
          </p>

          {!expended && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100  text-indigo-800 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              Salary
            </div>
          )}
        </Link>
        <Link
          href="/social/invoice"
          className={`${
            pathname === "/social/invoice" ? "bg-violet-600 text-white" : ""
          } relative flex items-center ${
            expended ? "gap-3" : ""
          } rounded-lg py-2 hover:bg-white/25 duration-300 group`}
        >
          <CgFileDocument
            size={15}
            className={`${expended ? "ml-3 lg:ml-8" : "m-auto"} `}
          />
          <p
            className={`overflow-hidden transition-all ${
              expended ? "" : "w-0"
            }`}
          >
            Invoice
          </p>

          {!expended && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100  text-indigo-800 invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              Invoice
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
