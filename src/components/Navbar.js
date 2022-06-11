import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import {SidebarData} from './SidebarData'
import { IconContext } from 'react-icons'
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [userAuth, setUserAuth] = useState(localStorage.getItem("userAuth"));
     let navigate = useNavigate();
     const signUserOut = () => {
       signOut(auth).then(() => {
         localStorage.clear();
         setUserAuth(false);
         navigate("/login");
       });
     };
    
    return (
      <>
        <IconContext.Provider value={{ color: "#d23669" }}>
          <div className="navbar">
            <h1>TechAnalogies</h1>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
}

export default Navbar;