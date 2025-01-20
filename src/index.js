// import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'flowbite-react';
import 'flowbite/dist/flowbite.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { UserContextProvider } from "../src/components/context/user-context.js";
import { CourseContextProvider } from './components/context/course-context.js';


export const server = "https://learnx-fk185pry.b4a.run/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <UserContextProvider>
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);