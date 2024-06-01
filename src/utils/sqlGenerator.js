export const generateAllStatements = (data, table_name = 'table_name', column_type = 'TEXT', temp_table = true, batch_size) => {
  return [
    generateCreateTableSQL(data[0], table_name, column_type, temp_table),
    generateInsertStatements(data, table_name, batch_size)
  ].flat()
}

export const generateCreateTableSQL = (headers, table_name, column_type, temp_table) => {
  const columns = headers.map((header) => `${header} ${column_type}`).join(', ');
  return `CREATE ${temp_table = true ? "TEMP " : null}TABLE ${table_name} (${columns});`;
};

export const generateInsertStatements = (data, table_name, batch_size) => {
  const headers = data[0];
  const rows = data.slice(1);
  const insertIntoClause = generateInsertIntoClause(table_name);
  const insertStatements = rows.map((row, row_number) => {
    const values = row.map((value) => `'${value}'`).join(', ');
    // add the insertIntoClause on the first row if the batch size is not set
    if(batch_size === undefined && row_number === 0){
      return `${insertIntoClause}\n\t(${values})`
    } 
    // add the insertIntoClause on the first row of each batch if the batch size is set
    else if(row_number%batch_size === 0){
      return `${insertIntoClause}\n\t(${values})`
    } 
    // return just the values otherwise
    else {
      return `(${values})`
    }
  });
  return insertStatements.join('\n\t');
};

export const generateInsertIntoClause = (table_name) => {
  return `INSERT INTO ${table_name} VALUES`
}