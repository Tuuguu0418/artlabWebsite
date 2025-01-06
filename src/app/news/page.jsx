"use client";
import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import FooterComponent from "@/components/FooterComponent";

const NewsPage = () => {
  const [arr, setArr] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const doSearch = async () => {
    try {
      const query = new URLSearchParams({
        type: "",
        category: "",
        active: "1",
      }).toString();
      const result = await fetch(`/api/getAllPosts?${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "js-response-modify": 1,
        },
      });

      if (result) {
        const data = await result.json();

        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const seeData = async () => {
      const data = await doSearch();
      setArr(data.value);
      // setArr(data.splice(0, 50));
    };

    seeData();
  }, []);

  // Calculate the items to display based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFirstItem = arr.slice(indexOfFirstItem, indexOfFirstItem + 1);
  const currentItems = arr.slice(indexOfFirstItem + 1, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className="bg-white pt-28 text-black text-xs">
      <div className="w-full flex justify-center">
        <div className="w-1/2">
          <div className="flex flex-col gap-4 mb-10">
            <Link
              href={`/posts/${
                currentFirstItem[0] ? currentFirstItem[0].postId : "/news"
              }`}
              className="rounded-3xl shadow-md p-4"
            >
              <Image
                src="/img/others/something.png"
                alt="artlab com"
                height={1000}
                width={1000}
                className="rounded-xl w-full h-64 object-cover mb-3"
              />
              <h2 className="px-2 font-semibold text-sm">
                {currentFirstItem[0] ? currentFirstItem[0].title : "Loading..."}
              </h2>
            </Link>
            {currentItems.map((el, index) => (
              <Link
                href={`/posts/${el.postId}`}
                key={index}
                className="flex gap-4 rounded-3xl shadow-md p-4"
              >
                <Image
                  src="/img/others/something.png"
                  alt="artlab photo"
                  height={150}
                  width={150}
                  className="rounded-xl h-36 w-36 object-cover"
                />
                <div className="flex flex-col gap-2 justify-center">
                  <h3 className="text-sm font-semibold">{el.title}</h3>
                  <p>{el.category}</p>
                </div>
              </Link>
            ))}
            {/* <div className="flex gap-4 rounded-3xl shadow-md p-4">
              <Image
                src="/img/others/something.png"
                alt="artlab photo"
                height={150}
                width={150}
                className="rounded-xl h-36 w-36"
              />
              <div className="flex flex-col gap-2 justify-center">
                <h3 className="text-sm font-semibold">Бид найзлах дуртай 👐</h3>
                <p>
                  Egulen Pos -Ресторан, Бар, Караоке, Лоунж, Кофе шоп зэрэг
                  нийтийн хоолны салбарт зориулсан - Ухаалаг кассын систем-тэй
                  амжилттай холбогдон олон жил хамтран ажиллаж байгаа бидний
                  багын найз юм.
                </p>
              </div>
            </div>
             */}
            <div className="flex justify-center overflow-hidden mt-4">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
                }`}
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
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === Math.ceil(arr.length / itemsPerPage)
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white"
                }`}
              >
                ДАРААХ
              </button>
            </div>
          </div>
          <FooterComponent />
        </div>
      </div>
    </main>
  );
};

export default NewsPage;
