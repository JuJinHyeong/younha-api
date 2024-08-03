import * as fs from "fs";
import * as SqlMaker from "./SqlGenerator";
import * as path from "path";

const GenerateCreateAlbumsTableSql = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./data/albumData.json", "utf-8"));
    const columns = Object.keys(data[0]).filter((key) => key !== "id").map((key) => ({
      name: key,
      type: typeof data[0][key] === "number" ? "INTEGER" : "TEXT",
    }));
    const sql = SqlMaker.createTableSQL("Albums", columns);
    fs.writeFileSync(path.join(__dirname + "/../sql/createAlbumsTable.sql"), sql, {encoding: "utf-8", flag: "" });
  } catch (err) {
    console.error(err);
  }
};

const GenerateInsertAlbumsDataSql = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./data/albumData.json", "utf-8"));
    const sql = SqlMaker.insertIntoSQL("Albums", data);
    fs.writeFileSync(path.join(__dirname + "/../sql/insertAlbumsRows.sql"), sql, {encoding: "utf-8", flag: "" });
  } catch(err){
    console.error(err);
  }
}

const GenerateCreateSongsTableSql = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./data/songData.json", "utf-8"));
    const columns = Object.keys(data[0]).filter((key) => key !== "id").map((key) => ({
      name: key,
      type: typeof data[0][key] === "number" ? "INTEGER" : "TEXT",
    }));
    const sql = SqlMaker.createTableSQL("Songs", columns);
    fs.writeFileSync(path.join(__dirname + "/../sql/createSongsTable.sql"), sql, {encoding: "utf-8", flag: "" });
  } catch (err) {
    console.error(err);
  }
};

const GenerateInsertSongsDataSql = () => {
  try {
    const data: any[] = JSON.parse(fs.readFileSync("./data/songData.json", "utf-8"));
    let sql = "";
    while(data.length > 0){
      sql += SqlMaker.insertIntoSQL("Songs", data.splice(0, 20));
    }
    fs.writeFileSync(path.join(__dirname + "/../sql/insertSongsRows.sql"), sql, {encoding: "utf-8", flag: "" });
  } catch(err){
    console.error(err);
  }
}

GenerateCreateAlbumsTableSql();
GenerateInsertAlbumsDataSql();

GenerateCreateSongsTableSql();
GenerateInsertSongsDataSql();