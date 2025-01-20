import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { UserData } from "../context/user-context";
import { Link } from "react-router-dom";

export function AdminAppbar() {
    const { isAuth } = UserData()
//  console.log(isAuth);
 
    return (
        <Navbar fluid rounded className="flex-row-reverse">
{isAuth ?
                <div className="flex items-center">
                <Link to="/" className={`${window.location.pathname=="/admin-dash"?"hidden":""} text-2xl font-bold text-blue-600`}>
                  LearnX
                </Link>
              </div>
                :
                <Link to='/login'>

<div className="md:order-2 bg-blue-500 rounded-md ms-5 me-5">
                <Button>Get started</Button>
            </div>
                </Link>
}
                <NavbarToggle />
            <NavbarCollapse className="mt-5 ">
                <Link to="/">
                    Home
                </Link>
                <Link to="/about">About</Link>
                {/* <Link to="#">Services</Link> */}
        <Link to="/admin-dash" className={`${isAuth ? "block" : "hidden"}`}>Dashboard</Link>
                <Link to="/contact">Contact</Link>
                {/* <Link to="#"><Notification/></Link> */}
                {/* <Link to="#"><ProfileDropdown/></Link> */}
            </NavbarCollapse>

        </Navbar>
    );
}
