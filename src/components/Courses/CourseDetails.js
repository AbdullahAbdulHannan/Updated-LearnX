import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../index";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseData } from "../context/course-context";
import { ThreeDots } from "react-loader-spinner";
import { Appbar } from "../Navbar";
import { UserData } from "../context/user-context";
import { AdminAppbar } from "../admin/AdminNav";
import { BookOpen, Clock, Award, HelpCircle, GraduationCap } from 'lucide-react';

const CourseDetails = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchCourse, course } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in. Token missing.");
      
      setLoading(true);
      await axios.post(
        `${server}/api/course/enroll/${params.id}`,
        {},
        { headers: { token } }
      );
      
      toast.success("Enrollment successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots visible={true} height="80" width="80" color="#2563eb" />
      </div>
    );
  }

  return (
    <>
      {user && user.role !== 'admin' ? <Appbar /> : <AdminAppbar />}
      {course && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row items-center">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="w-full lg:w-1/2 h-[400px] object-cover"
              />
              <div className="p-8 lg:p-12 text-white lg:w-1/2">
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <div className="space-y-4 mb-8">
                  <p className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Instructor: {course.createdBy}
                  </p>
                  <p className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Duration: {course.duration} weeks
                  </p>
                </div>
                <p className="text-blue-100 mb-8">{course.description}</p>
                
                {user?.subscription?.includes(course._id) ? (
                  <button
                    onClick={() => navigate(`/course-enrolled/${course._id}`)}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Learning
                  </button>
                ) : (
                  <button
                    onClick={checkoutHandler}
                    disabled={loading}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    {loading ? 'Processing...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2 space-y-8">
              {/* What You'll Learn */}
              <section className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-500">What You'll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Master core concepts', 'Hands-on projects', 'Real-world applications', 'Industry best practices'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-700 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Course Content */}
              <section className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-blue-500">Course Content</h2>
                <div className="space-y-4">
                  {['Introduction', 'Core Concepts', 'Advanced Topics', 'Projects'].map((module, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold  text-gray-500">Module {index + 1}: {module}</h3>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* FAQ Section */}
            <div className="lg:col-span-1">
              <section className="bg-white p-8 rounded-2xl shadow-lg top-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-blue-500">
                  <HelpCircle className="w-6 h-6 mr-2" />
                  FAQs
                </h2>
                <div className="space-y-6">
                  {[
                    {
                      q: "Who is this course for?",
                      a: "This course is designed for both beginners and intermediate learners."
                    },
                    {
                      q: "What are the prerequisites?",
                      a: "Basic understanding of the subject matter is recommended."
                    },
                    {
                      q: "Is there a certificate?",
                      a: "Yes, you'll receive a certificate upon completion."
                    }
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <h4 className="font-semibold mb-2 text-blue-500">{faq.q}</h4>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;