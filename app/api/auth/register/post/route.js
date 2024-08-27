import User from "@/models/User";
import ConnectDB from "@/mongodb";
import bcrypt from "bcryptjs";
export const POST = async (req) => {
  try {
    await ConnectDB();
    const body = await req.json();
    const { email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("Sorry Email is already Exist !", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    await user.save();

    return new Response(JSON.stringify({ user }, { status: 200 }));
  } catch (err) {
    console.error(err);
    return new Response("Failed to create a new user", { status: 200 });
  }
};
