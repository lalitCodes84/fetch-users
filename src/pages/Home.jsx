// Importing necessary packages and librarys to use
import React, { useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
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
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } h-full`}
    >
      <div className="flex bg-gray-500 items-center justify-between px-8">
        <div className="flex gap-8 p-4 ">
          <h1 className="font-bold font-serif">Users Data</h1>

          <input
            type="text"
            value={userSearch}
            placeholder="Search..."
            className={`${darkMode && 'text-black'} w-96 px-4 text-lg h-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
            onChange={handleChange}
          />
          <select
            id="sortBy"
            onChange={handleSort}
            className={`border rounded-lg h-10 ${
              darkMode && "text-black"
            } text-xl `}
          >
            <option value="aToz">A-Z</option>
            <option value="zToa">Z-A</option>
          </select>
        </div>
        <div>
          <button onClick={() => setDarkMode(!darkMode)} className=" ">
            {darkMode ? <MdDarkMode /> : <CiDark className="text-black" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 mt-4">
        {currentItems.map((user, index) => (
          <div
            key={index}
            className={`text-lg border-2 w-72 text-center cursor-pointer shadow-md p-2 rounded-md ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            } m-auto `}
            onClick={() => handleClick(user)}
          >
            <FaUserTie className="size-20 m-auto" />
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>City : {user.address.city}</p>
          </div>
        ))}
      </div>
      <div className="p-4 text-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-gray-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-gray-500/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Prev
        </button>
        <span className="m-2 text-lg">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-gray-500 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-gray-500/60 hover:border-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
