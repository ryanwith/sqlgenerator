export const formatJSON = (jsonData) => {
   // if it's not really json but just an array of arrays
  if (Array.isArray(jsonData) && jsonData.every(Array.isArray)) {
    return jsonData;
  // if it's not formatted as an array, try to make it an array
  } else if (!Array.isArray(jsonData)){
    jsonData = [jsonData]
  }
  const allKeys = new Set();
  jsonData.forEach(obj => Object.keys(obj).forEach(key => allKeys.add(key)));
  const keys = Array.from(allKeys);
  const dataArray = jsonData.map(obj => keys.map(key => obj.hasOwnProperty(key) ? obj[key] : null));
  const formattedData = [keys, ...dataArray];
  return formattedData;
}