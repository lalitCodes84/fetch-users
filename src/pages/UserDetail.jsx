import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [singleUser] = useState(location.state || {});
  return (
    <div className="">
      <div className="flex justify-center gap-20 shadow-custom w-fit m-auto p-4 mt-10 rounded-lg border-gray-800 border-2">
        <div>
          <h1 className="font-bold my-4">User Details</h1>
          <p id="name" className="flex gap-4">
            <FaUserTie /> {singleUser.name}
          </p>
          <p className="flex gap-4">
            <MdAttachEmail />
            {singleUser.email}
          </p>
          <p className="flex gap-4">
            <FaPhoneAlt />
            {singleUser.phone}
          </p>
        </div>
        <div>
          <h1 className="font-bold my-4">Company Details</h1>
          <p>Website : {singleUser.website}</p>
          <p>Company : {singleUser.company.name}</p>
        </div>
      </div>

      <button
        className="px-4 py-1 my-8 mx-52 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}

export default UserDetail;
