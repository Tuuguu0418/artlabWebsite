"use client";

import Image from "next/image";
import React, { useEffect } from "react";

import { Tooltip } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import { IoDocumentTextOutline, IoHardwareChipOutline } from "react-icons/io5";
import { SlGraduation } from "react-icons/sl";
import { WiStars } from "react-icons/wi";

import MainpageFooter from "@/components/mainPageComponents/mainpageFooterComponent";
import PriceComponent from "@/components/mainPageComponents/priceComponent";
import SolutionsComponent from "@/components/mainPageComponents/solutionsComponent";
import WhosUsingTest from "@/components/mainPageComponents/whosUsing";
import { LanguageContext } from "@/context/LanguageContext";
import { data } from "@/utils/mainpagelanguage";
import styles from "./Home.module.css";

export default function Home() {
  // Showcase text animation
  useEffect(() => {
    const txts = document.querySelectorAll(`.${styles.animateText} span`);
    const txtsLen = txts.length;
    let index = 0;
    const textInTimer = 3000;
    const textOutTimer = 2500;

    function animateText() {
      for (let i = 0; i < txtsLen; i++) {
        txts[i].classList.remove(styles.text_in, styles.text_out);
      }
      txts[index].classList.add(styles.text_in);

      setTimeout(() => {
        txts[index].classList.add(styles.text_out);
      }, textOutTimer);

      setTimeout(() => {
        if (index === txtsLen - 1) {
          index = 0;
        } else {
          index++;
        }
        animateText();
      }, textInTimer);
    }

    animateText();
  }, []);

  // Хэл солих хэсэг
  const { language } = React.useContext(LanguageContext);
  const content =
    language === "MN" ? data[0].languages.mongolian : data[0].languages.english;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="bg-black z-30">
        {/* Showcase header */}
        <section
          id="showcase"
          className="grid grid-cols sm:grid-cols-2 text-white sm:h-[95vh] w-full"
          data-textcolor="text-white"
        >
          <div className="order-last sm:order-first flex flex-col p-5 sm:p-2 sm:justify-center sm:items-center">
            <div className="2xl:w-[65%]">
              <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-5">
                {content.showcase.showcaseTitle1}
                <br /> {content.showcase.showcaseTitle2}
                <p
                  className={`inline-block font-semibold overflow-hidden -mb-2 ${styles.animateText}`}
                >
                  <span className={`hidden ${styles.textGradient}`}>
                    {content.showcase.showcaseText1}
                  </span>
                  <span className={`hidden ${styles.textGradient}`}>
                    {content.showcase.showcaseText2}
                  </span>
                  <span className={`hidden ${styles.textGradient}`}>
                    {content.showcase.showcaseText3}
                  </span>
                </p>
                <br />
                {content.showcase.showcaseTitle3}
                {content.showcase.showcaseTitle4} <br />
                {content.showcase.showcaseTitle5}
              </h2>

              <div className="flex items-center gap-1">
                <a
                  target="_blank"
                  href="https://artlab.mn/fc/main"
                  className="w-full sm:w-auto font-semibold text-xs 2xl:text-base text-center bg-sky-500 rounded-lg py-2 2xl:py-1 px-12 hover:bg-sky-800 duration-300"
                >
                  {content.showcase.showcaseButton}
                </a>

                <Tooltip
                  content={
                    <div className="flex flex-col items-center gap-2 text-white text-xs p-2">
                      <p>Scan this code</p>
                      <Image
                        src="/img/mainPage/ArtlabAppQrAppstore.png"
                        alt="qr code"
                        height={100}
                        width={100}
                      />
                    </div>
                  }
                  placement="right-end"
                  delay={0}
                  closeDelay={0}
                  className="bg-gray-900 p-0"
                >
                  <a
                    href="https://apps.apple.com/us/app/artlab/id6499415731"
                    target="_blank"
                    variant="bordered"
                    className="hidden sm:block border p-2 rounded-lg hover:border-transparent hover:bg-gray-900 duration-300"
                  >
                    <FaApple />
                  </a>
                </Tooltip>
                <Tooltip
                  content={
                    <div className="flex flex-col items-center gap-2 text-white text-xs p-2">
                      <p>Scan this code</p>
                      <Image
                        src="/img/mainPage/ArtlabAppQrPlaystore.png"
                        alt="qr code"
                        height={100}
                        width={100}
                      />
                    </div>
                  }
                  placement="right-end"
                  delay={0}
                  closeDelay={0}
                  className="bg-gray-900 p-0"
                >
                  <a
                    href="https://apps.apple.com/us/app/artlab/id6499415731"
                    target="_blank"
                    variant="bordered"
                    className="hidden sm:block border p-2 rounded-lg hover:border-transparent hover:bg-gray-900 duration-300"
                  >
                    <FaGooglePlay />
                  </a>
                </Tooltip>
              </div>
              <p className="flex justify-center sm:justify-normal items-center text-xs sm:text-base 2xl:text-lg mt-2">
                <WiStars className="hidden sm:inline" />{" "}
                {content.showcase.showcaseText4}
              </p>
            </div>
          </div>
          <div className="relative h-[30rem] sm:h-full w-full">
            <Image
              src="/img/others/something.png"
              fill
              style={{ objectFit: "cover" }}
              alt="something"
              className="sm:rounded-bl-2xl"
            />
          </div>
        </section>

        {/* Сонгох шалтгаан  Section */}
        <section
          id="why"
          data-textcolor="text-black"
          className="text-black px-3"
        >
          <div className="h-full w-full bg-white rounded-3xl sm:rounded-lg mt-20 pb-8 overflow-hidden">
            <div className="static w-full flex text-xs 2xl:text-medium overflow-hidden">
              <div className="w-full sm:w-3/4 flex xl:justify-end mt-10 sm:mt-20 z-20">
                {/* <ChooseReason /> */}
                <div className="xl:w-4/5 flex flex-col gap-5">
                  <h2 className="border border-black w-fit mx-auto sm:mx-0 sm:ml-7 py-1 px-6 rounded-2xl text-base 2xl:text-xl">
                    {content.why.title1}
                  </h2>
                  <div className="flex gap-3 mx-1 sm:ml-1 p-5 px-7 rounded-xl group hover:bg-gradient-to-l from-blue-600 to-cyan-500 hover:text-white duration-500">
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="h-4 w-4 bg-black rounded-xl group-hover:bg-white duration-500 group-hover:translate-y-44 lg:group-hover:translate-y-32 xl:group-hover:translate-y-36 2xl:group-hover:translate-y-52"></div>
                      <div className="h-full w-px bg-black group-hover:bg-white duration-500"></div>
                    </div>
                    <div className="flex flex-col gap-5 box-border">
                      <h2 className="text-base 2xl:text-xl font-bold">
                        {content.why.subTitle1}
                      </h2>
                      <p>{content.why.subText1}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mx-1 sm:ml-1 p-5 px-7 rounded-xl group hover:bg-gradient-to-l from-blue-600 to-cyan-500 hover:text-white duration-500">
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="h-4 w-4 bg-black rounded-xl group-hover:bg-white group-hover:translate-y-32 lg:group-hover:translate-y-24 xl:group-hover:translate-y-24 2xl:group-hover:translate-y-32 duration-500"></div>
                      <div className="h-full w-px bg-black group-hover:bg-white duration-500"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <h2 className="text-base 2xl:text-xl font-bold">
                        {content.why.subTitle2}
                      </h2>
                      <p>{content.why.subText2}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mx-1 sm:ml-1 p-5 px-7 rounded-xl group hover:bg-gradient-to-l from-blue-600 to-cyan-500 hover:text-white duration-500">
                    <div className="hidden sm:flex flex-col items-center pt-1">
                      <div className="h-4 w-4 bg-black rounded-xl group-hover:bg-white group-hover:translate-y-32 lg:group-hover:translate-y-24 xl:group-hover:translate-y-28 2xl:group-hover:translate-y-40 duration-500"></div>
                      <div className="h-full w-px bg-black group-hover:bg-white duration-500"></div>
                    </div>
                    <div className="flex flex-col gap-5">
                      <h2 className="text-base 2xl:text-xl font-bold">
                        {content.why.subTitle3}
                      </h2>
                      <p>{content.why.subText3}</p>
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src="/img/backgrounds/WhyArtlabSectionbg.png"
                alt="Frame"
                height={600}
                width={600}
                className="hidden sm:block sm:relative top-0 right-0 w-1/3 scale-[1.8] xl:scale-100 xl:static xl:w-1/2 h-full -mt-20 xl:-mr-14"
              />
            </div>
            <div
              id="usage"
              className="w-[95%] xl:w-3/4 flex flex-col sm:items-end gap-14 pt-20 m-auto text-white"
            >
              <h2 className="w-fit bg-sky-500 rounded-2xl text-base px-5 py-1 mx-auto sm:mx-0">
                {content.why.title2}
              </h2>
              <WhosUsingTest />
            </div>
          </div>
        </section>

        {/* Шийдлүүд Section */}
        <section
          id="solutions"
          data-textcolor="text-white"
          className="text-black py-32"
        >
          <div className="w-full flex flex-col items-center text-xs">
            <div className="w-11/12 xl:w-3/4 text-white">
              <div className="text-center px-16 mb-9">
                <h1 className="text-2xl 2xl:text-4xl font-semibold text-center mb-9">
                  {content.solutions.title1}
                </h1>
              </div>
              <SolutionsComponent />
            </div>
          </div>
        </section>

        {/* Үнийн мэдээлэл Section */}
        <section
          id="price"
          data-textcolor="text-white"
          className="text-white pb-10 sm:py-36 flex flex-col items-center"
        >
          <h3 className="text-xl sm:text-2xl 2xl:text-4xl text-center font-semibold mb-10">
            {content.price.title}
          </h3>
          <PriceComponent />
        </section>

        {/* Хамтран ажиллах Section */}
        <section
          id="partner"
          data-textcolor="text-black"
          className="text-black"
        >
          <div className="bg-white m-3 border rounded-lg">
            <h2 className="text-center font-semibold text-xl sm:text-2xl 2xl:text-4xl my-12">
              {content.partner.title}
            </h2>
            <div className="w-10/12 flex flex-col xl:flex-row mx-auto text-xs 2xl:text-medium sm:mb-40">
              <div className="xl:w-2/3 flex flex-col sm:flex-row gap-10 mx-auto mb-10 xl:mb-0 xl:mr-10 ">
                <div className="w-full xl:w-1/2 flex flex-col gap-2 border rounded-xl p-4">
                  <IoHardwareChipOutline className="text-sky-500 text-4xl" />
                  <h3 className="w-3/4 text-base 2xl:text-xl font-semibold">
                    {content.partner.subTitle1}
                  </h3>
                  <p className="h-1/3">{content.partner.subText1}</p>
                  <div className="flex items-center gap-3 mt-5">
                    <a href="https://egulen.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/egulenLogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://www.timely.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/timelyLogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://web.able.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/ableLogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://about.qmenu.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/qMenuLogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                  </div>
                </div>
                <div className="w-full xl:w-1/2 flex flex-col gap-2 border rounded-xl p-4">
                  <SlGraduation className="text-sky-500 text-4xl" />
                  <h3 className="w-3/4 text-base 2xl:text-xl font-semibold">
                    {content.partner.subTitle2} <br />
                  </h3>
                  <p className="h-1/3">{content.partner.subText2}</p>
                  <div className="flex items-center gap-3 mt-5">
                    <a href="https://num.edu.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/NumLogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://mandakh.edu.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/MandahUni.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://www.ufe.edu.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/UFELogo.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                    <a href="https://www.muls.edu.mn/" target="_blank">
                      <Image
                        src="/img/collaboration/Haiis.png"
                        alt=""
                        height={35}
                        width={35}
                        className="rounded-full"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="sm:w-[48%] xl:w-1/3 flex flex-col gap-2 border rounded-xl p-4 mx-auto xl:mx-0">
                <IoDocumentTextOutline className="text-sky-500 text-4xl" />
                <h3 className="w-3/4 text-base 2xl:text-xl font-semibold">
                  {content.partner.subTitle3}
                </h3>
                <p className="h-1/3">{content.partner.subText3}</p>
                <div className="flex items-center gap-3 mt-5">
                  <a
                    href="https://www.facebook.com/ganbat.uyanga.39/"
                    target="_blank"
                  >
                    <Image
                      src="/img/collaboration/FSA.jpg"
                      alt=""
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/BolorActive"
                    target="_blank"
                  >
                    <Image
                      src="/img/collaboration/BolorActive.png"
                      alt=""
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/Uuriintsolmon.Ch/"
                    target="_blank"
                  >
                    <Image
                      src="/img/collaboration/ErkhemTunsh.jpg"
                      alt=""
                      height={35}
                      width={35}
                      className="rounded-full"
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* <NewsComponent /> */}
          </div>
        </section>

        {/* Санал хүсэлт Section */}
        <section id="contact" data-textcolor="text-white">
          <div className="bg-[url('/img/backgrounds/footer_bg.png')] bg-cover bg-center bg-no-repeat w-full pb-20 pt-32 xl:pt-52">
            <MainpageFooter />
            <div className="w-11/12 sm:w-4/5 xl:w-2/3 flex justify-center gap-5 mt-5 m-auto text-white/70 text-sm">
              <a
                href="https://www.termsfeed.com/live/523744b8-6eb3-425a-893a-482953eef05b"
                className="hover:underline"
              >
                Terms of service
              </a>
              <a
                href="https://www.termsfeed.com/live/957daac2-801e-4fda-83ef-ee9c22762288"
                className="hover:underline"
              >
                Privacy policy
              </a>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}
