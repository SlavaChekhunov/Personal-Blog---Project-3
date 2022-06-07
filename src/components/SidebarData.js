import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    className: "nav-text",
  },
  {
    title: "Create a post",
    path: "/create",
    icon: <IoIcons.IoIosPaper />,
    className: "nav-text",
  },
  
];

export const Login = [
    {
      title: "Login",
      path: "/login",
      icon: <AiIcons.AiOutlineLogin />,
      className: "nav-text",
    }
]

export const Logout = [
  {
    title: "Logout",
    path: "/",
    icon: <AiIcons.AiOutlineLogout />,
    className: "nav-text",
  },
];