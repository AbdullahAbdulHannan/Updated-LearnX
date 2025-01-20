import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { RiPencilFill } from "react-icons/ri";
import CountrySelector from "./CountrySelect";

export const GeneralInfoForm = () => {
  const [birthday, setBirthday] = useState("");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 relative">
        <div className="absolute right-8 top-8 cursor-pointer hover:opacity-75 transition-opacity">
          <RiPencilFill size={24} className="text-blue-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-8 text-blue-900">General Information</h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="birthday" className="text-sm font-semibold text-gray-700">
                Birthday
              </label>
              <Datetime
                timeFormat={false}
                onChange={setBirthday}
                renderInput={(props, openCalendar) => (
                  <div className="relative">
                    <input
                      {...props}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="MM/DD/YYYY"
                      value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                      onFocus={openCalendar}
                      onChange={() => {}}
                    />
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="absolute right-4 top-3.5 text-gray-400"
                    />
                  </div>
                )}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-semibold text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="0">Select gender</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="+12-345 678 910"
              />
            </div>
          </div>

          <div className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label htmlFor="address" className="text-sm font-semibold text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your home address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-semibold text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-semibold text-gray-700">
                  State/Country
                </label>
                <CountrySelector />
              </div>
              <div className="space-y-2">
                <label htmlFor="zip" className="text-sm font-semibold text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-150"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};