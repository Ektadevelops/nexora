import ExcelJS from "exceljs";
import { parse } from "csv-parse/sync";
import fs from "fs";

export const parseExcelFile = async (filePath) => {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.worksheets[0];

  const rows = [];

  const headers = worksheet.getRow(1).values.slice(1);

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      return;
    }

    const rowData = {};

    headers.forEach((header, index) => {
      rowData[header] = row.getCell(index + 1).value;
    });

    rows.push(rowData);
  });

  return {
    headers,
    rows,
  };
};

export const parseCsvFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  const headers = records.length > 0 ? Object.keys(records[0]) : [];

  return {
    headers,
    rows: records,
  };
};
