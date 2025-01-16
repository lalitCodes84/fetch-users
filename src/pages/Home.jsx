// Importing necessary packages and librarys to use
import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false); // State for theme
  const itemsPerPage = 3;
  const navigate = useNavigate();

  // Fetching users data from the api given
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(`Error occurred: ${error}`);
      }
    };
    fetchUsers();
  }, []);

  // receiving/catching value entered in search bar
  const handleChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setUserSearch(searchValue);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  // Handling the sorting functionality ascending and descending order
  const handleSort = (event) => {
    const sortOption = event.target.value;
    const sortedUsers = [...filteredUsers];
    if (sortOption === "aToz") {
      sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "zToa") {
      sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredUsers(sortedUsers);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredUsers.slice(startIndex, endIndex);

  // Directing to user details page on click of the perticular user card
  function handleClick(user) {
    navigate(`/user-detail/${user.id}`, { state: user });
  }

  return (
    <div
      className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
    >
      <div className="flex bg-gray-500 p-4 gap-8 w-full">
        <h1 className="font-bold font-serif">Users Data</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <input
          type="text"
          value={userSearch}
          placeholder="Search..."
          className="w-96 px-4 text-lg h-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={handleChange}
        />
        <select
          id="sortBy"
          onChange={handleSort}
          className="border rounded-lg h-10"
        >
          <option value="aToz">A-Z</option>
          <option value="zToa">Z-A</option>
        </select>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-3 gap-8 p-4">
        {currentItems.map((user, index) => (
          <div
            key={index}
            className={`text-xl border-2 w-96 cursor-pointer shadow-custom p-2 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
            onClick={() => handleClick(user)}
          >
            <FaUserTie className="size-20" />
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>City : {user.address.city}</p>
          </div>
        ))}
      </div>
      <div className="p-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Prev
        </button>
        <span className="m-2">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
