
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/user-context";
import toast from "react-hot-toast";
export function ProfileDropdown() {
  const {user,setIsAuth, setUser}=UserData()
  console.log(user);
  // const {  } = UserData();

  const navigate = useNavigate()
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  const profile = user.name.split('').map(char => char.toUpperCase());
  return (
    <Dropdown
      label={<Avatar 
        placeholderInitials={`${profile[0]}${profile[1]}`}
         rounded />}
      arrowIcon={false}
      inline
    >
      <DropdownHeader>
        <span className="block text-sm">{`${user.name}`}</span>
        <span className="block truncate text-sm font-medium">{`${user.email}`}</span>
      </DropdownHeader>
      <Link to={'/profile'}>
      <DropdownItem ><CgProfile size={24} className="me-2"/>Profile</DropdownItem></Link>
      {/* <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownDivider /> */}
      <DropdownItem onClick={logoutHandler}><LiaSignOutAltSolid size={24} className="me-2"/>Sign out</DropdownItem>
    </Dropdown>
  );
}
