import React, { useEffect, useState, useContext, useCallback } from "react";
import AddNews from "../AddNewNews/page";
import PostContext from "@/context/PostContext";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";

const AdminPanelProductDB = () => {
  const postContext = useContext(PostContext);

  const [arr, setArr] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [editNews, seeEditNews] = useState("Edit");
  const itemsPerPage = 10;

  const [searchOptions, setSearchOptions] = useState({
    type: "",
    category: "",
    active: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchOptions({ ...searchOptions, [name]: value });
  };

  const clearFields = async () => {
    setArr([]);
    setSearchOptions({
      type: "",
      category: "",
      active: "",
    });
    await doSearch();
  };

  // Edit hiih medeenudig bugdig ni awc arr-d hiih heseg
  const doSearch = useCallback(async () => {
    try {
      const query = new URLSearchParams(searchOptions).toString();
      const results = await fetch(`/api/getAllPosts?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "js-response-modify": 1,
        },
      });

      if (results) {
        const data = await results.json();
        setArr(data.value);
        return data;
      }
    } catch (error) {
      console.log("There is a error: " + error);
    }
  }, [searchOptions]);

  useEffect(() => {
    const seeData = async () => {
      const data = await doSearch();
      setArr(data.value);
    };

    seeData();
  }, [doSearch]);

  // Edit hiih medeeni data-g postContext-iin state ruu oruulj bn
  const setNewsInformation = (data) => {
    postContext.setNewsData({
      postId: data.postId,
      title: data.title,
      thumbnail: data.thumbnail,
      body: data.body,
      type: data.type,
      category: data.category,
      active: data.active,
    });
    seeEditNews("EditPerPage");
  };

  const setNewNewsInformation = () => {
    postContext.setNewsData({
      title: "",
      thumbnail: "",
      body: "",
      type: "",
      category: "",
      active: true,
    });
    postContext.setContent("");
    seeEditNews("Add");
  };

  // Calculate the items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = arr.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems = (arr || []).slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (editNews === "Edit") {
    return (
      <div className="w-full h-full flex justify-center mb-36 text-black">
        <div className="w-11/12 text-xs">
          <h1 className="text-xl font-medium">Post</h1>
          <div className="flex justify-between items-end overflow-hidden mt-4 text-xs mb-5">
            <button
              className="h-fit px-4 py-2 rounded-md bg-lime-600 text-white hover:bg-lime-700 duration-300"
              onClick={() => setNewNewsInformation()}
            >
              + New Post
            </button>
            <div className="w-3/4 flex items-end gap-2">
              {/* <input
                type="text"
                placeholder="Search..."
                className="h-fit w-3/4 border p-1.5 rounded-md"
              /> */}
              <Dropdown>
                <DropdownTrigger className="w-1/4 border rounded-md h-full p-1.5 text-black/50 text-xs">
                  <Button variant="light">
                    Category <IoIosArrowDown className="text-md" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  name="category"
                  onAction={(key) =>
                    handleChange({ target: { name: "category", value: key } })
                  }
                >
                  <DropdownItem key="Technology">Technology</DropdownItem>
                  <DropdownItem key="Category 2">Category 2</DropdownItem>
                  <DropdownItem key="Category 3">Category 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="w-1/4 border rounded-md h-full p-1.5 text-black/50 text-xs">
                  <Button variant="light">
                    Type <IoIosArrowDown className="text-md" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  name="type"
                  onAction={(key) =>
                    handleChange({ target: { name: "type", value: key } })
                  }
                >
                  <DropdownItem key="blog">blog</DropdownItem>
                  <DropdownItem key="Type 2">Type 2</DropdownItem>
                  <DropdownItem key="Type 3">Type 3</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown>
                <DropdownTrigger className="w-1/4 border rounded-md h-full p-1.5 text-black/50 text-xs">
                  <Button variant="light">
                    Active <IoIosArrowDown className="text-md" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Action event example"
                  onAction={(key) =>
                    handleChange({ target: { name: "active", value: key } })
                  }
                >
                  <DropdownItem key="1">Active</DropdownItem>
                  <DropdownItem key="0">Inactive</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <button
                className="bg-sky-500 text-white rounded-md p-1.5 border border-transparent hover:bg-white hover:text-sky-500 duration-300 hover:border-sky-500"
                onClick={() => doSearch()}
              >
                Search
              </button> */}
              <button
                className="w-1/4 bg-neutral-300 text-white rounded-md p-1.5 border border-transparent hover:bg-white hover:text-neutral-500 hover:border-neutral-500 duration-300"
                onClick={() => clearFields()}
              >
                Clear Filters
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <ul className="flex justify-between p-2 text-black/50 list-none">
              <li className="w-2/5">Title</li>
              <li className="px-4">Category</li>
              <li className="px-4">Active</li>
              <li className="w-[10%]">Date</li>
            </ul>
            {currentItems[0] ? (
              currentItems.map((el, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border rounded-lg p-2 cursor-pointer"
                  onClick={() => setNewsInformation(el)}
                >
                  <h1 className="w-2/5 font-semibold">{el.title}</h1>
                  <p className="px-4 py-2 rounded-2xl text-white bg-orange-500">
                    {el.category}
                  </p>
                  <p
                    className={`px-4 py-2 rounded-2xl text-white ${
                      el.active ? "bg-lime-600" : "bg-neutral-300"
                    } `}
                  >
                    {el.active ? "Active" : "Inactive"}
                  </p>
                  <p className="font-semibold">{el.createdAt}</p>
                </div>
              ))
            ) : (
              <div className="mx-auto text-3xl font-semibold">Loading...</div>
            )}
          </div>
          {arr !== null ? (
            <div className="flex justify-center overflow-hidden mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded-md bg-gray-300`}
              >
                ӨМНӨХ
              </button>
              {Array.from(
                { length: Math.ceil(arr.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-sky-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(arr.length / itemsPerPage)}
                className={`px-4 py-2 mx-1 rounded-md bg-gray-300`}
              >
                ДАРААХ
              </button>
            </div>
          ) : (
            <div className="w-fit m-auto text-3xl font-semibold">
              Search empty!
            </div>
          )}
        </div>
      </div>
    );
  } else if (editNews === "EditPerPage" || editNews === "Add") {
    return (
      <NextUIProvider>
        <main className="w-full h-full p-6">
          <div className="flex justify-between">
            <div className="w-2/3">
              <AddNews seeEditNews={seeEditNews} />
            </div>
            {/* <div className="w-1/2 h-full overflow-y-scroll">{renderNews()}</div> */}
          </div>
        </main>
      </NextUIProvider>
    );
  }
  // else if (editNews === "Add") {
  //   return (
  //     <NextUIProvider>
  //       <main className="w-full h-full p-6">
  //         <div className="flex justify-between">
  //           <div className="w-2/3">
  //             <AddNews seeEditNews={seeEditNews} />
  //           </div>
  //           {/* <div className="w-1/2 h-full overflow-y-scroll">{renderNews()}</div> */}
  //         </div>
  //       </main>
  //     </NextUIProvider>
  //   );
  // }
};

export default AdminPanelProductDB;
