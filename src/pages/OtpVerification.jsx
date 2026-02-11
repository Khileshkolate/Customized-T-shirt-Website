import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, RefreshCw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendTime, setResendTime] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = useRef([])
  const { verifyOtp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const phone = location.state?.phone || '9876543210'

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTime(prev => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1)
    }
    
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResendOtp = async () => {
    if (!canResend) return
    
    setResendTime(60)
    setCanResend(false)
    // In real app: await authApi.sendOtp(phone)
    toast.success('OTP resent successfully')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      toast.error('Please enter complete 6-digit OTP')
      return
    }
    
    setLoading(true)
    const result = await verifyOtp(otpString, phone)
    if (!result.success) {
      toast.error('Invalid OTP. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
            <Smartphone className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify OTP</h2>
          <p className="text-gray-600 mt-2">
            Enter the 6-digit code sent to your phone
          </p>
          <p className="text-lg font-medium text-gray-900 mt-1">
            +91 {phone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Enter OTP
              </label>
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors"
                    maxLength="1"
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <RefreshCw className="h-4 w-4" />
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-600">
                  Resend OTP in {resendTime} seconds
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default OtpVerification