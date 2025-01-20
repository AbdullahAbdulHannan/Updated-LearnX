import React, { useRef, useEffect, useState } from "react";
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/user-context";
import { FaBookOpen } from 'react-icons/fa';

const VerifyAccount = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { btnLoading, verifyOtp, user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleKeyDown = (e, index) => {
    if (e.key >= 0 && e.key <= 9) {
      const newOtp = [...otp];
      newOtp[index] = e.key;
      setOtp(newOtp);
      setTimeout(() => {
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }, 10);
    } else if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setTimeout(() => {
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      }, 10);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteOtp = paste.slice(0, 6).split("");
    const newOtp = [...otp];
    pasteOtp.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });
    setOtp(newOtp);
    inputRefs.current[pasteOtp.length - 1].focus();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    await verifyOtp(Number(otpString), navigate);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center text-blue-600 mb-12">
          <FaBookOpen className="h-12 w-12" />
          <span className="ml-2 text-4xl font-extrabold">LearnX</span>
        </div>

        {/* Verification Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Verify Your Account</h2>
          <p className="text-center text-gray-600 mb-8">
            We emailed you the six digit code to verify your email address. Enter the code below to confirm your email address.
          </p>

          <form onSubmit={submitHandler} className="space-y-8">
            <div className="flex justify-center space-x-4" onPaste={handlePaste}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={otp[index]}
                  onChange={() => {}}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-2xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {btnLoading ? (
                <RotatingLines
                  visible={true}
                  height="24"
                  width="24"
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
              ) : (
                "Verify Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;