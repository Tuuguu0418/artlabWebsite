"use client";

import SocialNavbar from "@/components/socialUser/socialNavbar";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";

const SocialSalary = () => {
  const { expended } = useSidebar();

  return (
    <div className="w-full flex flex-col md:items-end">
      <SocialNavbar />
      <div
        className={`${
          expended ? "md:w-4/5 md:dark:w-full" : "md:w-11/12 lg:w-[94%]"
        } w-full flex flex-col items-center justify-center gap-8 py-20 duration-300`}
      >
        {/* Account Settings section */}
        <section className="w-11/12 md:w-1/2 flex flex-col">
          <h2 className="mb-3 font-medium">Account Settings</h2>
          <div className="flex items-center justify-between bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-2xl p-5">
            <div className="flex gap-5">
              <Image
                src="/img/companies/spiderman.jpg"
                alt="User Profile"
                height={65}
                width={65}
                className="rounded-full"
              />
              <div>
                <h3 className="text-md font-medium">Spiderman Peter Parker</h3>
                <p className="text-sm text-white/50 dark:text-black/50 mb-1 font-medium">
                  Developer, Designer
                </p>
                <p className="text-xs text-white/50 dark:text-black/50">
                  spiderman@gmail.com
                </p>
              </div>
            </div>
            <Link
              href="/social/userEdit"
              className="h-fit py-2 px-5 rounded-full border border-white/10 text-xs text-white/50 hover:border-white hover:text-white dark:text-black/50 dark:hover:text-black dark:hover:border-black duration-300"
            >
              Edit
            </Link>
          </div>
        </section>
        {/* Personal information section */}
        <section className="w-11/12 md:w-1/2 flex flex-col">
          <div className="w-full flex justify-between mb-3">
            <h2 className="font-medium">Personal information</h2>
            <Link
              href="/social/userEdit"
              className="py-2 px-5 rounded-full border border-white/50 text-xs text-white/50 hover:border-white hover:text-white dark:text-black/50 dark:hover:text-black dark:hover:border-black duration-300"
            >
              Edit
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-24 gap-y-5 sm:gap-4 bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-2xl p-5 text-sm">
            <div>
              <h3 className="text-xs text-white/50 dark:text-black/50">
                First name
              </h3>
              <p>Ankhbileg</p>
            </div>
            <div>
              <h3 className="text-xs text-white/50 dark:text-black/50">
                Last name
              </h3>
              <p>Binderiya</p>
            </div>
            <div>
              <h3 className="text-xs text-white/50 dark:text-black/50">
                Email address
              </h3>
              <p>ankhaa2002@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xs text-white/50 dark:text-black/50">
                Phone
              </h3>
              <p>+976 8855 9699</p>
            </div>
            <div>
              <h3 className="text-xs text-white/50 dark:text-black/50">Bio</h3>
              <p>Developer, Designer</p>
            </div>
          </div>
        </section>
        {/* Companies section */}
        <section className="w-11/12 md:w-1/2 flex flex-col">
          <div className="w-full flex justify-between mb-3">
            <h2 className="font-medium">Companies</h2>
            <button className="py-2 px-5 rounded-full border border-white/50 text-xs text-white/50 hover:border-white hover:text-white dark:text-black/50 dark:hover:text-black dark:hover:border-black duration-300">
              Edit
            </button>
          </div>
          <div className="grid lg:grid-cols-2 gap-2 sm:gap-5 text-xs">
            {/* company list */}
            <div className="flex justify-between sm:flex-col sm:gap-5 bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/companies/monredaatgal.png"
                  alt="Company photo"
                  height={25}
                  width={25}
                  className="h-fit rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Monre Insurance</h4>
                  <p className="text-[10px] text-white/50 dark:text-black/50">
                    Монре Даатгал
                  </p>
                </div>
              </div>
              <div className="w-fit sm:w-full sm:flex sm:justify-between">
                <p className="bg-neutral-700 dark:bg-inherit rounded-full py-1 px-3 font-semibold">
                  Ажилтан
                </p>
                <p className="hidden sm:block bg-neutral-700 dark:bg-inherit rounded py-1 px-2">
                  8
                </p>
              </div>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-5 bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/companies/monredaatgal.png"
                  alt="Company photo"
                  height={25}
                  width={25}
                  className="h-fit rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Monre Insurance</h4>
                  <p className="text-[10px] text-white/50 dark:text-black/50">
                    Монре Даатгал
                  </p>
                </div>
              </div>
              <div className="w-fit sm:w-full sm:flex sm:justify-between">
                <p className="bg-neutral-700 dark:bg-inherit rounded-full py-1 px-3 font-semibold">
                  Ажилтан
                </p>
                <p className="hidden sm:block bg-neutral-700 dark:bg-inherit rounded py-1 px-2">
                  8
                </p>
              </div>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-5 bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/companies/monredaatgal.png"
                  alt="Company photo"
                  height={25}
                  width={25}
                  className="h-fit rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Monre Insurance</h4>
                  <p className="text-[10px] text-white/50 dark:text-black/50">
                    Монре Даатгал
                  </p>
                </div>
              </div>
              <div className="w-fit sm:w-full sm:flex sm:justify-between">
                <p className="bg-neutral-700 dark:bg-inherit rounded-full py-1 px-3 font-semibold">
                  Ажилтан
                </p>
                <p className="hidden sm:block bg-neutral-700 dark:bg-inherit rounded py-1 px-2">
                  8
                </p>
              </div>
            </div>
            <div className="flex justify-between sm:flex-col sm:gap-5 bg-white/10 dark:bg-white border border-transparent dark:border-black/10 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <Image
                  src="/img/companies/monredaatgal.png"
                  alt="Company photo"
                  height={25}
                  width={25}
                  className="h-fit rounded-full"
                />
                <div>
                  <h4 className="font-semibold">Monre Insurance</h4>
                  <p className="text-[10px] text-white/50 dark:text-black/50">
                    Монре Даатгал
                  </p>
                </div>
              </div>
              <div className="w-fit sm:w-full sm:flex sm:justify-between">
                <p className="bg-neutral-700 dark:bg-inherit rounded-full py-1 px-3 font-semibold">
                  Ажилтан
                </p>
                <p className="hidden sm:block bg-neutral-700 dark:bg-inherit rounded py-1 px-2">
                  8
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SocialSalary;
