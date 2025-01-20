import React from 'react';
import Notification from './Notification';
import { ProfileDropdown } from './ProfileDropdown';

function Header() {
  
  return (
    <div id="content-header">
      
      <div className="float-right user-header">
        <ul className="menu">
          <li><Notification/></li>
          <li className='user-img'><ProfileDropdown/></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;