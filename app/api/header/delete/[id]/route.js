import Header from "@/models/Header";
import ConnectDB from "@/mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const id = params.id;

  try {
    await ConnectDB();

    await Header.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Deleted!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
