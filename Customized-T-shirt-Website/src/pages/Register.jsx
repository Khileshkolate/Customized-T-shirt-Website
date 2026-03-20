import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Lock, Smartphone, MapPin, Eye, EyeOff,
  CheckCircle, ArrowRight, Shield, Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    pincode: '',
    city: '',
    state: ''
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(180);
  const [resendEnabled, setResendEnabled] = useState(false);
  const otpInputRefs = useRef([]);
  const { register, verifyOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' || name === 'pincode' 
        ? value.replace(/\D/g, '').slice(0, name === 'phone' ? 10 : 6)
        : value
    }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
  // Validate all fields
  if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
    toast.error('Please fill all required fields');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (formData.phone.length !== 10) {
    toast.error('Please enter a valid 10-digit phone number');
    return;
  }

  if (formData.password.length < 8) {
    toast.error('Password must be at least 8 characters long');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    toast.error('Please enter a valid email address');
    return;
  }

  setLoading(true);
  try {
    console.log('Sending registration data:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password // Note: In production, this shouldn't be logged
    });

    const result = await register(formData);
    
    console.log('Registration result:', result);
    
    if (result.success) {
      toast.success(`OTP sent to +91 ${formData.phone}`);
      setOtpSent(true);
      setTimer(180);
      setResendEnabled(false);
      setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
    } else {
      toast.error(result.message || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Registration error:', error);
    toast.error(error.response?.data?.message || error.message || 'Failed to send OTP. Please try again.');
  }
  setLoading(false);
};

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '');
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerifyOtp(newOtp.join(''));
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (enteredOtp = otp.join('')) => {
    if (enteredOtp.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }
    
    setLoading(true);
    const result = await verifyOtp(enteredOtp, formData.phone);
    if (result.success) {
      toast.success('Registration successful! 🎉');
      navigate('/');
    } else {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-600 font-bold text-xl">
            PrintCraft
          </Link>
          <h1 className="text-3xl font-bold mt-4">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our creative community</p>
        </div>

        <AnimatePresence mode="wait">
          {!otpSent ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="9876543210"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Create Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="••••••••"
                      minLength="8"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="••••••••"
                      minLength="8"
                      required
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Send OTP & Register'}
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 font-semibold">
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold">Verify Your Phone</h2>
                <p className="text-gray-600 mt-2">
                  Enter the 6-digit OTP sent to <br />
                  <span className="font-semibold">+91 {formData.phone}</span>
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpInputRefs.current[index] = el}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                      maxLength="1"
                      inputMode="numeric"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>Expires in: {formatTime(timer)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={!resendEnabled}
                    className={`${resendEnabled ? 'text-primary-600 hover:text-primary-700' : 'text-gray-400'}`}
                  >
                    {resendEnabled ? 'Resend OTP' : `Resend in ${formatTime(timer)}`}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  disabled={loading || otp.some(d => !d)}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
                >
                  ← Back to Registration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;