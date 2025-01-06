import SideBar from "@/components/socialUser/sideBar";
import { SidebarProvider } from "@/context/SidebarContext";

const SocialInvoiceContent = () => {
  return (
    <main className="h-screen w-full flex gap-5">
      <SideBar />
      <div className="">Invoice</div>
    </main>
  );
};

const SocialInvoice = () => {
  return (
    <SidebarProvider>
      <SocialInvoiceContent />
    </SidebarProvider>
  );
};

export default SocialInvoice;
