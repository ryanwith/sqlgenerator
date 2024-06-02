export const generateAllStatements = (data, tableName, columnType, tableType, batchSize) => {
  return [
    generateCreateTableSQL(data[0], tableName, columnType, tableType),
    generateInsertStatements(data, tableName, batchSize)
  ].flat()
}

export const generateCreateTableSQL = (headers, tableName, columnType, tableType) => {
  const columns = headers.map((header) => `${header} ${columnType}`).join(', ');
  return `CREATE ${tableType = 'TEMP' ? "TEMP " : null}TABLE ${tableName} (${columns});`;
};

export const generateInsertStatements = (data, tableName, batchSize) => {
  const headers = data[0];
  const rows = data.slice(1);
  console.log(rows.length);
  const insertIntoClause = generateInsertIntoClause(tableName);
  const insertStatements = rows.map((row, rowNumber) => {
    const values = row.map((value) => `'${value}'`).join(', ');

    return generateValuesStatement(insertIntoClause, values, rows.length, rowNumber, batchSize)
  });
  return insertStatements.join('');
};

export const generateInsertIntoClause = (tableName) => {
  return `INSERT INTO ${tableName} VALUES`
}

export const generateValuesStatement = (insertIntoClause, values, totalRows, rowNumber, batchSize) => {
  let statement = '';
  // add the insertIntoClause on the first row if the batch size is not set
  if(batchSize === null && rowNumber === 0){
    statement = `${insertIntoClause}\n\t(${values})`
  } 
  // add the insertIntoClause on the first row of each batch if the batch size is set
  else if(rowNumber%batchSize === 0){
    statement =  `${insertIntoClause}\n\t(${values})`
  } 
  // return just the values otherwise
  else {
    statement =  `\n\t(${values})`
  }
  
  if(rowNumber === totalRows - 1 || 
    (batchSize != null &&rowNumber % batchSize === batchSize - 1)
  ){    
    statement = statement + ';'

  }
  return statement;

}
