import React, { useState } from "react";

const CreateTender = () => {
  const [tenderName, setTenderName] = useState("");
  const [tenderDescription, setTenderDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bufferTime, setBufferTime] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const tenderData = {
      tenderName,
      tenderDescription,
      startTime,
      endTime,
      bufferTime,
    };

    console.log("Tender Created:", tenderData);
    // You can handle the submission, such as sending it to an API or backend server here.

    // Reset form after submission
    setTenderName("");
    setTenderDescription("");
    setStartTime("");
    setEndTime("");
    setBufferTime("");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4 w-full">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Tender
        </h2>
        <form onSubmit={handleFormSubmit}>
          {/* Tender Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="tenderName"
            >
              Tender Name
            </label>
            <input
              type="text"
              id="tenderName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tender name"
              value={tenderName}
              onChange={(e) => setTenderName(e.target.value)}
              required
            />
          </div>

          {/* Tender Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="tenderDescription"
            >
              Tender Description
            </label>
            <textarea
              id="tenderDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              placeholder="Enter tender description"
              value={tenderDescription}
              onChange={(e) => setTenderDescription(e.target.value)}
              required
            />
          </div>

          {/* Tender Start Time */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="startTime"
            >
              Tender Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          {/* Tender End Time */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="endTime"
            >
              Tender End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          {/* Buffer Time */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="bufferTime"
            >
              Buffer Time (in minutes)
            </label>
            <input
              type="number"
              id="bufferTime"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter buffer time in minutes"
              value={bufferTime}
              onChange={(e) => setBufferTime(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Create Tender
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTender;
