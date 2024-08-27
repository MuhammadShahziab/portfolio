import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { compare } from "bcryptjs";
import ConnectDB from "@/mongodb";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          if (!credentials.email || !credentials.password) {
            throw new Error("Invalid Email and Password");
          }

          await ConnectDB();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("Email is not exist");
          }

          const isMatchPassword = await compare(
            credentials?.password,
            user?.password
          );

          if (!isMatchPassword) {
            throw new Error("Password does not match");
          }

          return user;
        } catch (error) {
          console.log("Error during authorization", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const mongoUser = await User.findOne({ email: session?.user.email });

      session.user = {
        email: mongoUser?.email,
        profileImage: mongoUser?.Image,
      };

      return session;
    },
  },
});

export { handler as GET, handler as POST };
