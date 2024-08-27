import Header from "@/models/Header";
import ConnectDB from "@/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await ConnectDB();

    const header = await Header.find({});
    if (header) {
      return NextResponse.json(
        { data: header },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        { message: "Header data is not available" },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to get data" },
      {
        status: 500,
      }
    );
  }
};
