import React from 'react';
import { UserData } from '../context/user-context';

function Content() {
  const {user}=UserData()
  return (
    <div className="container-fluid !mt-1">
      <div className="banner blue bg-green-400 text-white font-extrabold">
        <h2>{`Welcome, ${user.name}`}</h2>
        <h4>Let's Start Learning!</h4>
        
      </div>
    </div>
  );
}
export default Content;