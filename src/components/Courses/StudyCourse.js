import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../context/course-context";
import { server } from "../../index";
import { UserData } from "../context/user-context";
import { Appbar } from "../Navbar";
import { BookOpen, Clock, User, PlayCircle } from 'lucide-react';

const CourseStudy = () => {
  const params = useParams();
  const { user } = UserData();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    } else {
      fetchCourse(params.id);
    }
  }, [user, params.id, navigate, fetchCourse]);

  return (
    <>
      <Appbar />
      {course && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Course Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <img
                  src={`${server}/${course.image}`}
                  alt={course.title}
                  className="w-32 h-32 mx-auto mb-6 rounded-xl shadow-lg object-cover"
                />
                <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-blue-100 mb-8">{course.description}</p>
                
                <div className="flex flex-wrap justify-center gap-6 text-sm">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    <span>Instructor: {course.createdBy}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Duration: {course.duration} weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Content */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Course Overview
              </h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  This comprehensive course will guide you through all aspects of {course.title}.
                  Follow the structured curriculum and practice with hands-on exercises.
                </p>
              </div>
            </div>

            <Link
              to={`/course-lectures/${course._id}`}
              className="block bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-colors"
            >
              <div className="p-6 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 mr-2" />
                <span className="text-lg font-semibold">Start Learning</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;