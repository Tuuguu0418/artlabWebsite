import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import Image from "next/image";
import styles from "./style.module.css";
import { HiArrowLongRight } from "react-icons/hi2";
import { LanguageContext } from "@/context/LanguageContext";

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

const SolutionsComponent = () => {
  const { language } = useContext(LanguageContext);
  const contents = useMemo(
    () => [
      {
        title: language === "MN" ? "Санхүү, НББ" : "Finance and Accounting",
        imageUrl: "/img/others/",
      },
      {
        title: language === "MN" ? "Цалин" : "Salary",
        imageUrl: "",
      },
      {
        title: language === "MN" ? "Кассын систем" : "Point of Sales Salary",
        imageUrl: "",
      },
      {
        title: language === "MN" ? "Түгээлт" : "Distribution",
        imageUrl: "",
      },
    ],
    [language]
  );

  const [rotates, setRotates] = useState(contents.map(() => ({ x: 0, y: 0 })));
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track the hover state

  const onMouseMove = useCallback(
    (index) =>
      throttle((e) => {
        const card = e.currentTarget;
        const box = card.getBoundingClientRect();
        const x = e.clientX - box.left;
        const y = e.clientY - box.top;
        const centerX = box.width / 2;
        const centerY = box.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        const newRotates = [...rotates];
        newRotates[index] = { x: rotateX, y: rotateY };
        setRotates(newRotates);
      }, 100),
    [rotates]
  );

  const onMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const onMouseLeave = (index) => {
    const newRotates = [...rotates];
    newRotates[index] = { x: 0, y: 0 };
    setRotates(newRotates);
    setHoveredIndex(null); // Reset hover state
  };

  useEffect(() => {
    if (hoveredIndex === null) {
      // Reset all rotations when no card is hovered
      setRotates(contents.map(() => ({ x: 0, y: 0 })));
    }
  }, [hoveredIndex, contents]);

  useEffect(() => {
    const cards = document.querySelectorAll(`.${styles.glowCard}`);
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
      });
    });
  }, []);

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5 2xl:gap-10">
      {contents.map((el, index) => (
        <div
          key={index}
          className={`${
            styles.glowCard
          } w-4/5 sm:w-full flex 2xl:items-center border border-white/20 rounded-xl ${
            index % 2 === 1 ? "ml-auto" : ""
          }`}
          onMouseMove={(e) => onMouseMove(index)(e)}
          onMouseEnter={() => onMouseEnter(index)}
          onMouseLeave={() => onMouseLeave(index)}
          style={{
            transform: `perspective(1000px) rotateX(${rotates[index].x}deg) rotateY(${rotates[index].y}deg) scale3d(1, 1, 1)`,
            transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
          }}
        >
          <div
            className={`w-2/3 flex flex-col items-start gap-3 py-6 pl-7 sm:p-7 z-10 ${styles.glowCardContent}`}
          >
            <div className="flex gap-3 items-center">
              <h3 className="text-lg sm:text-2xl font-semibold">{el.title}</h3>
              <HiArrowLongRight className="text-4xl text-sky-500" />
            </div>
            {/* <p>{el.desc}</p> */}
          </div>
          {/* <Image
            src={`${el.imageUrl}`}
            alt="coin and chart"
            height={150}
            width={150}
            className="w-1/3 z-10"
          /> */}
        </div>
      ))}
    </div>
  );
};

export default SolutionsComponent;
