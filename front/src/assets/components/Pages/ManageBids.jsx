import React, { useEffect, useState } from "react";
import axios from "axios";
import TableWrapper from "./TableWrapper";

const ManageBids = () => {
  const [bids, setBids] = useState([]);

  // Fetch bids from API
  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await axios.get("http://localhost:8000/bids/get-all");
        setBids(response.data.data); // Assuming the data is structured as mentioned
      } catch (error) {
        console.error("Error fetching bids:", error);
      }
    };

    fetchBids();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Manage Bids</h2>

      <div>
        <TableWrapper data={bids} />
      </div>
    </div>
  );
};

export default ManageBids;
