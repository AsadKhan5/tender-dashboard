import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserPanel = () => {
  const [tenders, setTenders] = useState([]);
  const [selectedTender, setSelectedTender] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [companyName, setCompanyName] = useState(""); // New state for company name
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch tenders when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/tender/tenders")
      .then((response) => {
        setTenders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tenders:", error);
      });
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Handle bid submission
  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!selectedTender || !bidAmount || !companyName) return;

    const bidData = {
      tenderId: selectedTender.id,
      userId: userInfo.email,
      companyName,
      bidCost: bidAmount,
    };

    // Send POST request to submit the bid
    axios
      .post("http://localhost:8000/bids/submit-bid", bidData)
      .then((response) => {
        console.log("Bid submitted successfully:", response.data);
        alert("Bid submitted successfully");
        // Optionally, close the modal or reset the form
        setBidAmount("");
        setCompanyName("");
        setSelectedTender(null);
        document.getElementById("add_tender").close();
      })
      .catch((error) => {
        console.error("Error submitting bid:", error);
      });
  };

  const handleEditBid = (tender) => {
    setSelectedTender(tender);
    setIsEditing(true);
  };

  const addTenderHandler = (tender) => {
    setSelectedTender(tender);
    setIsEditing(false);
    document.getElementById("add_tender").showModal();
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <div className="text-xl font-bold">Tender User Panel</div>
        <div>
          <button
            className="text-white text-3xl"
            onClick={() => document.getElementById("user-modal").showModal()}
          >
            <FaRegUserCircle />
          </button>

          <dialog id="user-modal" className="modal">
            <div className="modal-box w-72 fixed top-12 right-8">
              <div className="flex gap-2 items-center">
                <FaUserTie className="text-3xl text-black" />
                <div>
                  <h3 className="text-black font-md text-md font-bold">
                    {userInfo?.email}
                  </h3>
                  <p className="text-black text-sm font-semibold">
                    {userInfo?.mobile}
                  </p>
                  <p className="text-black text-sm font-semibold">
                    {userInfo?.role}
                  </p>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />

              <button className="text-md text-black font-semibold rounded-md hover:bg-base-300 p-2 w-full flex items-center">
                <TbPasswordUser className="inline-block mr-1 text-2xl" />
                <span className="">Change Password</span>
              </button>

              <button
                className="text-md text-black font-semibold rounded-md hover:bg-base-300 p-2 w-full flex items-center"
                onClick={logoutHandler}
              >
                <RiLogoutCircleLine className="inline-block mr-1 text-2xl" />
                <span className="text-lg">Logout</span>
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Available Tenders
        </h2>

        {/* Tenders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenders.map((tender) => (
            <div
              key={tender.id}
              className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {tender.name}
              </h3>
              <p className="text-gray-600 mt-2">{tender.description}</p>
              <p className="text-gray-600 mt-2">
                <strong>Start Time:</strong>{" "}
                {new Date(tender.startTime).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>End Time:</strong>{" "}
                {new Date(tender.endTime).toLocaleString()}
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Status:</strong> {tender.status}
              </p>

              {/* Action Buttons */}
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded mr-2"
                  onClick={() => addTenderHandler(tender)}
                >
                  Place Bid
                </button>
                <button
                  className="bg-yellow-500 text-white py-1 px-4 rounded"
                  onClick={() => handleEditBid(tender)}
                >
                  Edit Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for placing or editing bid */}
      <dialog id="add_tender" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit Bid" : "Place Bid"} for: {selectedTender?.name}
          </h3>
          <form onSubmit={handleBidSubmit}>
            <div className="flex flex-col gap-4">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="bidAmount"
              >
                Minimum Bid Amount
              </label>
              <input
                type="number"
                id="bidAmount"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="companyName"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="w-full border border-gray-300 rounded-lg p-2"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-6 rounded "
              >
                {isEditing ? "Update Bid" : "Submit Bid"}
              </button>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserPanel;
