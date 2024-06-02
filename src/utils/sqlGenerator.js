export const generateAllStatements = (data, tableName, columnType, tableType, batchSize) => {
  return [
    generateCreateTableSQL(data[0], tableName, columnType, tableType),
    generateInsertStatements(data, tableName, batchSize)
  ].flat()
}

const generateCreateTableSQL = (headers, tableName, columnType, tableType) => {
  const columns = headers.map((header) => `${header} ${columnType}`).join(', ');
  const createTableSQL = `CREATE ${tableType === 'TEMP' ? "TEMP " : ""}TABLE ${tableName} (${columns});`;
  return createTableSQL;
}

const generateInsertStatements = (data, tableName, batchSize) => {
  const rows = data.slice(1);
  const insertIntoClause = generateInsertIntoClause(tableName);
  const insertStatements = rows.map((row, rowNumber) => {
    return generateInsertLine(insertIntoClause, row, rows.length, rowNumber, batchSize)
  });
  return insertStatements.join('');
};

const generateInsertIntoClause = (tableName) => {
  return `\n\nINSERT INTO ${tableName} VALUES`
}

const generateInsertLine = (insertIntoClause, row, totalRows, rowNumber, batchSize) => {
  const beginningOfStatement = isFirstLineOfStatement(rowNumber, batchSize) ? insertIntoClause : '';
  const values = "\n\t(" + row.map((value) => `'${value}'`).join(', ') + ")";
  const endOfStatement = isEndOfStatement(totalRows, rowNumber, batchSize) ? ";" : ",";
  return beginningOfStatement + values + endOfStatement;
}


// console.log(commaOrSemicolon(totalRows, rowNumber, batchSize))
// console.log(isEndOfStatement(totalRows, rowNumber, batchSize) ? "slash n" : "")
// console.log(`end of statement: ${endOfStatement}`)
const isEndOfStatement = (totalRows, rowNumber, batchSize) => {
  // last row or end of batch
    if(
      // last row 
      rowNumber === totalRows - 1
      // valid batch size and end of batch
      || ( validBatchSize(batchSize) && rowNumber % batchSize === batchSize - 1)
    ){
      return true;
    } else {
      return false;
    }
  }

// HELPERS

const isFirstLineOfStatement = (rowNumber, batchSize) => {
  // if it is the first row
  if(rowNumber === 0){
    return true;
  } 
  // if it is a new barch
  else if (validBatchSize(batchSize) && rowNumber % batchSize === 0) 
    return true;
  else {
    return false;
  }
}

const validBatchSize = (batchSize) => {
  if(Number.isInteger(batchSize) !== true && batchSize > 0){
    return true;
  } else {
    return false;
  }
}