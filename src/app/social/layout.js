import SideBar from "@/components/socialUser/sideBar";
import { SidebarProvider } from "@/context/SidebarContext";

const SocialLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <main className="h-full min-h-screen w-full flex gap-5 bg-black dark:bg-neutral-100 text-white dark:text-black">
        <SideBar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SocialLayout;
