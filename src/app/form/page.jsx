"use client";

import { LanguageContext } from "@/context/LanguageContext";
import { formDataLanguage } from "@/utils/formPageLanguage";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import * as React from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forms = () => {
  const [formData, setFormData] = React.useState({
    companyName: "",
    companyNameEn: "",
    companyRegNum: "",
    activity: "",
    phone1: "",
    phone2: "",
    email: "",
    address: "",
    position1: "",
    personnel1: "",
    position2: "",
    personnel2: "",
    userCount: "",
    hasAddDb: undefined,
    addDbDesc: "",
    note: "",
  });

  const [isAdditionalCompanySelected, setIsAdditionalCompanySelected] =
    React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSelectChange = (value) => {
    const isAdditionalSelected = value === "Тийм";
    setIsAdditionalCompanySelected(isAdditionalSelected);
    setFormData({ ...formData, hasAddDb: isAdditionalSelected });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userCount" && value < 0) return;
    setFormData({ ...formData, [name]: value });
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
    if (name === "phone1" || name === "phone2") {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "companyName",
      "companyNameEn",
      "companyRegNum",
      "phone1",
      "phone2",
      "email",
      "position1",
      "personnel1",
      "position2",
      "personnel2",
      "userCount",
    ];

    const newValidationErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newValidationErrors[field] = true;
      }
    });

    if (formData.hasAddDb === undefined) {
      newValidationErrors.hasAddDb = true;
    }

    if (formData.phone1.toString().length < 8) {
      newValidationErrors.phone1 = true;
    }

    if (formData.phone2.toString().length < 8) {
      newValidationErrors.phone2 = true;
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      toast.warning("*-той болон улаан хэсгүүдийг бүгдийг нь зөв бөглөнө үү", {
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Send the POST request
      const response = await fetch(
        "https://api.artlab.mn/inner/web/crm-request/contract-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Амжилттай илгээлээ.", { position: "top-center" });
        setFormData({
          companyName: "",
          companyNameEn: "",
          companyRegNum: "",
          activity: "",
          phone1: "",
          phone2: "",
          email: "",
          address: "",
          position1: "",
          personnel1: "",
          position2: "",
          personnel2: "",
          userCount: "",
          hasAddDb: undefined,
          addDbDesc: "",
          note: "",
        });
        document.getElementById("formData").reset();
      } else {
        // Handle error response
        toast.error(`Алдаа гарлаа: ${data.message}`, {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`, {
        position: "top-center",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationProps = (field) => {
    return validationErrors[field] ? { isInvalid: true } : {};
  };

  const { language } = React.useContext(LanguageContext);
  const content =
    language === "MN"
      ? formDataLanguage[0].language.mongolian
      : formDataLanguage[0].language.english;

  return (
    <div className="w-full flex flex-row bg-white pt-20 z-30">
      <form
        id="formData"
        className="w-4/5 lg:w-2/3 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="w-full bg-white rounded-lg shadow-md my-4 p-8">
          <p className="text-blue-500 font-bold text-sm lg:text-lg md:text-base">
            {content.part1.title}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-x-8 mt-6">
            <Input
              isRequired
              key="input-1"
              name="companyName"
              label={content.part1.inputLabel1}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder1}
              onChange={handleChange}
              {...getValidationProps("companyName")}
            />
            <Input
              isRequired
              key="input-2"
              name="companyNameEn"
              label={content.part1.inputLabel2}
              labelPlacement="outside"
              placeholder="Company A"
              onChange={handleChange}
              {...getValidationProps("companyNameEn")}
            />
            <Input
              isRequired
              key="input-3"
              name="companyRegNum"
              label={content.part1.inputLabel3}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder3}
              onChange={handleChange}
              {...getValidationProps("companyRegNum")}
            />
            <Input
              key="input-4"
              name="activity"
              label={content.part1.inputLabel4}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder4}
              onChange={handleChange}
            />
            <Input
              isRequired
              key="input-5"
              name="phone1"
              type="number"
              label={content.part1.inputLabel5}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder5}
              onChange={handleChange}
              {...getValidationProps("phone1")}
            />
            <Input
              isRequired
              key="input-6"
              name="phone2"
              type="number"
              label={content.part1.inputLabel6}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder6}
              onChange={handleChange}
              {...getValidationProps("phone2")}
            />
            <Input
              isRequired
              key="input-7"
              name="email"
              type="email"
              label={content.part1.inputLabel7}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder7}
              onChange={handleChange}
              {...getValidationProps("email")}
            />
            <Input
              key="input-8"
              name="address"
              label={content.part1.inputLabel8}
              labelPlacement="outside"
              placeholder={content.part1.inputPholder8}
              onChange={handleChange}
            />
          </div>
          <p className="text-blue-500 font-bold mt-8 text-sm md:text-base lg:text-lg">
            {content.part2.title}
            <span className="text-slate-500 font-normal">
              {" "}
              {content.part2.titleText}
            </span>
          </p>
          <div className="flex flex-col md:flex-row gap-4 gap-x-8 mt-6">
            <Input
              isRequired
              key="input-9"
              name="position1"
              label={content.part2.inputLabel1}
              labelPlacement="outside"
              placeholder={content.part2.inputPholder1}
              onChange={handleChange}
              {...getValidationProps("position1")}
            />
            <Input
              isRequired
              key="input-10"
              name="personnel1"
              placeholder={content.part2.inputPholder2}
              onChange={handleChange}
              className="mt-6"
              {...getValidationProps("personnel1")}
            />
          </div>
          <p className="text-blue-500 font-bold mt-8 text-sm md:text-base lg:text-lg">
            {content.part3.title}
          </p>
          <div className="flex flex-col md:flex-row gap-4 gap-x-8 mt-6">
            <Input
              isRequired
              key="input-11"
              name="position2"
              label={content.part3.inputLabel1}
              labelPlacement="outside"
              placeholder={content.part3.inputPholder1}
              onChange={handleChange}
              {...getValidationProps("position2")}
            />
            <Input
              isRequired
              key="input-12"
              name="personnel2"
              placeholder={content.part3.inputPholder2}
              onChange={handleChange}
              className="mt-6"
              {...getValidationProps("personnel2")}
            />
          </div>
          <p className="text-blue-500 font-bold mt-8 text-sm md:text-base lg:text-lg">
            {content.part4.title}
          </p>
          <div className="flex flex-col lg:flex-row gap-4 gap-x-8 mt-6">
            <Input
              className="numberOfUsers"
              isRequired
              key="input-13"
              name="userCount"
              type="number"
              inputMode="numeric"
              label={content.part4.inputLabel1}
              labelPlacement="outside"
              placeholder={content.part4.inputPholder1}
              onChange={handleChange}
              {...getValidationProps("userCount")}
            />
            <Select
              isRequired
              key="select-1"
              name="hasAddDb"
              labelPlacement="outside"
              placeholder={content.part4.inputPholder2}
              label={content.part4.inputLabel2}
              className="max-w-none"
              onChange={(e) => handleSelectChange(e.target.value)}
              {...getValidationProps("hasAddDb")}
            >
              <SelectItem className="text-green-500" key="Тийм">
                {content.part4.yes}
              </SelectItem>
              <SelectItem className="text-red-500" key="Үгүй">
                {content.part4.no}
              </SelectItem>
            </Select>
          </div>
          <div className="mt-6">
            <Textarea
              key="textarea-1"
              name="addDbDesc"
              labelPlacement="outside"
              label={content.part5.textAreaLabel1}
              placeholder="Enter your description"
              minRows="6"
              isDisabled={!isAdditionalCompanySelected}
              onChange={handleChange}
              className="max-w-none mb-3"
              {...getValidationProps("addDbDesc")}
            />
            <Textarea
              key="textarea-2"
              name="note"
              labelPlacement="outside"
              label={content.part5.textAreaLabel2}
              placeholder="Enter your description"
              minRows="6"
              onChange={handleChange}
              className="max-w-none"
              {...getValidationProps("note")}
            />
          </div>
          <div className="flex flex-row mt-6 justify-end items-end">
            <Button
              isDisabled={isLoading}
              className="bg-black text-white"
              type="submit"
            >
              {isLoading ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="loading"
                />
              ) : (
                content.part5.buttonText
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Forms;
