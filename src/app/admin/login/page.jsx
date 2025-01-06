"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
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
    <main className="w-full h-screen bg-black">
      <div className="flex h-full items-center justify-center">
        <div className="w-4/5 flex items-center gap-0 lg:gap-32 text-white">
          <div className="hidden lg:block w-1/2">
            <Image
              src="/img/logo/artlablogo.png"
              alt="logo"
              height={450}
              width={450}
            />
          </div>
          <div className="hidden lg:block h-96 w-0.5 bg-white/50"></div>
          <div className="w-full lg:w-1/2 flex flex-col gap-14 items-center">
            <div className="text-center">
              <h1 className="text-4xl font-semibold mb-5">Welcome</h1>
              <p>Please login to admin panel</p>
            </div>
            <form
              className="w-full flex flex-col items-center gap-14"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col w-10/12 gap-3 text-black">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  onChange={handleChange}
                  className="rounded-md p-3"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  className="rounded-md p-3"
                />
              </div>
              <button type="submit" className="bg-sky-500 p-3 w-4/6 rounded-md">
                {isLoading ? (
                  <TailSpin
                    height="20"
                    width="20"
                    color="#fff"
                    ariaLabel="loading"
                  />
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;
