import { useUser } from "@/context/UserContext";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const Register = (props) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { registerHandler } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error for the field being updated
  };

  const handleSubmit = () => {
    // Validate fields
    const newErrors = {};
    if (!userInfo.firstname) newErrors.firstname = "First name is required.";
    if (!userInfo.lastname) newErrors.lastname = "Last name is required.";
    if (!userInfo.email) newErrors.email = "Email is required.";
    if (!userInfo.password) newErrors.password = "Password is required.";
    if (!userInfo.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password.";
    if (userInfo.password !== userInfo.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    // If there are errors, update the error state and do not submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerHandler(userInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-5xl">
        <div
          className="hidden lg:flex lg:w-2/5 bg-cover bg-center"
          style={{
            backgroundImage: `url(${props.registerImage.src})`,
          }}
        >
          <div className="flex flex-col items-center justify-center bg-blue-900 bg-opacity-60 h-full w-full text-white p-8">
            <h2 className="text-4xl font-bold mb-4">
              {props.imageholderheaderText}
            </h2>
            <p className="text-lg">{props.imageholderheaderdescription}</p>
          </div>
        </div>
        <div className="w-full p-8 lg:w-3/5">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
            {props.title}
          </h2>
          <form>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="firstname"
              >
                {props.firstNameText}
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={props.firstnamePlaceholder}
                onChange={handleChange}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs italic">
                  {errors.firstname}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="lastname"
              >
                {props.lastNameText}
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder={props.lastnamePlaceholder}
                onChange={handleChange}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs italic">{errors.lastname}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                {props.emailText}
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
            <div className="flex">
              <div className="mb-6 w-full">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="password"
                >
                  {props.passwordText}
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
                  <p className="text-red-500 text-xs italic">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="mb-6 w-full ml-6">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="confirmPassword"
                >
                  {props.confirmPasswordText}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  placeholder={props.confirmPasswordPlaceholder}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs italic">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button onClick={handleSubmit} variant="contained">
                {props.buttonText}
              </Button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-[#1976d2] hover:underline"
                href="/login"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
