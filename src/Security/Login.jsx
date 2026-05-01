import { useState } from "react";
import useTheme from '../Client/Toggletheme.jsx'

import { useNavigate, Link } from "react-router-dom";
import useAuth from "../Client/Auth.jsx";

export default function Login() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { login, loading, GoogleAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function Clear() {
    setFormData({
      email: "",
      password: "",
    });
  }
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      //clear field
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation with regex
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (validateForm()) {
      try {
        await login(formData.email, formData.password);
        alert("LoggedIn successfully");
        Clear();
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  }

async function Oauth(){
    try{
  await GoogleAuth()
  }catch(error){
    alert(error.message)
  }
}

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: colors.background }}
    >
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: colors.primaryText }}
          >
            Welcome back to Cheddar Luxury
          </h2>
          <p
            className="mt-3 text-base md:text-lg"
            style={{ color: colors.secondaryText }}
          >
            Sign in to access your premium wardrobe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i
                className="fas fa-envelope text-xl"
                style={{ color: colors.secondaryText }}
              ></i>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor:
                  errors.email && submitted ? "#ef4444" : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                "--tw-ring-color": colors.accent,
              }}
            />
            {errors.email && submitted && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password with show/hide */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i
                className="fas fa-lock text-xl"
                style={{ color: colors.secondaryText }}
              ></i>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor:
                  errors.password && submitted ? "#ef4444" : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                "--tw-ring-color": colors.accent,
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-xl`}
                style={{ color: colors.secondaryText }}
              ></i>
            </button>
            {errors.password && submitted && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              to="/forgotPassword"
              className="text-sm font-medium hover:underline"
              style={{ color: colors.accent }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: colors.accent, color: "#ffffff" }}
          >
            {loading ? "Signing user..." : "SignIn"}
          </button>
        </form>

        {/* Don't have account */}
        <p
          className="text-center text-sm mt-6"
          style={{ color: colors.secondaryText }}
        >
          Don't have an account?{" "}
          <Link
            to="/Signup"
            className="font-semibold hover:underline"
            style={{ color: colors.accent }}
          >
            Create one
          </Link>
        </p>

        {/* Or divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div
              className="w-full border-t"
              style={{
                borderColor: colors.border,
              }}
            ></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className="px-4"
              style={{
                background: colors.background,
                color: colors.secondaryText,
              }}
            >
              Or
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          {/* Google Login */}
          <button
            type="button"
            onClick={Oauth}
            className="w-full flex items-center justify-center gap-3 py-4 border rounded-xl font-medium text-lg transition-all hover:bg-gray-50 active:scale-[0.98]"
            style={{
              borderColor: colors.border,
              color: colors.primaryText,
              backgroundColor: colors.container,
            }}
          >
            <i
              className="fab fa-google text-xl"
              style={{ color: "#4285F4" }}
            ></i>
            Continue with Google
          </button>

      
        </div>
      </div>
    </div>
  );
}
