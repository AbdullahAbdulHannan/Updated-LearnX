import React from "react";
import { Appbar } from "../components/Navbar";
import { UserData } from "../components/context/user-context";
import { AdminAppbar } from "../components/admin/AdminNav";
import { Users, Target, Lightbulb, ChevronRight } from "lucide-react";
const About = () => {
  const { user } = UserData();
  return (
    <>
      {user && user.role !== 'admin' ? <Appbar /> : <AdminAppbar />}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <header className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="absolute inset-0 opacity-10 bg-cover bg-center"  style={{ backgroundImage: `url('/hero.jpeg')` }}
          />
          <div className="relative container mx-auto px-4 py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">About Us</h1>
              <p className="text-xl text-blue-100">
                Learn more about our mission, vision, and the team behind LearnX
              </p>
            </div>
          </div>
        </header>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <Target className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center mb-8 text-blue-500">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                At LearnX, our mission is to make high-quality education accessible to everyone, everywhere. 
                We are committed to empowering learners of all ages with the tools and knowledge they need 
                to succeed in today's fast-paced world.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                  <Lightbulb className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-center mb-8 text-blue-500">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed text-center">
                Our vision is to create a global community of lifelong learners, connected through the power of technology. 
                We believe that education should be flexible, affordable, and tailored to the individual needs of students.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-blue-500">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  name: "Abdullah",
                  role: "Founder & CEO",
                },
                {
                  name: "ABC",
                  role: "Chief Learning Officer",
                },
                {
                  name: "DEF",
                  role: "Head of Product Development",
                  }
              ].map((member, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all">
                  
                  <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-blue-100 mb-8">Be a part of our mission to revolutionize learning.</p>
            <button className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 hover:bg-blue-50 transition-colors">
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;