"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import Cookies from "js-cookie";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const router = useRouter();
  const [loginData, setLoginData] = React.useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toast.warning("Login failed", {
          position: "top-center",
        });
        console.log("Login failed");
        return;
      }
      const headerAuth = response.headers
        .get("authorization")
        .replace("Bearer ", "");

      toast.success("Login successful", {
        position: "top-center",
      });
      console.log("Login successful:", data);
      console.log("Login authorization:", headerAuth);

      Cookies.set("token", headerAuth);
      Cookies.set("userId", data.userId);
      router.push("/admin/panel");
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen bg-black dark:bg-white">
      <div className="flex h-full items-center justify-center">
        <div className="sm:w-4/5 flex flex-col xl:flex-row items-center gap-12 lg:gap-32 text-white dark:text-black">
          <div className="w-2/3 md:w-1/2">
            <Image
              src="/img/logo/artlablogo.png"
              alt="logo"
              height={450}
              width={450}
              className="mix-blend-difference"
            />
          </div>
          <div className="hidden lg:block h-96 w-0.5 bg-white/50 dark:bg-black"></div>
          <div className="w-full lg:w-1/2 flex flex-col gap-6 sm:gap-14 items-center">
            {/* <div className="text-center">
              <h1 className="text-4xl font-semibold mb-5">Welcome</h1>
              <p>Please login to ArtLab Community</p>
            </div> */}
            <div className="w-10/12 flex justify-between gap-4">
              <button className="w-1/2 border rounded-xl p-3">
                <FcGoogle size={30} className="m-auto" />
              </button>
              <button className="w-1/2 border rounded-xl p-3">
                <FaFacebook size={30} className="m-auto" />
              </button>
            </div>
            <div className="w-10/12 flex gap-4">
              <div className="h-0.5 w-full bg-white dark:bg-black/20 m-auto"></div>
              <p className="text-white dark:text-black/20 font-semibold">OR</p>
              <div className="h-0.5 w-full bg-white dark:bg-black/20 m-auto"></div>
            </div>
            <form
              className="w-full flex flex-col items-center gap-14"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-10/12 text-white dark:text-black">
                <label htmlFor="username" className="font-semibold">
                  Email/Phone
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your email or phone number"
                  required
                  onChange={handleChange}
                  className="rounded-xl p-3 bg-white border mb-5"
                />
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  className="rounded-xl p-3 bg-white border"
                />
              </div>
              <button
                type="submit"
                className="bg-sky-500 dark:bg-black text-white p-3 w-10/12 sm:w-4/6 rounded-md"
              >
                {isLoading ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="loading"
                  />
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserLogin;
