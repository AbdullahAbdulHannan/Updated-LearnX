import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../..';
import { UserData } from '../context/user-context';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BookOpen, Trash2, Plus, Info, GraduationCap } from 'lucide-react';
import LectureFormModal from './LectureModal';

const CourseCard = ({ course }) => {
  const { user } = UserData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in. Token missing.");
      
      await axios.delete(`${server}/api/course/${course._id}`, {
        headers: { token },
      });
      
      toast.success("Deleted Successfully!");
      navigate(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Deletion failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const checkoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not logged in. Token missing.");
      
      setLoading(true);
      await axios.post(
        `${server}/api/course/enroll/${course._id}`,
        {},
        { headers: { token } }
      );
      
      toast.success("Enrollment successful!");
      navigate(0);
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={`${server}/${course.image}`} 
          alt={course.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {course.category}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-4">Created by {course.createdBy}</p>
        
        <div className="space-y-3">
          {user && user.role !== 'admin' ? (
            <>
              {user?.subscription?.includes(course._id) ? (
                <Link to={`/course-lectures/${course._id}`}>
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Study Now
                  </button>
                </Link>
              ) : (
                <button
                  onClick={checkoutHandler}
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {loading ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}
              
              <Link to={`/course-details/${course._id}`}>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Info className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={`/course/${course._id}/add-lectures`}>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lecture
                </button>
              </Link>
              
              <button 
                onClick={handleDelete}
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {loading ? 'Deleting...' : 'Delete Course'}
              </button>
            </>
          )}
        </div>
      </div>

      <LectureFormModal
        courseId={course._id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CourseCard;