"use client";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import { useState } from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { GoBellFill } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import ThemeSwitch from "../ThemeSwitch";
import styles from "./socialNavbar.module.css";

const SocialNavbar = () => {
  const { expended, toggleSidebar } = useSidebar();
  const [showNotif, setShowNotif] = useState(false);

  const toggleNotif = () => {
    setShowNotif(!showNotif);
  };

  return (
    <>
      <nav
        className={`${
          expended
            ? "md:w-4/5 dark:w-10/12"
            : "md:w-11/12 lg:w-[94%] dark:w-[95%]"
        } fixed w-full flex  p-2 bg-black dark:bg-white text-white dark:text-black border-b-1 border-white/15 dark:border-black/10 duration-300 z-30`}
      >
        <button onClick={toggleSidebar} className="m-auto block md:hidden">
          <IoMdMenu size={30} />
        </button>

        <ul className="w-full flex justify-end gap-5 list-none">
          <li className="bg-white/10 dark:bg-black/5 rounded-full p-2 hover:scale-90 duration-300">
            <ThemeSwitch iconSize={20} />
          </li>
          <li
            onClick={toggleNotif}
            className={`relative bg-white/10 dark:bg-black/5 rounded-full p-2 hover:scale-90 duration-300 ${
              showNotif && "text-blue-500 bg-blue-500/25"
            }`}
          >
            <GoBellFill size={20} />
            <span className="absolute -top-1 -right-2 bg-white dark:bg-black text-black dark:text-white rounded-full px-1.5 py-0.5 text-xs">
              2
            </span>
            {/* <NoticationsButton /> */}
          </li>
          <li className="hidden sm:block bg-white/10 dark:bg-black/5 rounded-full p-2 hover:scale-90 duration-300">
            <BiMessageSquareDots size={20} />
          </li>
          <li className="rounded-full hover:scale-90 duration-300">
            <Image
              src="/img/companies/spiderman.jpg"
              alt="testPhoto"
              height={30}
              width={30}
              className="rounded-full"
            />
          </li>
        </ul>
      </nav>
      {/* Notification Dropdown */}
      {showNotif && (
        <>
          {/* Blur Background */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
            onClick={() => setShowNotif(false)}
          ></div>

          {/* Notifications Panel */}
          <div
            className={`fixed top-[7.4%] sm:right-44 w-full max-h-[80%] sm:w-1/2 md:w-1/3 bg-black text-white text-xs 
              rounded-lg z-20 overflow-y-auto dark:bg-white dark:text-black ${styles.scrollbar_custom}`}
          >
            <div className="p-4">
              <h3 className="font-bold text-lg">Today</h3>
              <div className="mt-2 p-3">
                <div className="flex gap-3">
                  <Image
                    src="/img/companies/monredaatgal.png"
                    alt="testPhoto"
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="">Monre Insurance</h4>
                    <p className="text-[8px] text-white/50 dark:text-black/50">
                      8h
                    </p>
                  </div>
                </div>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
              <h3 className="font-bold text-lg mt-4">Yesterday</h3>
              <div className="mt-2 p-3">
                <div className="flex gap-3">
                  <Image
                    src="/img/companies/monredaatgal.png"
                    alt="testPhoto"
                    height={30}
                    width={30}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="">Monre Insurance</h4>
                    <p className="text-[8px] text-white/50 dark:text-black/50">
                      8h
                    </p>
                  </div>
                </div>
                <p className="mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SocialNavbar;
