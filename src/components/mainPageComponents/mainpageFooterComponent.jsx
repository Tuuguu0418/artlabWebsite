import { LanguageContext } from "@/context/LanguageContext";
import { data } from "@/utils/mainpagelanguage";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainpageFooter = () => {
  // Хэл солих хэсэг
  const { language } = React.useContext(LanguageContext);
  const content =
    language === "MN" ? data[0].languages.mongolian : data[0].languages.english;
  // Footer хэсэг
  const [feedbackForm, setFeedbackForm] = React.useState({
    phone: "",
    email: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm({ ...feedbackForm, [name]: value });
    if (name === "email") {
      setValidationErrors((prev) => ({
        ...prev,
        email: !validateEmail(value),
      }));
    } else {
      if (value) {
        setValidationErrors((prev) => ({ ...prev, [name]: !value }));
      }
    }
    if (name === "phone") {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: !validatePhone(value),
      }));
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (number) => {
    const phone = number.toString();
    if (phone.length < 8) return false;
    else return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requiredFields = ["description", "email", "phone"];

    const newValidationErrors = {};
    requiredFields.forEach((field) => {
      if (!feedbackForm[field]) {
        newValidationErrors[field] = true;
      }
    });

    if (feedbackForm.phone.toString().length < 8) {
      newValidationErrors.phone = true;
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      toast.error("Та бүх хэсгийг зөв бөглөнө үү", { position: "top-center" });
      return;
    }

    setIsLoading(true);
    try {
      // Send the POST request
      const response = await fetch(
        "https://api.artlab.mn/inner/web/crm-request/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(feedbackForm),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Амжилттай илгээлээ.", { position: "top-center" });
        setFeedbackForm({
          phone: "",
          email: "",
          description: "",
        });
        document.getElementById("feedbackForm").reset();
      } else {
        // Handle error response
        toast.error(data.message, { position: "top-center" });
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      id="feedbackForm"
      className="w-11/12 sm:w-4/5 xl:w-2/3 text-xs 2xl:text-base text-white bg-black/60 backdrop-blur bg-opacity-75 border border-white/50 rounded-xl mx-auto py-5 px-7"
      onSubmit={handleSubmit}
    >
      <textarea
        key="textarea-1"
        name="description"
        rows="6"
        placeholder={content.contact.textareaText}
        onChange={handleChange}
        className="w-full mb-5 border border-white/50 rounded-lg bg-black bg-opacity-0 p-4"
      ></textarea>
      <div className="w-full flex flex-col sm:flex-row sm:justify-between">
        <div className="flex flex-col sm:flex-row sm:w-2/3 gap-5 sm:gap-0 sm:space-x-4">
          <input
            key="input-1"
            name="email"
            type="email"
            placeholder={content.contact.inputText1}
            required
            onChange={handleChange}
            className="border border-white/50 rounded-md bg-black bg-opacity-0 px-4 py-2 sm:w-1/2"
          />
          <input
            key="input-2"
            name="phone"
            type="number"
            placeholder={content.contact.inputText2}
            required
            onChange={handleChange}
            className="border border-white/50 rounded-md bg-black bg-opacity-0 px-4 py-2 sm:w-1/2"
          />
        </div>
        <div className="flex justify-center sm:block">
          <button
            disabled={isLoading}
            type="submit"
            className="w-1/3 sm:w-auto rounded-md bg-sky-500 sm:px-4 py-2 mt-5 sm:mt-0"
          >
            {isLoading ? (
              <TailSpin
                height="20"
                width="20"
                color="#fff"
                ariaLabel="loading"
              />
            ) : (
              content.contact.buttonText
            )}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-0 text-center sm:text-left">
        <div className="flex flex-col space-y-2 mt-8">
          <p>
            <span className="font-bold">{content.contact.subText1}&emsp;</span>
            info@artlab.mn
          </p>
          <p>
            <span className="font-bold">{content.contact.subText2}&emsp;</span>
            7505 6505
          </p>
          <p>
            <span className="font-bold">{content.contact.subText3}&emsp;</span>
            MN tower #1407, Chingeltei, 5th khoroo, Ulaanbaatar, Mongolia
          </p>
        </div>
        <div className="mx-auto sm:mx-0 sm:relative">
          <ul className="flex space-x-4 sm:absolute sm:bottom-0 sm:right-0 text-2xl 2xl:text-4xl list-none">
            <li className="border rounded-lg p-2">
              <a target="_blank" href="https://www.facebook.com/artlab.mn/">
                <FaFacebook />
              </a>
            </li>
            <li className="border rounded-lg p-2">
              <a target="_blank" href="https://www.instagram.com/artlab.mn/">
                <FaInstagram />
              </a>
            </li>
            <li className="border rounded-lg p-2">
              <a target="_blank" href="">
                <FaTelegram />
              </a>
            </li>
            <li className="border rounded-lg p-2">
              <a target="_blank" href="">
                <FaEnvelope />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default MainpageFooter;
