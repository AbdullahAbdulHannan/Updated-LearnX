import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Video, BookOpen } from 'lucide-react';
import { server } from '../..';

const LectureList = () => {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLecture, setLoadingLecture] = useState(false);
  const params = useParams();

  const fetchLectures = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
    } catch (error) {
      toast.error('Failed to fetch lectures');
    } finally {
      setLoading(false);
    }
  };

  const fetchLecture = async (lectureId) => {
    setLoadingLecture(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${lectureId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setSelectedLecture(data.lecture);
    } catch (error) {
      toast.error('Failed to fetch lecture');
    } finally {
      setLoadingLecture(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-gray-900">Course Lectures</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                <div
                  key={lecture._id}
                  onClick={() => fetchLecture(lecture._id)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <Video className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {lecture.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{lecture.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No lectures available yet</p>
              </div>
            )}
          </div>
        )}

        {loadingLecture ? (
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : selectedLecture && (
          <div className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedLecture.title}</h2>
              <video
                className=" aspect-video w-full rounded-lg shadow-lg"
                src={`${server}/${selectedLecture.video}`}
                controls
                controlsList="nodownload"
               
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">{selectedLecture.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureList;