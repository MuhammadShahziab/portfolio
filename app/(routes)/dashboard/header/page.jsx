"use client";
import { addData, getData, updateData } from "@/app/actions";
import FormControls from "@/app/components/dashboard/FormControls";
import Loading from "@/app/components/dashboard/Loading";
import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

const HeaderFormData = {
  name: "",
  animatedText: "",
  description: "",
  subHeading: "",
  github: "",
  linkedIn: "",
  instagram: "",
  facebook: "",
  image: "",
  cv: "",
};

const controls = [
  {
    lable: "Name",
    type: "text",
    placeholder: "Insert your Name",
    name: "name",
  },
  {
    lable: "sub Heading",
    type: "text",
    placeholder: "Insert your sub Heading",
    name: "subHeading",
  },
  {
    lable: "Animated Text",
    type: "text",
    placeholder: "eg: react, next, etc ",
    name: "animatedText",
  },
  {
    lable: "Description",
    type: "text",
    placeholder: "Insert your Description",
    name: "description",
  },

  {
    lable: "Github",
    type: "text",
    placeholder: "Insert your Github URL",
    name: "github",
  },
  {
    lable: "LinkedIn",
    type: "text",
    placeholder: "Insert your linkedIn URL",
    name: "linkedIn",
  },
  {
    lable: "Instagram",
    type: "text",
    placeholder: "Insert your instagram URL",
    name: "instagram",
  },
  {
    lable: "Facebook",
    type: "text",
    placeholder: "Insert your Facebook URL",
    name: "facebook",
  },

  {
    lable: "Image",
    type: "file",
    placeholder: "Insert your Image",
    name: "image",
  },
  {
    lable: "CV",
    type: "file",
    placeholder: "Insert your Cv",
    name: "cv",
  },
];

const Headerpage = () => {
  const [headerViewFormData, setHeaderViewFormData] = useState(HeaderFormData);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [pageloading, setPageLoading] = useState(false);

  const extractData = async () => {
    try {
      setPageLoading(true);
      const data = await getData("header");
      if (data && data.length) {
        setHeaderViewFormData(data && data[0]);
        setUpdate(true);
      }
      console.log(data, "check header get header page data ");

      setPageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveData = async () => {
    try {
      setLoading(true);
      const response = update
        ? await updateData("header", headerViewFormData)
        : await addData("header", headerViewFormData);
      setLoading(false);

      console.log(response, "chekc  page reqs ");

      if (response?.success) {
        setHeaderViewFormData(response?.data);
        setUpdate(true);
      }
      extractData();
    } catch (error) {
      console.log(response);
    }
  };

  useEffect(() => {
    extractData();
  }, []);

  return (
    <div className="padding max-md:mt-9  w-full ">
      {pageloading ? (
        <Loading></Loading>
      ) : (
        <>
          <FormControls
            controls={controls}
            setFormData={setHeaderViewFormData}
            formDataa={headerViewFormData}
          />

          <div className="flex justify-center lg:mt-9 mt-6 items-center ">
            <Button
              onClick={saveData}
              size="lg"
              className="text-lg flex items-center gap-x-2"
            >
              {update ? "Save Changes" : "Save"}{" "}
              {loading && <HashLoader color="#ffffff" size={20} />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Headerpage;
