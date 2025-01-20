import React, { useEffect } from 'react';
import { FaBars,FaBookOpen } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosArrowBack } from 'react-icons/io';
import { LuPanelLeftOpen } from "react-icons/lu";
import { VscFeedback } from "react-icons/vsc";
function Sidebar({ isOpen, setIsOpen, onLinkClick,activeLink }) {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className={`p-3 text-gray-500 rounded-lg fixed top-0 left-4 z-50 bg-white  ${isOpen ? 'hidden' : ''}`}
      >
        <LuPanelLeftOpen size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full !bg-blue-500 text-white w-72 p-4 z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className={`p-3 text-gray-300 rounded-lg fixed top-2 left-0 z-50 shadow-lg ${isOpen ? '' : 'hidden'}`}
        >
          <IoIosArrowBack size={24} />
        </button>

        <div className="logo mb-10 flex ms-4 mt-8">
         <FaBookOpen size={65}/>
         <span className=' font-extrabold text-4xl mt-3 ms-2'>LearnX</span>
        </div>

        {/* Sidebar Navigation */}
        <div className="sidebar-nav">
          <ul className="menu vertical space-y-4">
            <li>
              <a
                href="#"
                className={`flex items-center space-x-2 ${activeLink === 'dashboard' ? 'bg-white !text-blue-700 hover:!bg-white' : ''}`}
                onClick={() => onLinkClick('dashboard')}
              >
                <MdDashboard/>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-2 ${activeLink === 'courses' ? 'bg-white !text-blue-700 hover:!bg-white'  : ''}`}
                onClick={() => onLinkClick('courses')}
              >
                <i className="fa fa-compass" aria-hidden="true"></i>
                <span>Courses</span>
              </a>
            </li>
            {/* <li>
              <a
              href="#"
              className={`flex items-center space-x-2 ${activeLink === 'tools' ? 'bg-white !text-blue-700 hover:!bg-white' : ''}`}
              onClick={() => onLinkClick('tools')}
              >
              <i className="fa fa-rocket" aria-hidden="true"></i>
              <span>Tools</span>
              </a>
              </li> */}
            <li>
              <a
                href="#"
                className={`flex items-center space-x-2 ${activeLink === 'support' ? 'bg-white !text-blue-700 hover:!bg-white' : ''}`}
                onClick={() => onLinkClick('support')}
              >
                <i className="fa fa-life-buoy" aria-hidden="true"></i>
                <span>Support</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`flex items-center space-x-2 ${activeLink === 'Feedback' ? 'bg-white !text-blue-700 hover:!bg-white' : ''}`}
                onClick={() => onLinkClick('Feedback')}
              >
                < VscFeedback/>
                <span>Feedback</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
