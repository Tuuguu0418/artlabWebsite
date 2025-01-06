"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostContext = React.createContext();

export const PostProvider = (props) => {
  // Spinner
  const [isLoading, setIsLoading] = React.useState(false);

  const [isSelected, setIsSelected] = React.useState(true);
  const [content, setContent] = React.useState("");
  const [newsData, setNewsData] = React.useState({
    title: "",
    thumbnail: "",
    body: "",
    type: "",
    category: "",
    active: isSelected,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleSwitchChange = (e) => {
    setIsSelected(e.target.checked);
    setNewsData({ ...newsData, active: e.target.checked });
  };

  const handleContentChange = (value) => {
    setContent(value);
    setNewsData((prevState) => ({
      ...prevState,
      body: value, // Update the body with every change in the editor
    }));
  };
  const handleBodySave = () => {
    setNewsData((prevState) => ({
      ...prevState,
      body: content,
    }));
  };

  const checkToken = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch("/api/auth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.warning("Failed to authenticate", {
          position: "top-center",
        });
        logoutUser();
        return;
      }

      const data = await response.json();
      console.log("Auth check: ", data);
      if (!data.success) {
        logoutUser();
        return;
      }
      return true;
    } catch (err) {
      alert("There is an error: ", err.message);
    }
  };

  const router = useRouter();

  const logoutUser = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    router.push("/admin/login");
  };

  return (
    <PostContext.Provider
      value={{
        newsData,
        setNewsData,
        isLoading,
        setIsLoading,
        handleChange,
        handleSwitchChange,
        content,
        setContent,
        handleContentChange,
        handleBodySave,
        checkToken,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContext;
