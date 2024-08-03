import * as fs from "fs";
import * as SqlMaker from "./SqlGenerator";

const GenerateCreateAlbumTableSql = () => {
  try {
    const data = JSON.parse(fs.readFileSync("./data/albumData.json", "utf-8"));
    const columns = Object.keys(data[0]).map((key) => ({
      name: key,
      type: typeof data[0][key] === "number" ? "INTEGER" : "TEXT",
    }));
    console.log(columns);
    const sql = SqlMaker.createTableSQL("Album", columns);
    console.log(sql);
  } catch (err) {
    console.error(err);
  }
};

GenerateCreateAlbumTableSql();
