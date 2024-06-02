export const generateAllStatements = (data, fields, tableName, columnType, tableType, batchSize) => {
  return [
    generateCreateTableSQL(fields, tableName, columnType, tableType),
    generateInsertStatements(data, fields, tableName, batchSize)
  ].flat()
}

const generateCreateTableSQL = (fields, tableName, columnType, tableType) => {
  const columns = fields
    .filter(field => field.include === true)
    .map((field) => `"${field.name}" ${field.type}`).join(', ');
  const createTableSQL = `CREATE ${tableType === 'TEMP' ? "TEMP " : ""}TABLE ${tableName} (${columns});`;
  return createTableSQL;
}

const generateInsertStatements = (data, fields, tableName, batchSize) => {
  const rows = data.slice(1);
  // removes fields where index != true
  console.log(fields)
  const includedFieldIndexes = fields.map((field, index) => field.include === true ? index : null).filter((index) => index !== null);
  console.log(includedFieldIndexes);
  const insertIntoClause = generateInsertIntoClause(tableName);
  const insertStatements = rows.map((row, rowNumber) => {
    return generateInsertLine(insertIntoClause, includedFieldIndexes, row, rows.length, rowNumber, batchSize)
  });
  return insertStatements.join('');
};

const generateInsertIntoClause = (tableName) => {
  return `\n\nINSERT INTO ${tableName} VALUES`
}

const generateInsertLine = (insertIntoClause, includedFieldIndexes, row, totalRows, rowNumber, batchSize) => {
  const beginningOfStatement = isFirstLineOfStatement(rowNumber, batchSize) ? insertIntoClause : '';
  const values = row
    // filter out rows that are not in the includedFieldIndexes and therefore include != true
    .filter((value, index) => includedFieldIndexes.includes(index) )
    .map((value) => `'${value}'`).join(', ');
  const endOfStatement = isEndOfStatement(totalRows, rowNumber, batchSize) ? ";" : ",";
  return beginningOfStatement + "\n\t(" + values + ")" + endOfStatement;
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