import LoginIn from "@/components/register/LogIn";
import SignIn from "@/components/register/SignIn";
import React from "react";

function SigninPage() {
  return (
    <section
      style={{ backgroundImage: 'url("/login.png")', height: "100%" }}
      className="bg-gray-50 dark:bg-gray-900 bg-cover bg-no-repeat"
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-40 h-10 mr-2" src="/hagmax.png" alt="logo" />
        </a>
        <div className="w-full  rounded-lg shadow bg-white dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <SignIn />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SigninPage;
