"use client";
import React, { useState } from "react";
const AdminHomePage = () => {
  const [projects, setProjects] = useState([]);

  //   const { data: session } = useSession();
  //   console.log(session, "check session");
  //   const extractAllData = async () => {
  //     try {
  //       const data = await getData("projects");
  //       console.log(data, "check data");
  //       if (data) {
  //         setProjects(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     extractAllData();
  //   }, []);

  return (
    <div className="padding w-full max-md:mt-16  mt-16">
      <h1 className="text-4xl md:text-center text-black font-bold">
        Wellcome to your <span className="text-orange"> Dashboard </span>
      </h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mt-11">
        <div className="py-8 rounded-md shadow text-center text-white bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
          <h2 className="text-xl">Total Projects</h2>
          <h1 className="text-2xl font-semibold mt-2">12</h1>
        </div>
        <div className="py-8 rounded-md shadow text-center text-white bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300">
          <h2 className="text-xl">On Working Projects</h2>
          <h1 className="text-2xl font-semibold mt-2">4</h1>
        </div>
        <div className="py-8 rounded-md shadow text-center text-white bg-gradient-to-r from-red-500 via-red-400 to-red-300">
          <h2 className="text-xl">Pending Projects</h2>
          <h1 className="text-2xl font-semibold mt-2">2</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
