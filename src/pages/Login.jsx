import { useState } from "react";
import { IoChevronBackOutline, IoEllipse } from "react-icons/io5";
import { Link } from "react-router-dom";
import Copyright from "../components/Copyright";
import { Input, PasswordInput } from "../components/Input";

export default function Login() {
  const [ShowPassword, setShowPassword] = useState(false);

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <main className="min-h-screen flex flex-col p-2 justify-between">
      <header className="flex items-center p-2">
        <Link to={"/"} className="flex flex-row items-center">
          <IoChevronBackOutline className="text-zinc-600 w-7 h-7" />
          <span className="text-zinc-600 text-xl">Go Back</span>
        </Link>
      </header>

      <form className="max-w-96 h-auto border-2 border-zinc-300 dark:border-zinc-700 rounded-md p-4 flex flex-col self-center text-pretty">
        <h2 className="text-3xl font-medium mb-2">Login</h2>
        <p className="text-zinc-600 mb-4">
          Enter your username and password to login to your account.
        </p>
        {/* Divider */}
        <div className="flex flex-row items-center gap-2 mb-4">
          <div className="w-full h-[1px] bg-zinc-600 rounded-md"></div>
          <IoEllipse className="text-zinc-600" />
          <div className="w-full h-[1px] bg-zinc-600 rounded-md"></div>
        </div>
        {/* Email */}
        <label className="flex flex-col gap-2 text-2xl mb-7">
          Email Address
          <Input
            type={"email"}
            name={"email"}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* Password */}
        <label className="flex flex-col gap-2 text-2xl mb-7">
          Password
          <PasswordInput
            type={ShowPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            ShowPassword={ShowPassword}
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!ShowPassword);
            }}
          />
        </label>
        {/* Submit */}
        <input
          type="submit"
          value="Login"
          className="my-5 cursor-pointer w-full bg-gradient-to-r from-emerald-300 to-emerald-600 p-2 rounded-md text-2xl text-black font-semibold hover:scale-105 transition-all"
        />
      </form>

      <p className="self-center text-xl">
        Don't have an account?{" "}
        <Link
          to={"/register"}
          className="text-emerald-400 font-semibold cursor-pointer hover:border-b hover:border-b-emerald-400"
        >
          Create Account
        </Link>
      </p>
      <Copyright />
    </main>
  );
}
