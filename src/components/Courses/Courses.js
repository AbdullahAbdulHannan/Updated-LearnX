import React from 'react';
import CourseCard from './CourseCard';
import { CourseData } from '../context/course-context';
import { Appbar } from '../Navbar';
import { UserData } from '../context/user-context';
import { BookOpen } from 'lucide-react';

const Courses = () => {
  const { courses } = CourseData();
  const { user } = UserData();

  return (
    <>
    {window.location.pathname=="/dashboard"?"":<Appbar/>}
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover a world of knowledge with our carefully curated courses
            </p>
          </div>

          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No courses available yet</p>
              <p className="text-gray-400">Check back soon for new courses</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;