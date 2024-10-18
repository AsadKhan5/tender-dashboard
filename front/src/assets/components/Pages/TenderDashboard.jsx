import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiMenuFold2Line } from "react-icons/ri";
import TableWrapper from "./TableWrapper";

const TenderDashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchTenders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/tender/tenders"
        );
        setTenders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tenders.");
        setLoading(false);
      }
    };

    fetchTenders();
  }, []);

  // Display loading or error message if applicable
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Render table with tender data
  return (
    <div className="flex flex-col gap-10 p-5 w-full">
      <h1 className="text-2xl font-bold mb-4">Tender Dashboard</h1>
      <div className="flex items-center justify-center w-full">
        <TableWrapper
          data={tenders}
          action={[
            {
              icon: <RiMenuFold2Line className="4xl text-primary" />,
              navigate: {
                link: `manageBids`,
                variable: ["siteName", "siteCode"],
              },
              dataTip: "go to bids",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TenderDashboard;
