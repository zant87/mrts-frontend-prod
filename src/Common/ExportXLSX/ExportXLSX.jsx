import React from "react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { MDBBtn, MDBIcon } from "mdbreact";

export const ExportXLSX = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <MDBBtn
      size="sm"
      color="deep-orange"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      <MDBIcon icon="file-export" className="mr-1" /> Экспорт в Excel
    </MDBBtn>
  );
};
