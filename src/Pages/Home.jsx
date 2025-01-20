import React from "react";
import { Appbar } from "../components/Navbar";
import { UserData } from "../components/context/user-context";
import { Link } from "react-router-dom";
import { AdminAppbar } from "../components/admin/AdminNav";
import { GraduationCap, Clock, Target, BookOpen, Database, Megaphone, ChevronRight } from "lucide-react";

const Home = () => {
  const { isAuth, user } = UserData();

  return (
    <>
      {user && user.role !== 'admin' ? <Appbar /> : <AdminAppbar />}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0  opacity-10 bg-cover bg-center" style={{ backgroundImage: `url('/hero.jpeg')` }}/>
          <div className="relative container mx-auto px-4 py-24 sm:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Unlock Your Potential with LearnX
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Your gateway to mastering new skills from the comfort of your home. Join thousands of learners worldwide.
              </p>
              {user && user.role !== 'admin' && isAuth ? (
                <Link to="/courses">
                  <button className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                    Start Learning <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              ) : (
                <Link to="/register">
                  <button className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-blue-500">Why Choose LearnX?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-6">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700">Expert Instructors</h3>
                <p className=" leading-relaxed text-gray-500 italic">
                  Learn from industry experts with real-world experience and proven track records.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-6">
                  <Clock className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700 ">Flexible Learning</h3>
                <p className="text-gray-500 leading-relaxed italic">
                  Learn at your own pace with our self-paced courses designed for your convenience.
                </p>
              </div>
              <div className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600 mb-6">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-blue-700 ">Career Focused</h3>
                <p className="text-gray-500 italic leading-relaxed">
                  Get the skills you need to boost your career opportunities and achieve your goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16  text-blue-500 ">Popular Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700 ">Web Development</h3>
                  <p className="text-gray-600 mb-6">
                    Become a full-stack web developer with our hands-on tutorials and projects.
                  </p>
                  <Link to="/courses" className="text-blue-600 font-medium hover:text-blue-700">
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                  <Database className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">Data Science</h3>
                  <p className="text-gray-600 mb-6">
                    Learn data analysis and machine learning with real-world projects.
                  </p>
                  <Link to="/courses" className="text-blue-600 font-medium hover:text-blue-700">
                    Learn more →
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 p-8 flex items-center justify-center">
                  <Megaphone className="h-16 w-16 text-white" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-700">Digital Marketing</h3>
                  <p className="text-gray-600 mb-6">
                    Master SEO, SEM, and social media marketing for career growth.
                  </p>
                  <Link to="/courses" className="text-blue-600 font-medium hover:text-blue-700">
                    Learn more →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-blue-500">What Our Students Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  quote: "LearnX helped me change my career and land my dream job!",
                  author: "John Doe",
                  role: "Software Developer"
                },
                {
                  quote: "The courses are well-structured and easy to follow.",
                  author: "Jane Smith",
                  role: "Data Analyst"
                },
                {
                  quote: "I love the flexibility to learn at my own pace.",
                  author: "Sarah Lee",
                  role: "Digital Marketer"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex mb-6">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-yellow-400">
                        {star}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold text-lg text-blue-700">{testimonial.author}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Community of Learners</h2>
            <p className="text-xl text-blue-100 mb-8">Sign up today and start your learning journey.</p>
            {user && user.role !== 'admin' && isAuth ? (
              <Link to="/courses">
                <button className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                  Browse Courses <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            ) : (
              <Link to="/register">
                <button className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;