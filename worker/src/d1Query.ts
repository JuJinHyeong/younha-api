export const Select = async (tableName: string, url: URL, availableParams: string[], env: Env) => {
    const queryParams = url.searchParams;
    let availableQueryParmas = [...availableParams];
    availableQueryParmas.push("limit");
    availableQueryParmas.push("offset");
    let sql = `SELECT * FROM ${tableName}`;
    let whereParams: {key: string, value:string}[] = [];
    let limit = 0, offset = 0;

    // set sql, params
    for (const [key, value] of queryParams) {
        if(!availableQueryParmas.includes(key)) {
            return new Response("Invalid parameter", { status: 400 });
        }
        console.log(value);
        if(key === "limit"){
            limit = parseInt(value);
            continue;
        }
        else if(key === "offset"){
            offset = parseInt(value);
            continue;
        }
        whereParams.push({key, value});
    }
    sql += whereParams.length > 0 ? ` WHERE ${whereParams.map((a) => `${a.key} = ?`).join(" AND ")}` : "";
    sql += limit > 0 ? ` LIMIT ${limit}` : "";
    sql += offset > 0 ? ` OFFSET ${offset}` : "";
    
    // send query to db
    const prepare = env.DB.prepare(sql);
    if(whereParams.length > 0) {
        prepare.bind(whereParams.map((param) => param.value));
    }
    const { results } = await prepare.all();
    return results;
}