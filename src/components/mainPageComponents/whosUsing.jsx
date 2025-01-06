import React, { useState, useContext } from "react";
import Image from "next/image";
import { LanguageContext } from "@/context/LanguageContext";

const WhosUsingTest = () => {
  const { language } = useContext(LanguageContext);
  const [activeIndex, setActiveIndex] = useState(0); // Track the active clicked div

  const contents = [
    {
      title:
        language === "MN"
          ? "Хүнсний үйлдвэрлэл худалдаа"
          : "Food production and trade",
      imgPath: "/img/whosUsing/Food.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
    {
      title: language === "MN" ? "Гаалийн чөлөөт бүс" : "Customs free zone",
      imgPath: "/img/whosUsing/cholootBus.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
    {
      title: language === "MN" ? "Жижиглэнгийн худалдаа" : "Retail trade",
      imgPath: "/img/whosUsing/SmallBusiness.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
    {
      title:
        language === "MN"
          ? "Сургууль, боловсролын байгууллага"
          : "Schools and educational institutions",
      imgPath: "/img/whosUsing/schoolEducation.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
    {
      title:
        language === "MN"
          ? "Төрийн бус байгууллага"
          : "Non-governmental organization",
      imgPath: "/img/whosUsing/toriinBusBaiguullga.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
    {
      title:
        language === "MN"
          ? "Олон салбартай, их өгөгдөлтэй байгууллагууд"
          : "Multidisciplinary, data-intensive organizations",
      imgPath: "/img/whosUsing/HugeData.png",
      company1: "/img/companies/ubcab.png",
      company2: "/img/companies/ubcab.png",
      company3: "/img/companies/ubcab.png",
    },
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
      <div
        className={`${
          activeIndex === 0 ? "h-60 sm:w-3/5" : "h-10 sm:w-[6%]"
        } sm:h-80 2xl:h-96 bg-[url('/img/whosUsing/uildwerlel.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-end rounded-xl p-4 duration-300 cursor-pointer`}
        onClick={() => setActiveIndex(0)} // Set activeIndex to 0 when this div is clicked
      >
        <div className={`${activeIndex === 0 ? "block" : "hidden"} ml-3`}>
          <h3 className="text-3xl font-semibold mb-2">
            {language === "MN" ? "Үйлдвэрлэл" : "Production"}
          </h3>
        </div>
      </div>
      {contents.map((el, index) => (
        <div
          key={index}
          className={`${
            activeIndex === index + 1 ? "h-60 sm:w-3/5" : "h-10 sm:w-[6%]"
          } sm:h-80 2xl:h-96 bg-cover bg-center bg-no-repeat flex flex-col justify-end rounded-xl p-4 duration-300 cursor-pointer`}
          style={{ backgroundImage: `url(${el.imgPath})` }}
          onClick={() => setActiveIndex(index + 1)} // Set the activeIndex to clicked div
        >
          <div
            className={`${activeIndex === index + 1 ? "block" : "hidden"} ml-3`}
          >
            <h3 className="text-3xl font-semibold mb-2">{el.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhosUsingTest;
