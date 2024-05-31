export const generateCreateTableSQL = (headers) => {
  const columns = headers.map((header) => `${header} TEXT`).join(', ');
  return `CREATE TEMP TABLE temp_table (${columns});`;
};

export const generateInsertStatements = (data) => {
  const headers = data[0];
  const rows = data.slice(1);
  const insertStatements = rows.map((row) => {
    const values = row.map((value) => `'${value}'`).join(', ');
    return `INSERT INTO temp_table (${headers.join(', ')}) VALUES (${values});`;
  });
  return insertStatements.join('\n');
};
