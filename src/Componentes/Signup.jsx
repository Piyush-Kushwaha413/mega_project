import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authsSilce";
import authService from "../appwrite/authen";
import { useForm } from "react-hook-form";
import { Logo,Input, ButtonComponent } from "../Componentes/import";

function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigat = useNavigate();
  const [error, setError] = useState("");

  const signupHandler = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        console.log(userData);
        const userdata = await authService.getCurrentUser(userData.$id);
        if (userdata) {
          dispatch(authLogin(userdata));
        
        }
        
        navigat("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signupHandler)}>
          <div>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />

            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                ValiDate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              type="password"
              label="Password: "
              placeholder="Set Your Password"
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <ButtonComponent type="submit" className="w-full">
            Create Account
          </ButtonComponent>
        </form>
      </div>
    </div>
  );
}

export default Signup;
