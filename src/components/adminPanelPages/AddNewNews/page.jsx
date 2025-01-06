import * as React from "react";
import Image from "next/image";
import { Input, Select, SelectItem, Switch } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

import dynamic from "next/dynamic";
import { NextResponse } from "next/server";
import Cookies from "js-cookie";
import parse from "html-react-parser";
import PostContext from "@/context/PostContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

const JoditEditor = dynamic(
  () => import("jodit-react").then((mod) => mod.default),
  { ssr: false }
);
const JoditEditorWithRef = React.forwardRef((props, ref) => (
  <JoditEditor ref={ref} {...props} />
));
JoditEditorWithRef.displayName = "JoditEditorWithRef";

const AddNews = ({ seeEditNews }) => {
  const postContext = React.useContext(PostContext);
  const editor = React.useRef(null); //declared a null value
  const config = React.useMemo(
    //  Using of useMemo while make custom configuration is strictly recomended
    () => ({
      //  if you don't use it the editor will lose focus every time when you make any change to the editor, even an addition of one character
      /* Custom image uploader button configuretion to accept image and convert it to base64 format */
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"], // this line is not much important , use if you only strictly want to allow some specific image format
      },
    }),
    []
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const postData = async () => {
    await postContext.checkToken();
    const token = Cookies.get("token");
    if (token) {
      postContext.setIsLoading(true);
      try {
        const response = await fetch("/api/updatePost", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postContext.newsData),
        });

        const data = await response.json();
        if (!data.success) {
          toast.warning("Cannot send the data", {
            position: "top-center",
          });
          console.log("Cannot send the data");
          return NextResponse.json(
            { message: "Error in API call" },
            { status: response.status }
          );
        }
        toast.success("Successfully sended the post", {
          position: "top-center",
        });
      } catch (err) {
        console.log("There is an error that says: ", err.message);
      } finally {
        postContext.setIsLoading(false);
      }
    }
  };

  return (
    <div className="text-sm text-black mb-10">
      <div className="flex items-center gap-2 mb-8">
        <button
          className="bg-gray-300 rounded-3xl p-3 hover:bg-gray-500 duration-300"
          onClick={() => seeEditNews("Edit")}
        >
          <FaArrowLeftLong />
        </button>
        <p>БУЦАХ</p>
      </div>
      <div className="flex flex-col gap-5">
        <Input
          key="input-1"
          name="title"
          label="TITLE"
          variant="bordered"
          placeholder="Title"
          labelPlacement="outside"
          value={postContext.newsData.title}
          onChange={postContext.handleChange}
        />
        {/* <Input
          key="input-2"
          name="thumbnail"
          label="THUMBNAIL"
          variant="bordered"
          placeholder="Thumbnail"
          labelPlacement="outside"
          value={postContext.newsData.thumbnail}
          onChange={postContext.handleChange}
        /> */}
        <div className="h-full w-full" id="body">
          <label htmlFor="body">BODY</label>
          {/* This is the main initialization of the Jodit editor */}
          <JoditEditorWithRef
            ref={editor} //This is important
            value={postContext.newsData.body} //This is important
            config={config} //Only use when you declare some custom configs
            onChange={postContext.handleContentChange} //handle the changes
            className="w-full h-full bg-white text-black"
          />
          <style>{`.jodit-wysiwyg{height:300px !important}`}</style>
          {/* <button
            className="bg-sky-500 w-1/3 p-1 rounded-md text-white mt-1"
            onClick={postContext.handleBodySave}
          >
            Хадгалах
          </button> */}
        </div>

        {/* <div className="my-10 h-full w-full">
          Preview:
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div> */}
        <div className="flex gap-5">
          <Select
            key="select-1"
            name="type"
            labelPlacement="outside"
            variant="bordered"
            placeholder="type"
            label="Type"
            selectedKeys={[postContext.newsData.type]}
            value={postContext.newsData.type}
            onChange={postContext.handleChange}
          >
            <SelectItem key="blog">blog</SelectItem>
            <SelectItem key="Type 2">Type 2</SelectItem>
            <SelectItem key="Type 3">Type 3</SelectItem>
          </Select>
          <Select
            key="select-2"
            name="category"
            labelPlacement="outside"
            variant="bordered"
            placeholder="category"
            label="Category"
            selectedKeys={[postContext.newsData.category]}
            value={postContext.newsData.category}
            onChange={postContext.handleChange}
          >
            <SelectItem key="Technology">Technology</SelectItem>
            <SelectItem key="Category 2">Category 2</SelectItem>
            <SelectItem key="Category 3">Category 3</SelectItem>
          </Select>
        </div>
        <div>
          <p className="mb-2">Active</p>
          <Switch
            defaultSelected={postContext.isSelected}
            aria-label="Automatic updates"
            isSelected={postContext.newsData.active}
            onChange={postContext.handleSwitchChange}
          />
        </div>
      </div>
      <div className="flex justify-between mt-10">
        {/* <button
          className="flex items-center gap-4 bg-neutral-300 text-black py-2 px-4 rounded-md border border-transparent hover:bg-white hover:text-black hover:border-black duration-300"
          // onClick={() => setSeeNews(!seeNews)}
          onClick={() => {
            console.log(postContext.newsData);
          }}
        >
          <MdRemoveRedEye className="text-xl" /> See post
        </button> */}
        <div
          onClick={() => {
            console.log(postContext.newsData);
          }}
        >
          <Button onPress={onOpen}>
            <MdRemoveRedEye className="text-xl" /> See Post
          </Button>
          <Modal
            size="2xl"
            scrollBehavior="inside"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {postContext.newsData.title}
                  </ModalHeader>
                  <ModalBody>
                    <div className="flex flex-col gap-4 items-center  ">
                      <Image
                        src="/img/others/something.png"
                        alt="something"
                        height={600}
                        width={600}
                        className="hidden h-3/5 rounded-xl"
                      />
                      <div className="w-full">
                        {parse(postContext.newsData.body)}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <button
          className="bg-sky-500 py-2 px-4 rounded-xl text-white border border-transparent hover:bg-white hover:text-sky-500 hover:border-sky-500 duration-300"
          onClick={() => postData()}
        >
          {postContext.isLoading ? (
            <TailSpin height="20" width="20" color="#fff" ariaLabel="loading" />
          ) : (
            <div className="flex items-center gap-4">
              <FaRegSave className="text-xl" /> Save
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddNews;
