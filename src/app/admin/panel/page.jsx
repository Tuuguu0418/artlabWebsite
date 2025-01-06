"use client";

import React, { useContext } from "react";
import Cookies from "js-cookie";
import ProductComponent from "@/components/productComponent";
import AdminPanelProductDB from "@/components/adminPanelPages/NewsEdit/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { HiOutlineHome } from "react-icons/hi2";
import { PiMonitorLight } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineLink } from "react-icons/ai";

const AdminPanel = () => {
  const router = useRouter();
  const [menu, SetMenu] = React.useState("Post");

  const renderContent = () => {
    switch (menu) {
      case "Home":
        return <div>Home component</div>;
      case "Product":
        return <ProductComponent />;
      case "Post":
        return <AdminPanelProductDB />;
      case "Settings":
        return <div>Settings...</div>;
      default:
        return <div>Something...</div>;
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    router.push("/admin/login");
  };

  return (
    <div className="w-full h-screen bg-white text-white text-sm">
      <div className="flex h-full">
        <aside className="w-48 bg-black border-r-1 h-full flex flex-col justify-between">
          <div>
            <Image
              src="/img/logo/artlablogo2.png"
              alt="Artlab Logo"
              height={30}
              width={90}
              className="mx-4 my-8"
            />
            <ul className="px-2">
              <li
                className={`flex items-center gap-3 p-2 hover:bg-white/10 transition-all duration-200 ${
                  menu === "Home" ? "text-sky-500" : "text-slate-400"
                }`}
                onClick={() => SetMenu("Home")}
              >
                <HiOutlineHome className="text-lg" />
                <button>Home</button>
              </li>
              <li
                className={`flex items-center gap-3 p-2 hover:bg-white/10 transition-all duration-200 ${
                  menu === "Post" ? "text-sky-500" : "text-slate-400"
                }`}
                onClick={() => SetMenu("Post")}
              >
                <LuLayoutDashboard className="text-lg" />
                <button>Post</button>
              </li>
              {/* <li
                className={`flex flex-col p-2 text-slate-400 hover:bg-white/10 transition-all duration-200 group`}
              >
                <div className="flex items-center gap-3">
                  <PiMonitorLight className="text-lg" />
                  <button>Screen</button>
                </div>
                <ul className="hidden group-hover:block p-2 duration-300">
                  <li
                    className={`flex items-center gap-3 p-2 hover:bg-white/15 ${
                      menu === "Product" ? "text-sky-500" : "text-slate-400"
                    }`}
                    onClick={() => SetMenu("Product")}
                  >
                    <AiOutlineLink className="text-lg" />
                    <button>Product</button>
                  </li>
                  <li
                    className={`flex items-center gap-3 p-2 hover:bg-white/15 ${
                      menu === "Companies" ? "text-sky-500" : "text-slate-400"
                    }`}
                    onClick={() => SetMenu("Companies")}
                  >
                    <AiOutlineLink className="text-lg" />
                    <button>Companies</button>
                  </li>
                </ul>
              </li>
              <li
                className={`flex items-center gap-3 p-2 hover:bg-white/10 transition-all duration-200 ${
                  menu === "Settings" ? "text-sky-500" : "text-slate-400"
                }`}
                onClick={() => SetMenu("Settings")}
              >
                <IoSettingsOutline className="text-lg" />
                <button>Settings</button>
              </li> */}
            </ul>
          </div>
          <button onClick={logoutUser} className="flex gap-3 m-3">
            <HiOutlineHome className="text-lg" />
            Log out
          </button>
        </aside>
        <main className="w-full h-full overflow-y-scroll text-black">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
