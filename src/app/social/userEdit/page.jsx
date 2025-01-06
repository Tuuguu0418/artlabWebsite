"use client";

import SocialNavbar from "@/components/socialUser/socialNavbar";
import { useSidebar } from "@/context/SidebarContext";

const SocialUserEdit = () => {
  const { expended } = useSidebar();
  return (
    <section className="w-full flex flex-col md:items-end">
      <SocialNavbar />
      <div
        className={`${
          expended ? "md:w-4/5 md:dark:w-full" : "md:w-11/12 lg:w-[94%]"
        } w-full flex flex-col items-center justify-center gap-8 py-20 duration-300`}
      >
        <div className="w-1/2 flex flex-col gap-2 p-2">
          <h1>Personal information</h1>
          <div className="flex flex-col text-sm">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="rounded-xl p-2"
            />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="firstName">Last name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              className="rounded-xl p-2"
            />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="firstName">Email address</label>
            <input
              type="text"
              name="firstName"
              placeholder="Email address"
              className="rounded-xl p-2"
            />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="firstName">Phone</label>
            <input
              type="text"
              name="firstName"
              placeholder="Phone"
              className="rounded-xl p-2"
            />
          </div>
          <div className="flex flex-col text-sm">
            <label htmlFor="firstName">Bio</label>
            <input
              type="text"
              name="firstName"
              placeholder="Bio"
              className="rounded-xl p-2"
            />
          </div>
          <button className="w-full bg-violet-600 text-white rounded-xl p-2">
            Save personal information
          </button>
        </div>
      </div>
    </section>
  );
};

export default SocialUserEdit;
