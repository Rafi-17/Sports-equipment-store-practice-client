import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/AuthProvider";
import Swal from "sweetalert2";

const Navbar = () => {
    const {user, logoutUser} = useContext(AuthContext);
    const handleLogout=()=>{
        logoutUser()
        .then(()=>{
            Swal.fire({
                title: "Success!",
                text: "Logged out Successfully",
                icon: "success",
                confirmButtonText: "Ok"
            });
        })
        .catch(error=>{
            console.log(error);
        })
    }
  const navLinks = (
    <>
      <li><NavLink to="/"className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Home</NavLink></li>
      <li><NavLink to="/users"className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Users</NavLink></li>
      <li><NavLink to="/allEquipment"className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>All Sports Equipment</NavLink></li>
      <li><NavLink to="/addEquipment"className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>Add Equipment</NavLink></li>
      <li><NavLink to={`/myEquipments/${user?.email}`} className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>My Equipment List</NavLink></li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Practice</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {
            user ?
            <>
                <span className="text-white mr-2">{user?.displayName}</span>
                <button onClick={handleLogout}><a className="btn text-white bg-lime-600">Logout</a></button>
            </>
            :
            <><Link to={'/login'}><button className="btn">Login</button></Link></>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
