import * as XLSX from 'xlsx';

export const generateCreateAndInsertStatements = (data, fields, tableName, columnType, tableType, batchSize) => {
  return [
    generateCreateTableSQL(fields, tableName, columnType, tableType),
    generateInsertStatements(data, fields, tableName, batchSize)
  ].flat()
}

export const generateClausesFromPaste = (jsonData, batchSize = null) => {
  const formattedItems = jsonData.flat();
  console.log(jsonData.flat())
  // console.log(jsonData)
  let chunkedDataPoints = []
  if(batchSize && batchSize > 0){
    chunkedDataPoints = [...breakIntoChunks(formattedItems, batchSize)]
  } else {
    chunkedDataPoints = [formattedItems]
  }
  return chunkedDataPoints;
};

export const generateInClause = (chunkedDataPoints, notIn = false, attributeName = 'column_name') => {
  const inStatement = notIn ? 'NOT IN (' : 'IN (';
  const statements = chunkedDataPoints.map((chunk, i) => {
    const whereOrOr = i===0 ? '(\n\t' : 'OR '; 
    const formattedData = `\n\t\t${chunk.join(',\n\t\t')}\n\t)\n`
    return `${whereOrOr}"${attributeName}" ${inStatement} ${formattedData}`
  })
  return `${statements.join('\n')})`;
}

function breakIntoChunks(allDataPoints, chunkSize) { // Changed from generator function
  const chunks = [];
  for (let i = 0; i < allDataPoints.length; i += chunkSize) {
    chunks.push(allDataPoints.slice(i, i + chunkSize));
  }
  return chunks;
}


const generateCreateTableSQL = (fields, tableName, columnType, tableType) => {
  const columns = fields
    .filter(field => field.include === true)
    .map((field) => `"${field.name}" ${field.type}`).join(', ');
  const createTableSQL = `CREATE ${tableType === 'TEMP' ? "TEMP " : ""}TABLE "${tableName}" (${columns});`;
  return createTableSQL;
}

const generateInsertStatements = (data, fields, tableName, batchSize) => {
  const rows = data.slice(1);
  // removes fields where index != true
  const includedFieldIndexes = fields.map((field, index) => field.include === true ? index : null).filter((index) => index !== null);
  const insertIntoClause = generateInsertIntoClause(tableName);
  const insertStatements = rows.map((row, rowNumber) => {
    return generateInsertLine(insertIntoClause, includedFieldIndexes, row, rows.length, rowNumber, batchSize)
  });
  return insertStatements.join('');
};

const generateInsertIntoClause = (tableName) => {
  return `\n\nINSERT INTO "${tableName}" VALUES`
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