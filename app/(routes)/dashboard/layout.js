import Navbar from "@/app/components/dashboard/Navbar";

const layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex max-container  min-h-screen   md:padding-l ">
          {children}{" "}
        </div>
      </div>
    </>
  );
};

export default layout;
