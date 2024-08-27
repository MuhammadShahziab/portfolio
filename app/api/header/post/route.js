import Header from "@/models/Header";
import ConnectDB from "@/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await ConnectDB();
    const body = await req.json();

    const {
      name,
      animatedText,
      description,
      subHeading,
      github,
      linkedIn,
      instagram,
      facebook,
      image,
      cv,
    } = body.formData;

    if (!name || !animatedText || !description || !subHeading) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all the required fields",
        },
        { status: 400 }
      );
    }

    const newHeader = await Header.create({
      name,
      animatedText,
      description,
      subHeading,
      github,
      linkedIn,
      instagram,
      facebook,
      image,
      cv,
    });

    await newHeader.save();
    return NextResponse.json(
      { data: newHeader, success: true, message: "Saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
