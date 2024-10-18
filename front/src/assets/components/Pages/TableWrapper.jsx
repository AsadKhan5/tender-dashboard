import React, { useState, useEffect } from "react";
import { FaDownload, FaFileExcel } from "react-icons/fa6";
import { MultiSelect } from "react-multi-select-component";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TableWrapper = ({ data, action }) => {
  // console.log(data);
  const navigate = useNavigate();
  const [selectedCol, setSelectedCol] = useState([]);
  const [options, setOptions] = useState([]);
  const [dynamicData, setDynamicData] = useState();
  const [searchText, setSearchText] = useState("");

  const goToCompanyDetails = (route, type, companyName, siteCode) => {
    navigate(`/${route}/${type}/${companyName}/${siteCode}`);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      let _options = columns.map((value) => {
        return { label: value, value };
      });
      setOptions(_options);
      let defaultOptions = _options.slice(0, 6);
      setSelectedCol(defaultOptions);
    } else {
      setOptions([]);
      setSelectedCol([]);
    }
    setDynamicData(data);

    return () => {
      setOptions([]);
      setSelectedCol([]);
    };
  }, [data]);

  useEffect(() => {
    if (searchText) {
      const lowerSearchTerm = searchText.toLowerCase();

      let result = data.filter((site) => {
        return Object.values(site).some((value) =>
          value?.toString().toLowerCase().includes(lowerSearchTerm)
        );
      });

      setDynamicData(result);
    } else {
      setDynamicData(data);
    }
  }, [searchText, data]);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sites");
    XLSX.writeFile(workbook, "sites_data.xlsx");
  };

  const handlePDFExport = (data) => {
    const doc = new jsPDF();
    const columns = [...new Set(data.flatMap((item) => Object.keys(item)))];
    const rows = data.map((item) =>
      columns.map((column) => item[column] || "")
    );

    doc.text("Dynamic Data PDF", 14, 22);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
    });

    doc.save("dynamic_data.pdf");
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col lg:flex-row gap-5 justify-between lg:items-baseline items-end">
        <MultiSelect
          options={options}
          value={selectedCol}
          onChange={setSelectedCol}
          labelledBy="Table Columns"
          className="lg:w-1/2 w-full bg-base-100"
        />
        <div className="flex gap-5 w-full lg:max-w-xl justify-end items-end">
          <label className="input input-bordered flex items-center gap-2 w-full">
            <input
              type="text"
              className="grow"
              placeholder="Search within any column"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <IoSearchOutline className="h-4 w-4 opacity-70" />
          </label>
          <div className="flex gap-5 lg:w-44">
            <details className="dropdown dropdown-end">
              <summary className="btn btn-primary text-white shadow-xl shadow-primary/50 hover:shadow-sm flex">
                <FaDownload /> <span className="lg:flex hidden">Download</span>
              </summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li onClick={() => handleExport(dynamicData)}>
                  <a>
                    <FaFileExcel /> Excel
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto overflow-y-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              {action && <th>Action</th>}
              {selectedCol?.map((col) => (
                <th key={col.value}>
                  <div className="flex justify-between items-center capitalize">
                    {col.value}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dynamicData &&
              dynamicData.map((row) => (
                <tr key={row?.id}>
                  {action && (
                    <td className="flex flex-col lg:flex-row gap-2">
                      {action.map((act, index) => (
                        <button
                          key={index}
                          className="btn   text-lg btn-xs  tooltip tooltip-right"
                          data-tip={act.dataTip}
                          onClick={() =>
                            goToCompanyDetails(
                              act.navigate.link,
                              encodeURIComponent(
                                row[act.navigate.variable[0]] || ""
                              ),
                              encodeURIComponent(
                                row[act.navigate.variable[1]] || ""
                              ),
                              encodeURIComponent(
                                row[act.navigate.variable[2]] || ""
                              )
                            )
                          }
                        >
                          {act.icon}
                        </button>
                      ))}
                    </td>
                  )}
                  {selectedCol?.map((col) => (
                    <td key={col.value}>{row[col.value] ?? ""}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>
    </div>
  );
};

export default TableWrapper;
