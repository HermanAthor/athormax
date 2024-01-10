"use client";

import Link from "next/link";
import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/libs/firebase-config";
import { useRouter } from "next/navigation";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [wildError, setWildError] = useState("");
  const router = useRouter();
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      router.push("/");
    } catch (error) {
      console.log("Register Error", error.message);
      if (error.message === "Firebase: Error (auth/missing-email).") {
        setRegisterError("Email is missing");
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setRegisterError("Email is already in use, Try to login instead");
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        setRegisterError("Email is invalid, please check your email");
      } else if (error.message === "Firebase: Error (auth/missing-password).") {
        setPasswordError("Password is missing");
      } else {
        setWildError(
          "Something happen while creating your Account, Please check your credentials"
        );
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const user = signInWithPopup(auth, provider);
      router.push("/");
      return user;
    } catch (error) {
      console.log("Sign in with Google error", error.message);
    }
  };
  const signInWithApple = async () => {
    alert(
      "Apple is a bit strict with the signIn options right now, so please try google or other providers"
    );
  };
  return (
    <div>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create an account with
      </h1>
      <div className="grid grid-cols-2 gap-5 py-5">
        <button
          onClick={signInWithGoogle}
          className="flex flex-row justify-center items-center border border-gray-300 text-gray-300 rounded-xl p-3"
        >
          <img className="w-8 h-8 mr-2" src="/google.svg" alt="logo" />
          <p className="hidden md:inline">Google</p>
        </button>
        <button
          onClick={signInWithApple}
          className="flex flex-row justify-center items-center border border-gray-300 text-gray-300 rounded-xl"
        >
          <img className="w-10 h-10 mr-2" src="/apple.svg" alt="logo" />
          <p className="hidden md:inline">Apple</p>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center">
        <span className="h-[2px] w-full bg-slate-600 rounded-full"></span>
        <span className="px-4">Or</span>
        <span className="h-[2px] w-full bg-slate-600 rounded-full"></span>
      </div>
      <form className="space-y-4 md:space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
          />
          <p className={`text-red-400`}>{registerError}</p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Herman Athor"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          <p className="text-red-400">{passwordError}</p>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the{" "}
              <a
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                href="#"
              >
                Terms and Conditions
              </a>
            </label>
          </div>
        </div>
        <button
          onClick={registerUser}
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create an account
        </button>
        <p className="text-red-400">{wildError}</p>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/register/signin"
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Login here
          </Link>
        </p>
      </form>{" "}
    </div>
  );
}

export default SignUp;
