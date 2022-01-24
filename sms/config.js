class Db{
    connect(){
        console.log("Connecting to database...");
        let con = "Connection to db"
        return con;
    }
}

let db = new Db();
console.log(db.connect())