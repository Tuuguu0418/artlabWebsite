"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import parse from "html-react-parser";
import FooterComponent from "@/components/FooterComponent";

const NewsShow = ({ params }) => {
  const { id } = params; // Get the id from the URL

  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchNews = async () => {
        try {
          const response = await fetch(
            `https://api.artlab.mn/inner/web/posts/${id}`,
            {
              method: "GET",
            }
          );

          const data = await response.json();
          if (!data.success || !response.ok) {
            notFound(); // If the success is false, show a 404 page
          }

          setNewsItem({
            ...data.value,
          });
        } catch (error) {
          console.log("There is a error: ", error);
        }
      };
      fetchNews();
    }
  }, [id]);

  if (!newsItem) return <p>Loading...</p>;

  return (
    <main className="bg-white text-black">
      <div className="w-full h-full flex pt-20 justify-center">
        <div className="w-4/5 flex flex-col text-sm">
          <div className="flex flex-col gap-4 items-start">
            <Image
              src="/img/others/something.png"
              alt="something"
              height={1000}
              width={1000}
              className="hidden w-full h-1/2 rounded-xl"
            />
            <p>Нүүр &#62; Мэдээ &#62; {newsItem.type}</p>
            <h1 className="w-4/5 font-semibold text-2xl">{newsItem.title}</h1>
            <div className="flex gap-3">
              <Image
                src="/img/others/something.png"
                alt="something"
                height={25}
                width={25}
                className="rounded-full"
              />
              <p>ArtLab</p>
              <p>{newsItem.createdAt}</p>
            </div>
            <div className="px-5">
              {parse(newsItem.body)}
              <br />
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </main>
  );
};

export default NewsShow;
