import getConfig from "./env.js";
import { createConnection } from "mysql2";

class Database {
  #config = getConfig();
  #conn;

  constructor() {
    console.log("Connecting");

    this.#conn = this.#connect();
    console.log(this.#conn.query("select 1"));
  }

  #connect() {
    try {
      const con = createConnection({
        host: this.#config.database.host,
        port: this.#config.database.port,
        user: this.#config.database.user,
        password: this.#config.database.pass,
        database: this.#config.database.name,
      });

      con.ping((err) => {
        if (err) throw err;
      });

      return con;
    } catch (error) {
      console.error("Failed connecting database, " + error);
    }
  }

  query(query) {
    this.#conn.query(query, (err, results, _fields) => {
      if (err) return false;
      if (results.length != 0) return results;
      return false;
    });
  }
}

const db = new Database();
console.log(db.query("show databases"));
