// export default Auth;
import React, { useState } from "react";
import { registerStoreUser, loginStoreUser } from "../Api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [showSignupForm, setShowSignupForm] = useState(true); // default: signup
  const navigate = useNavigate();

  // Signup state
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  // Login state
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Signup input change
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  // Login input change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // Signup submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStoreUser(signupData);
      setSignupData({ name: "", email: "", username: "", password: "" });
      toast.success("User registered successfully");
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      const cleanMessage = extractPlainError(error?.message);
      toast.error(cleanMessage || "Signup failed");
    }
  };

  // Login submit
  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await loginStoreUser(loginData);
  //     toast.success(`Welcome ${user.name}`);
  //     setLoginData({ username: "", password: "" });
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     const cleanMessage = extractPlainError(error?.message);
  //     toast.error(cleanMessage || "Login failed");
  //   }
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginStoreUser(loginData);

      // Log the JWT token to console
      console.log("JWT Token:", user.token);

      // Optionally store in localStorage

      localStorage.setItem("token", user.token);

      toast.success(
        `Welcome ${user.user_display_name || user.username || "User"}`
      );
      navigate("/checkout");
      setLoginData({ username: "", password: "" });
    } catch (error) {
      console.error("Login error:", error);
      const cleanMessage = extractPlainError(error?.message);
      toast.error(cleanMessage || "Login failed");
    }
  };

  // Helper to strip HTML tags from error message
  const extractPlainError = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html || "";
    return div.textContent || div.innerText;
  };

  return (
    <div className="pt-30 h-[calc(100vh-150px)] flex justify-center items-center">
      <div className="p-8  max-w-md mx-auto bg-white rounded shadow">
        {showSignupForm ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={signupData.name}
                onChange={handleSignupChange}
                className="w-full border p-2 mb-3"
                required
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={signupData.username}
                onChange={handleSignupChange}
                className="w-full border p-2 mb-3"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                className="w-full border p-2 mb-3"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                className="w-full border p-2 mb-3"
                required
              />
              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 transition-colors ease-in cursor-pointer"
              >
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setShowSignupForm(false)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Login here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={loginData.username}
                onChange={handleLoginChange}
                className="w-full border p-2 mb-3"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                className="w-full border p-2 mb-3"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors ease-in cursor-pointer"
              >
                Login
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <button
                onClick={() => setShowSignupForm(true)}
                className="text-green-600 hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
