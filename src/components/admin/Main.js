import React, { useEffect, useState } from 'react';
import Content from '../../components/Dashboard/Content';
import '../../components/Dashboard/Dashboard.css';

import Sidebar from './Admin-Dash';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/user-context';
import axios from 'axios';
import { server } from '../..';
import { AdminAppbar } from './AdminNav';
import AdminCourses from './AdminCourse';
import Users from './UserDisplay';
import { ProfileDropdown } from '../Dashboard/ProfileDropdown';
import AnnouncementForm from './Announcement';
import { BookOpen, Users as UsersIcon, Video } from 'lucide-react';


const AdminDashboard = () => {
 
  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }
  const navigate = useNavigate();
  const{user}=UserData()
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Redirect if user is not admin
  // useEffect(() => {
  //   if (user) {
  //     if (user.role !== 'admin') {
  //       navigate('/');
  //     }
  // }}, [user, navigate]);

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('Check Status'); // State to track selected content

  const handleLinkClick = (content) => {
    setSelectedContent(content); 
  };
  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className={`bg-white rounded-xl shadow-sm overflow-hidden`}>
      <div className={`p-6 ${color}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-medium">{title}</p>
            <p className="text-white text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-full bg-white/20`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedContent) {
      case 'Check Status':
        return   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 md:mt-40">
        <StatCard
                icon={BookOpen}
                title="Total Courses"
                value={stats.totalCourse}
                color="bg-gradient-to-r from-blue-600 to-blue-800"
              />
              <StatCard
                icon={Video}
                title="Total Lectures"
                value={stats.totalLectures}
                color="bg-gradient-to-r from-green-600 to-green-800"
              />
              <StatCard
                icon={UsersIcon}
                title="Total Users"
                value={stats.totalUsers}
                color="bg-gradient-to-r from-purple-600 to-purple-800"
              />
           
      </div>
      case 'Manage Courses':
        return <AdminCourses/>;
      case 'Users':
        return <Users/>;
      // case 'tools':
      //   return <div>Tools Content</div>;
      case 'make announcement':
        return <AnnouncementForm/>;
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
        <AdminAppbar />
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

export default AdminDashboard;
