export const fetchNames = async () => {
  const SHEET_ID = "1AflAlFpkun7upi9N9ZJBEQ8_dZAKiZ-qFwivKH9Yq0M";
  const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const RANGE = "Data!A1:E100";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  const res = await fetch(url);
  const json = await res.json();
  return json.values;
};
