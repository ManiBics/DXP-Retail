"use client";
import { useUser } from "@/context/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const Login = (props) => {
  const [credential, setCredential] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { signInHandler } = useUser();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being updated
  };

  const handleSubmit = () => {
    // Validation for required fields
    const newErrors = {};
    if (!credential.email) newErrors.email = "Email is required.";
    if (!credential.password) newErrors.password = "Password is required.";

    // If there are errors, set error state and do not submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signInHandler(credential);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl">
        <div
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(${props.image.src})`,
          }}
        >
          <div className="flex flex-col items-center justify-center bg-blue-900 bg-opacity-50 h-full w-full text-white p-8">
            <h2 className="text-4xl font-bold mb-4">{props.imageTextheader}</h2>
            <p className="text-lg">{props.imageHelpText}</p>
          </div>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            {props.title}
          </h2>
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                {props.emailtext}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={props.emailPlaceholder}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="password"
              >
                {props.passwordtext}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={props.passwordPlaceholder}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Button onClick={handleSubmit} variant="contained">
                {props.signInButton}
              </Button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-[#1976d2] hover:underline"
                href="/register"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
