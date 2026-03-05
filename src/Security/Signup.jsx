import { useState } from 'react';
import colors from '../color.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Username is required';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?\d{9,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid phone number (9–15 digits)';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      console.log('Signup data:', formData);
      alert('Account created successfully! Welcome to Cheddar Luxury');
      navigate('/login')
      // → Call your backend signup API here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: colors.background }}>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: colors.primaryText }}>
            Join Cheddar Luxury
          </h2>
          <p className="mt-3 text-base md:text-lg" style={{ color: colors.secondaryText }}>
            Discover premium men's fashion crafted for distinction
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Username */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-user text-xl" style={{ color: colors.secondaryText }}></i>
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: errors.username && submitted ? '#ef4444' : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                '--tw-ring-color': colors.accent,
              }}
            />
            {errors.username && submitted && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-envelope text-xl" style={{ color: colors.secondaryText }}></i>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: errors.email && submitted ? '#ef4444' : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                '--tw-ring-color': colors.accent,
              }}
            />
            {errors.email && submitted && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-phone text-xl" style={{ color: colors.secondaryText }}></i>
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number (e.g. +2348012345678)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: errors.phone && submitted ? '#ef4444' : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                '--tw-ring-color': colors.accent,
              }}
            />
            {errors.phone && submitted && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-lock text-xl" style={{ color: colors.secondaryText }}></i>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
    className="w-full pl-12 pr-12 py-4 rounded-xl border text-base focus:outline-none focus:ring-2 transition-all flex items-center"
              style={{
                borderColor: errors.password && submitted ? '#ef4444' : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                '--tw-ring-color': colors.accent,
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`} style={{ color: colors.secondaryText }}></i>
            </button>
            {errors.password && submitted && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-lock text-xl" style={{ color: colors.secondaryText }}></i>
            </div>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
      className="w-full pl-12 pr-12 py-4 rounded-xl border text-base
      focus:outline-none focus:ring-2 transition-all flex items-center"
              style={{
                borderColor: errors.confirmPassword && submitted ? '#ef4444' : colors.border,
                backgroundColor: colors.container,
                color: colors.text,
                '--tw-ring-color': colors.accent,
              }}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} text-xl`} style={{ color: colors.secondaryText }}></i>
            </button>
            {errors.confirmPassword && submitted && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-lg shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
            style={{
            backgroundColor: colors.accent, color: '#ffffff' }}
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: colors.secondaryText }}>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold hover:underline" style={{ color: colors.accent }}>
            Login
          </Link>
        </p>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: colors.border }}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4" style={{ background: colors.background, color: colors.secondaryText }}>
              Or
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-4">
          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-4 border rounded-xl font-medium text-lg transition-all hover:bg-gray-50 active:scale-[0.98]"
            style={{
              borderColor: colors.border,
              color: colors.primaryText,
              backgroundColor: colors.container,
            }}
            onClick={() => {
              // TODO: Implement Google OAuth (e.g., using Firebase, Google Identity Services, or your backend)
              console.log('Google signup clicked');
              alert('Google Sign-up triggered (demo)');
            }}
          >
            <i className="fab fa-google text-xl" style={{ color: '#4285F4' }}></i>
            Sign up with Google
          </button>

          {/* Apple Sign Up (iOS) */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-4 border rounded-xl font-medium text-lg transition-all hover:bg-gray-50 active:scale-[0.98]"
            style={{
              borderColor: colors.border,
              color: '#ffffff',
              backgroundColor: '#000000', // Apple's black
            }}
            onClick={() => {
              // TODO: Implement Sign in with Apple (requires Apple Developer account + backend verification)
              console.log('Apple signup clicked');
              alert('Sign in with Apple triggered (demo)');
            }}
          >
            <i className="fab fa-apple text-xl"></i>
            Sign up with Apple
          </button>
        </div>
      </div>
    </div>
  );
}