"use client";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setloading(true);
      const res = await fetch("/api/auth/register/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data?.email, password: data?.password }),
      });

      if (res?.ok) {
        toast({
          description: "User create successfully!",
        });
      } else {
        const errorData = await res.text();
        toast({
          description: errorData,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="grid md:grid-cols-3 min-h-screen overflow-hidden">
      <div className="max-md:hidden md:col-span-2">
        <div className="padding-l padding-r h-full bg-gray-50  hidden md:flex justify-center items-center">
          <img
            src="/assets/login/login1.png"
            alt="login"
            className="object-contain w-[550px] h-[500px] 2xl:h-[650px] 2xl:w-[580px]"
          />
        </div>
      </div>
      <div className="grid col-span-3 md:col-span-1 lg:bg-orange rounded-tl-xl rounded-bl-xl h-full relative">
        <div className="flex flex-col md:justify-center items-center relative">
          <div className="w-full h-screen md:w-[400px] md:h-[65%] bg-white flex flex-col max-md:pt-28 px-6 py-5 pb-10 md:absolute right-[35%] 2xl:right-[50%] rounded-2xl shadow-xl">
            <h1 className="text-3xl mb-0 leading-7 max-md:flex-col text-center mt-0 md:mt-4 lg:mt-0 font-semibold text-orange">
              Register <br />
            </h1>
            <p className="text-sm text-center mt-3 text-softtext">
              (Only Admin can Register a new user)
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full mt-8 md:mt-12 flex flex-col gap-4 items-center"
            >
              <div className="relative w-full">
                <label className="inputLabel">Email</label>
                <input
                  type="email"
                  className=""
                  name="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Msworld@gmail.com"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="relative w-full">
                <label className="inputLabel">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password must be required",
                  })}
                  name="password"
                  placeholder="password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 md:top-5 top-3 cursor-pointer text-sm text-softtext"
                >
                  {showPassword ? <Eye size={17} /> : <EyeOff size={17} />}
                </span>
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <button
                type="submit"
                className="flex items-center gap-x-5 px-11 py-2 w-full mt-3 rounded-full shadow-lg text-white font-semibold justify-center bg-green-400"
              >
                Register {loading && <HashLoader color="#ffffff" size={23} />}
              </button>
            </form>

            <div className="flex gap-x-3 max-md:mt-6 lg:mt-4 justify-center  items-center">
              <button className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center bg-red-400 text-white">
                <FaGoogle />
              </button>
              <button className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center text-2xl bg-black/40 text-white">
                <FaGithub />
              </button>
              <button className="w-11 h-11 shadow-lg cursor-pointer rounded-full flex justify-center items-center text-2xl bg-sky-500 text-white">
                <FaFacebook />
              </button>
            </div>
            <p className="absolute bottom-20 text-center w-[85%] text-sm text-softtext md:hidden">
              Developed by Shahzaib
            </p>
            {/* <Toaster /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
