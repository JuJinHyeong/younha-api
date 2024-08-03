type Column = {
  name: string;
  type: string;
};

type Data = {
  [key: string]: string | number;
};

// CREATE TABLE 문 생성
export function createTableSQL(tableName: string, columns: Column[]): string {
  const columnsDef = columns.map((col) => `${col.name} ${col.type}`).join(", ");
  return `CREATE TABLE ${tableName} (${columnsDef});`;
}

// INSERT INTO 문 생성
export function insertIntoSQL(tableName: string, data: Data): string {
  const columns = Object.keys(data).join(", ");
  const values = Object.values(data)
    .map((value) => (typeof value === "string" ? `'${value}'` : value))
    .join(", ");

  return `INSERT INTO ${tableName} (${columns}) VALUES (${values});`;
}

// SELECT 문 생성
export function selectSQL(
  tableName: string,
  columns: string[] = ["*"],
  where: string = ""
): string {
  const columnsList = columns.join(", ");
  const whereClause = where ? ` WHERE ${where}` : "";

  return `SELECT ${columnsList} FROM ${tableName}${whereClause};`;
}

// UPDATE 문 생성
export function updateSQL(
  tableName: string,
  data: Data,
  where: string
): string {
  const setClause = Object.entries(data)
    .map(
      ([key, value]) =>
        `${key} = ${typeof value === "string" ? `'${value}'` : value}`
    )
    .join(", ");

  return `UPDATE ${tableName} SET ${setClause} WHERE ${where};`;
}

// DELETE 문 생성
export function deleteSQL(tableName: string, where: string): string {
  return `DELETE FROM ${tableName} WHERE ${where};`;
}
