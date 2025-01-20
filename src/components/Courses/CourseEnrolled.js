import React from "react";
import { CourseData } from "../context/course-context";
import CourseCard from "./CourseCard";
import { BookOpen } from 'lucide-react';

const CourseEnrolled = () => {
  const { mycourse } = CourseData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-600 mb-4">My Learning Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your progress and continue learning with your enrolled courses
        </p>
      </div>

      {mycourse && mycourse.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mycourse.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No courses enrolled yet</p>
          <p className="text-gray-400">Start your learning journey by enrolling in a course</p>
        </div>
      )}
    </div>
  );
};

export default CourseEnrolled;