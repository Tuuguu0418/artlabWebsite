"use client";
import * as React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CompaniesComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 0,
    speed: 4000,
    pauseOnHover: false,
    cssEase: "linear",
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const slides = [
    {
      name: "Jack's Coffee",
      field1: "Үйлчилгээ",
      field2: "Худалдаа",
      imageUrl: "/img/companies/jackscoffee.png",
    },
    {
      name: "Монре Даатгал",
      field1: "Даатгал",
      imageUrl: "/img/companies/monredaatgal.png",
    },
    {
      name: "UB-CAB",
      field1: "Үйлчилгээ",
      imageUrl: "/img/companies/ubcab.png",
    },
    {
      name: "Bodios",
      field1: "Үйлдвэрлэл",
      field2: "Худалдаа",
      imageUrl: "/img/companies/bodios.png",
    },
    {
      name: "Tomyo School",
      field1: "Боловсрол",
      imageUrl: "/img/companies/tomyoschool.png",
    },
  ];

  return (
    <div className="mx-auto w-full">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="p-4">
            <div className="relative bg-white h-72 2xl:h-96">
              <div className="relative h-3/4 w-11/12">
                <Image
                  src={slide.imageUrl}
                  alt={slide.name}
                  fill
                  objectFit="cover"
                  className="p-5"
                />
              </div>
              <div className="absolute bottom-2 left-2 p-2 w-[90%]">
                <h3 className="text-sm font-semibold">{slide.name}</h3>
                <p className="inline bg-gray-200 text-xs px-2 rounded-md mt-1">
                  {slide.field1}
                </p>
                {/* <p className="inline bg-gray-200 text-xs px-2 rounded-md mt-1">
                  {slide.field2}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompaniesComponent;