import Papa from "papaparse";

const convertJsonToCsv = (jsonData) => {
  const csv = Papa.unparse(jsonData);
  //   console.log(csv);
  return csv;
};

export const downloadCSV = (jsonData, fileName) => {
  //   console.log(jsonData);
  const csv = convertJsonToCsv(jsonData);
  //   console.log(csv);
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};
