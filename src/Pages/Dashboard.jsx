import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import Content from '../components/Dashboard/Content';
import '../components/Dashboard/Dashboard.css';
import Courses from '../components/Courses/Courses';
import { Appbar } from '../components/Navbar';
import { ProfileDropdown } from '../components/Dashboard/ProfileDropdown';
import Notification from '../components/Dashboard/Notification';
import SupportPage from '../components/Dashboard/Support';
import FeedbackForm from '../components/Dashboard/Feedback';
import CourseEnrolled from '../components/Courses/CourseEnrolled';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('dashboard'); // State to track selected content

  const handleLinkClick = (content) => {
    setSelectedContent(content); 
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'dashboard':
        return  <><Content/><CourseEnrolled/></>
      case 'courses':
        return <Courses/>;
      case 'Feedback':
        return <FeedbackForm/>;
      // case 'tools':
      //   return <div>Tools Content</div>;
      case 'support':
        return <SupportPage/>;
      // case 'settings':
      //   return <div>Settings Content</div>;
      // case 'signout':
      //   return <div>Signing out...</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };
//
  return (
    <div className="App">
      {/* Pass the state and setter to the Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} onLinkClick={handleLinkClick} activeLink={selectedContent}/>

      {/* Conditionally apply margin based on isSidebarOpen */}
      <div className={`${isSidebarOpen ? 'md:ms-[288px]' : ''} transition-all duration-300 `} >
        <div className='flex flex-row-reverse'>
      <ProfileDropdown/>
        <Appbar />
        </div>
        {/* <Content /> */}
        <div id="content">
          {/* Render the content based on the selected link */}
          {renderContent()}
          {/* <Tab /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
