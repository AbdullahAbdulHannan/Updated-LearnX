import 'devextreme/dist/css/dx.light.css';
import logo from './logo.svg';
// import './App.css';
import Dashboard from './Pages/Dashboard';
import ProfilePage from './Pages/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Student from './components/Profile/Main';
import Login from './components/Auth/Login';
import Register from './components/Auth/Signup';
import VerifyAccount from './components/Auth/Verify';
import { UserData } from './components/context/user-context';
import Home from './Pages/Home';
import { Appbar } from './components/Navbar';
import Courses from './components/Courses/Courses';
import About from './Pages/About';
import CourseDetails from './components/Courses/CourseDetails';
import { CourseData } from './components/context/course-context';
import CourseStudy from './components/Courses/StudyCourse';
import AdminDashboard from './components/admin/Main';
import AdminCourses from './components/admin/AdminCourse';
import AdminRegister from './components/admin/AdminSignup';
import Lecture from './components/admin/Lecture';
import LectureList from './components/Courses/StudyLecture';
import Contact from './Pages/Contact';
function App() {
  const { isAuth, user, loading } = UserData();
  const { course } = CourseData();
  return (
    <Router>

      <Routes>
      <Route path="/login" element={ <Login/>}/>
      <Route path="/register" element={ <Register/>}/>
      <Route path="/admin-register" element={ <AdminRegister/>}/>
      <Route path="/verification" element={ <VerifyAccount/>}/>
      <Route path="/" element={ <Home/>}/>
      <Route path="/about" element={ <About/>}/>
      <Route path="/contact" element={ <Contact/>}/>
      <Route path="/dashboard" element={isAuth ? <Dashboard/>: <Login />}/>
      <Route path="/profile" element={ <Student/>}/>
      <Route path="/courses" element={ <Courses/>}/>
      <Route path="/course-details/:id" element={ <CourseDetails user={user}/>}/>
      <Route path="/course-enrolled/:id" element={ <CourseStudy/>}/>
      <Route path="/admin-dash" element={isAuth && user && user.role==="admin" ?<AdminDashboard/>:<Home/>}/>
      <Route path="/admin-course" element={ <AdminCourses/>}/>
      <Route path="course/:id/add-lectures" element={ <Lecture/>}/>
      <Route path="course-lectures/:id" element={ <LectureList/>}/>
          
         
      </Routes>
    </Router>
  );
}

export default App;
// <div className="App">
//   <Router>
//     <Router/>
//   <ProfilePage/>
//   {/* <Dashboard/> */}
//   {/* <Auth/> */}
//   {/* <Signup/> */}
// </div>
