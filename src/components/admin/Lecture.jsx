import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../";
import toast from "react-hot-toast";
import { UserData } from "../context/user-context";
import { ArrowLeft, Video, Plus, Trash2, Upload, X } from 'lucide-react';

const Lecture = () => {
  const { user } = UserData();
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const fetchLectures = async () => {
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLectures(data.lectures);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchLecture = async (id) => {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: { token: localStorage.getItem("token") },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  };

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);

    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        { headers: { token: localStorage.getItem("token") } }
      );

      toast.success(data.message);
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");
      setVideoPrev("");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(`${server}/api/lecture/${id}`, {
          headers: { token: localStorage.getItem("token") },
        });
        toast.success(data.message);
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/admin-dash" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="ml-4 text-2xl font-bold text-gray-900">Course Lectures</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {lecLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : lecture.video ? (
              <div>
                <video
                  src={`${server}/${lecture.video}`}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  className="w-full aspect-video"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900">{lecture.title}</h2>
                  <p className="mt-2 text-gray-600">{lecture.description}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-gray-500">
                <p>Select a lecture to play</p>
              </div>
            )}
          </div>

          {/* Lectures List Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            {user?.role === "admin" && (
              <button
                onClick={() => setShow(!show)}
                className="mb-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {show ? <X className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
                {show ? "Cancel" : "Add Lecture"}
              </button>
            )}

            {show && (
              <form onSubmit={submitHandler} className="mb-8 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
                  <div className="flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                          <span>Upload a video</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="video/*"
                            onChange={changeVideoHandler}
                            required
                          />
                        </label>
                      </div>
                      {videoPrev && (
                        <video
                          src={videoPrev}
                          controls
                          className="mt-4 mx-auto max-h-48 rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={btnLoading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {btnLoading ? "Please Wait..." : "Add Lecture"}
                </button>
              </form>
            )}

            <div className="space-y-2">
              {lectures.length > 0 ? (
                lectures.map((lec, index) => (
                  <div
                    key={lec._id}
                    onClick={() => fetchLecture(lec._id)}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      lecture._id === lec._id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Video className={`h-5 w-5 ${
                        lecture._id === lec._id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div>
                        <h3 className={`font-medium ${
                          lecture._id === lec._id ? 'text-blue-600' : 'text-gray-900'
                        }`}>
                          {index + 1}. {lec.title}
                        </h3>
                      </div>
                    </div>
                    {user?.role === "admin" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteHandler(lec._id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">No lectures available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lecture;