"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Register = () => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [timerKey, setTimerKey] = useState(0);
  const [registerData, setRegisterData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    inputError: "",
    passwordError: "",
  });
  const [inputData, setInputData] = useState({
    input: "",
    password: "",
    password2: "",
    verifyCode: "",
  });

  const checkVerifCode = async () => {
    const updatedRegisterData = {
      ...registerData,
      password: inputData.password,
      verifyCode: inputData.verifyCode,
    };
    // await setRegisterData((prev) => ({
    //   ...prev,
    //   password: inputData.password,
    //   verifyCode: inputData.verifyCode,
    // }));
    console.log(updatedRegisterData);
    try {
      const response = await fetch(
        "https://api.artlab.mn/inner/web/social/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRegisterData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Something is wrong.");
        return;
      }
      if (!data.success) {
        if (data.msgList[0].code === "Код таарсангүй.") {
          toast.warning("Код буруу байна.", { position: "top-center" });
        } else if (data.msgList[0].code === "Кодны хугацаа дууссан байна.") {
          toast.warning("Кодны хугацаа дууссан байна. Код дахин илгээлээ.", {
            position: "top-center",
          });
          if (registerData.phone) {
            verifyEmail({ phone: registerData.phone });
            return;
          }
          if (registerData.email) {
            verifyEmail({ email: registerData.email });
            return;
          }
        }
        return;
      }

      toast.success("Амжилттай бүртгэгдлээ.", { position: "top-center" });
      onOpenChange(false);
      router.push("/login");
    } catch (error) {
      console.log("There is an another error: ", error.message);
    }
  };

  const verifyEmail = async (payload) => {
    try {
      console.log("Payload is: ", payload);
      const response = await fetch(
        "https://api.artlab.mn/inner/web/social/user/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Код амжилттай илгээлээ.", { position: "top-center" });
        onOpen();
        setTimerKey((prev) => prev + 1);
      } else if (data.msgList[0].code === "User exist") {
        toast.warning("Тухайн имэйл дээр хэрэглэгч бүртгэлтэй байна.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("There is an error: ", error.message);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (number) => {
    if (/^\d+$/.test(number) && number.length === 8) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload;
    if (validateEmail(inputData.input)) {
      payload = {
        email: inputData.input,
      };
      setRegisterData((prev) => ({ email: inputData.input }));
      setValidationErrors((prev) => ({
        ...prev,
        inputError: "",
      }));
    }
    if (validatePhone(inputData.input)) {
      payload = {
        phone: inputData.input,
      };
      setRegisterData((prev) => ({ phone: inputData.input }));
      setValidationErrors((prev) => ({
        ...prev,
        inputError: "",
      }));
    }
    if (inputData.password !== inputData.password2) {
      setValidationErrors((prev) => ({
        ...prev,
        passwordError: "Passwords does not match",
      }));
      return;
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        passwordError: "",
      }));
    }
    if (!validateEmail(inputData.input) && !validatePhone(inputData.input)) {
      setValidationErrors((prev) => ({
        ...prev,
        inputError: "Please enter your email or phone number",
      }));
      return;
    }
    console.log(payload);
    // console.log(registerData);
    verifyEmail(payload);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="w-full h-screen dark:bg-white flex justify-center items-center">
      <div className="w-1/3">
        {session && <h1>{session.user?.fb_asid}</h1>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 text-black"
        >
          <h1 className="m-auto font-semibold text-2xl text-white dark:text-black">
            Register
          </h1>
          <input
            type="text"
            name="input"
            placeholder="email/phone"
            required
            className="rounded-xl p-3 bg-white border"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            className="rounded-xl p-3 bg-white border"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password2"
            placeholder="confirm password"
            required
            className="rounded-xl p-3 bg-white border"
            onChange={handleChange}
          />
          <div className="flex justify-between gap-4">
            <button
              onClick={() => signIn("facebook", { callbackUrl: "/" })}
              className="w-1/2 border rounded-xl p-3 text-white dark:text-blue-600"
            >
              <FaFacebook className="m-auto" size={30} />
            </button>
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-1/2 border rounded-xl p-3"
            >
              <FcGoogle className="m-auto" size={30} />
            </button>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white rounded-md p-3"
          >
            Sign out
          </button>
          <button
            type="submit"
            className="bg-sky-500 text-white rounded-md p-3"
          >
            Register
          </button>
          <button
            className="bg-sky-500 text-white rounded-md p-3"
            onClick={onOpen}
          >
            Test
          </button>
          {validationErrors.inputError && (
            <p className="text-red-500 text-center">
              {validationErrors.inputError}
            </p>
          )}
          {validationErrors.passwordError && (
            <p className="text-red-500 text-center">
              {validationErrors.passwordError}
            </p>
          )}
          {/* <Button onPress={onOpen}>Open Modal</Button> */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-black">
                    Verification code
                  </ModalHeader>
                  <ModalBody className="text-black">
                    <input
                      type="text"
                      name="verifyCode"
                      placeholder="verification code"
                      className="border p-3 rounded-xl"
                      onChange={handleChange}
                    />
                    <div className="text-[10px]">
                      <CountdownCircleTimer
                        key={timerKey}
                        isPlaying
                        duration={60}
                        colors={"#3b7ddd"}
                        size={30}
                        strokeWidth={5}
                      >
                        {({ remainingTime }) => remainingTime}
                      </CountdownCircleTimer>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="default"
                      variant="light"
                      onPress={() =>
                        registerData.phone
                          ? verifyEmail({ phone: registerData.phone })
                          : verifyEmail({ email: registerData.email })
                      }
                    >
                      Дахин код авах
                    </Button>
                    <Button color="primary" onClick={() => checkVerifCode()}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default Register;
