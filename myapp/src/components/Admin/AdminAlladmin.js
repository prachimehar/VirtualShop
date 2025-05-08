import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminlogout, initializeAdmin } from "../../store/adminSlice";
import Loader from "../Loader";
import AdminWelcome from "./AdminWelcome";

const AdminAlladmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(adminlogout());
    alert("Logged Out Successfully!");

    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    dispatch(initializeAdmin());
  }, [dispatch]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/admin/alladmin"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredUser =
    searchTerm !== ""
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : users;

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="main-order">
      {/* Sidebar */}
      <div className="order1">
        <div className="w-64 bg-teal-600 text-white fixed top-0 left-0 bottom-0 p-6">
          <h2 className="text-2xl font-bold mb-6">Profile Menu</h2>
          <ul>
            <li>
              <Link
                to="/admin/welcome"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                User Profile
              </Link>
            </li>
            <li>
              <Link
                to="/admin/add-restaurant"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Add Shop
              </Link>
            </li>
            <li>
              <Link
                to="/admin/alluser"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Customer
              </Link>
            </li>
            <li>
              <Link
                to="/admin/alladmin"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Seller
              </Link>
            </li>
            <li>
              <Link
                to="/admin/allorder"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                All Orders
              </Link>
            </li>
            <li>
              <Link
                to="/admin/contact"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Feedback
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className="block py-2 px-4 hover:bg-teal-500 rounded-md"
              >
                Go Back
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full py-2 px-4 mt-6 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        
      </div>

      <div className="order2">
        <h1 class=" text-orange-500 font-bold text-xl text-center">All Admin</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search Admin..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <i class="fa-solid fa-magnifying-glass absolute right-2 top-5 text-yellow-500"></i>
        </div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAlladmin;
