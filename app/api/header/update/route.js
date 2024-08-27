import Header from "@/models/Header";
import ConnectDB from "@/mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req, res) => {
  try {
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
      _id,
    } = body.formData;

    await ConnectDB();

    const updateData = await Header.findByIdAndUpdate(
      { _id: _id },
      {
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
      },
      {
        new: true,
      }
    );
    await updateData.save();
    return NextResponse.json(
      { data: updateData, message: "Your Data is  Updated", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Update", success: false },
      { status: 500 }
    );
  }
};
