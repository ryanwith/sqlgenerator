export const formatJSON = (jsonData) => {

  if (Array.isArray(jsonData) && jsonData.every(Array.isArray)) {
    return jsonData;
  } else {
    const allKeys = new Set();
    jsonData.forEach(obj => Object.keys(obj).forEach(key => allKeys.add(key)));

    const keys = Array.from(allKeys);
    const dataArray = jsonData.map(obj => keys.map(key => obj.hasOwnProperty(key) ? obj[key] : null));

    const formattedData = [keys, ...dataArray];
    return formattedData;
  }
}