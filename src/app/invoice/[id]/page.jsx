"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Invoice = ({ params }) => {
  const { id } = params;

  const [invoiceData, setInvoiceData] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [payment, setPayment] = useState(false);
  const [QRImage, setQRImage] = useState(null);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (id) {
      const searchInvoice = async () => {
        try {
          const query = new URLSearchParams({ id }).toString();
          const response = await fetch(
            `/api/invoice/getInvoiceById/?${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "js-response-modify": 1,
              },
            }
          );

          const data = await response.json();

          if (!data.success || !response.ok) {
            setInvoiceData(null);
            console.log("Not found");
          }

          setPayment(data.value.status == "open" ? false : true);
          setInvoiceData(data.value);
        } catch (error) {
          console.log("There is an error", error);
        }
      };
      searchInvoice();
      toast.success("Сайн байна уу, Таны нэхэмжлэх", {
        position: "top-center",
      });
    }
  }, [id]);

  const createQPayInvoice = async () => {
    if (!invoiceId) {
      const query = new URLSearchParams({ id }).toString();
      const response = await fetch(`/api/invoice/createInvoiceQR/?${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "js-response-modify": 1,
        },
      });

      const data = await response.json();
      setQRImage(data.value.qr_image);
      setInvoiceId(data.value.invoice_id);

      intervalRef.current = setInterval(async () => {
        const paymentStatus = await checkInvoicePayment(data.value.invoice_id);
        if (paymentStatus) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log("Guilgaj bj tolloshd!");
        }
        console.log("Mongoo toldgueee");
      }, 2000);
    }
  };

  const cancelInvoiceQR = async () => {
    const query = new URLSearchParams({ id }).toString();
    const response = await fetch(`/api/invoice/cancelInvoiceQR/?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "js-response-modify": 1,
      },
      body: JSON.stringify({ invoiceId }),
    });

    const data = await response.json();
    if (response.ok || data.success) {
      setQRImage(null);
      setInvoiceId(null);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      toast.warning("QPay цуцлагдлаа", {
        position: "top-center",
      });
    }
  };

  const checkInvoicePayment = async (invoiceId) => {
    const query = new URLSearchParams({ id }).toString();
    console.log(invoiceId);
    const payload = {
      objectType: "INVOICE",
      invoiceId: invoiceId,
    };
    const response = await fetch(`/api/invoice/checkInvoiceQR/?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "js-response-modify": 1,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.value.count === 1) {
      console.log("You are one rich bastard!");
      setPayment(true);
      setInvoiceId(null);
      setQRImage(null);
      toast.success("Амжилттай төлөгдлөө", {
        position: "top-center",
      });
      onOpenChange(false);
      return true;
    }
    return false;
  };

  return (
    <main className="bg-white py-20 text-xs text-black font-medium min-h-screen">
      <div className="flex justify-center">
        {invoiceData ? (
          <div className="w-11/12 lg:w-3/5 flex flex-col gap-3 border rounded-lg py-7 px-5">
            <section className="flex justify-between font-semibold">
              <div className="px-1 ml-2">
                <h1 className="text-2xl mb-3 sm:mb-1">Нэхэмжлэх</h1>
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-10">
                  <p className="text-black/50">
                    Дугаар:{" "}
                    <span className="ml-3 text-black">{invoiceData.id}</span>
                  </p>
                  <p className="text-black/50">
                    Огноо:{" "}
                    <span className="ml-3 text-black">
                      {invoiceData.invoiceDate}
                    </span>
                  </p>
                </div>
              </div>
              <Image
                src="/img/logo/artlabLogoBlue.png"
                alt="Logo"
                height={50}
                width={160}
                className="hidden sm:block"
              />
            </section>

            <section className="border rounded-lg divide-y-1 font-semibold">
              <div className="flex flex-col sm:flex-row justify-between divide-y-1 sm:divide-x-1">
                <div className="w-full flex flex-col gap-3 p-7">
                  <h2 className="font-semibold text-sm">Нэхэмжлэгч</h2>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>{invoiceData.sender.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Утас :</span>
                    <span>{invoiceData.sender.phone}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Имэйл :</span>
                    <span>{invoiceData.sender.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Хаяг :</span>
                    <span className="w-2/3">{invoiceData.sender.address}</span>
                  </p>
                </div>
                <div className="w-full flex flex-col gap-3 p-7">
                  <h2 className="font-semibold text-sm">Харилцагч</h2>
                  <p className="flex justify-between">
                    <span className="text-black/50">Код :</span>
                    <span>{invoiceData.customer.code}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>{invoiceData.customer.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Имэйл :</span>
                    <span>{invoiceData.customer.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Утас :</span>
                    <span>{invoiceData.customer.phone}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Рег. дуг :</span>
                    <span>{invoiceData.customer.regNum}</span>
                  </p>
                </div>
              </div>
              <div className="p-7">
                <h2 className="mb-3 text-sm">Тайлбар</h2>
                <p className="text-black/50">
                  Гүйлгээний утга дээр нэхэмжлэхийн дугаараа ({invoiceData.id})
                  бичнэ үү
                </p>
              </div>
            </section>

            <section>
              <Table aria-label="Example table with dynamic content">
                <TableHeader>
                  <TableColumn>Бараа, Ажил, Үйлчилгээ</TableColumn>
                  <TableColumn>Тоо</TableColumn>
                  <TableColumn>Нэгж үнэ</TableColumn>
                  <TableColumn>Нийт</TableColumn>
                </TableHeader>
                <TableBody>
                  {invoiceData.dtls.map((el, index) => (
                    <TableRow key={el.code}>
                      <TableCell>
                        {el.product.code} - {el.product.name}
                      </TableCell>
                      <TableCell>{el.qty}</TableCell>
                      <TableCell>
                        {el.unitPrice.toLocaleString()} &#8366;
                      </TableCell>
                      <TableCell>
                        {el.totalPrice.toLocaleString()} &#8366;
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            <section>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-3/5 order-last sm:order-first h-fit flex flex-col gap-3 p-6 border rounded-lg">
                  <h2 className="font-semibold text-sm mb-1">
                    Төлбөрийн арга - Шилжүүлэг{" "}
                  </h2>
                  {payment ? (
                    <p className="bg-green-200 rounded-lg text-green-600 text-center p-3 w-full">
                      Төлөгдсөн
                    </p>
                  ) : (
                    <Button
                      onPress={onOpen}
                      onClick={() => createQPayInvoice()}
                    >
                      <Image
                        src="/img/others/qpaylogo.png"
                        alt="qpaylogo"
                        height={30}
                        width={30}
                        className="rounded-lg"
                      />
                      QPay
                    </Button>
                  )}
                  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    scrollBehavior="inside"
                  >
                    <ModalContent>
                      {(onClose) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            Modal Title
                          </ModalHeader>
                          <ModalBody>
                            {QRImage && (
                              <Image
                                src={`data:image/png;base64,${QRImage}`}
                                alt="qrPayment"
                                height={300}
                                width={300}
                                className="m-auto"
                              />
                            )}
                          </ModalBody>
                          <ModalFooter className="flex">
                            <Button
                              color="default"
                              variant="light"
                              // onPress={onClose}
                              onClick={() => cancelInvoiceQR()}
                              className="w-full"
                            >
                              Цуцлах
                            </Button>
                            <Button
                              color="primary"
                              // onPress={onClose}
                              onClick={() => checkInvoicePayment()}
                              className="w-full"
                            >
                              Шалгах
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                </div>
                <div className="w-full sm:w-2/5 flex flex-col gap-3 p-6 border rounded-lg">
                  <h2 className="font-semibold text-sm mb-1">Үнийн мэдээлэл</h2>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>Артлаб ХХК</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>Артлаб ХХК</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>Артлаб ХХК</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-black/50">Нэр :</span>
                    <span>Артлаб ХХК</span>
                  </p>
                  <p className="flex justify-between border-t pt-3">
                    <span className="text-black/50">Нийт үнэ</span>
                    <span className="font-semibold text-sm">
                      {invoiceData.totalPrice.toLocaleString()} &#8366;
                    </span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <p className="text-3xl font-semibold">Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Invoice;
