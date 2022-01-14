const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'university',
  password: '73052',
  port: 5432,
});

// // const pool = new Pool({
// //     user: 'elahe',
// //     host: '128.195.53.180',
// //     database: 'caredex',
// //     password: '9dkm390fj',
// //     port: 5432,
// // });

// // const pool = new Pool({
// //   user: 'postgres',
// //   host: 'caredex-db.ics.uci.edu',
// //   database: 'caredex',
// //   password: 'cAredEXpOstgrespW',
// //   port: 5432,
// // });





// // const Pool = require('pg').Pool

// // const pool = new Pool({
// //   user: 'postgres',
// //   host: '128.195.53.180',
// //   database: 'caredex',
// //   password: 'cAredEXpOstgrespW',
// //   port: 5432,
// // });
// //
async function test(){
   
await pool.connect((err, client, release) => {
    
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  });
}


// DROP FUNCTION


function dropTable(tableName) {
        // value.date_created = moment.utc().format(dateFormat);
        // let tableName=tableName;
        
         var sqlQry =
            "DROP TABLE IF EXISTS " + tableName + "; ";
        //DB Connection
        console.log(sqlQry);
        pool.query(sqlQry, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Table is successfully dropped!');
    
        });   
     
}

// DROP FUNCTION



// DELETE ROW FUNCTION


function deleteRowTable(tableName, valueId) {
    // value.date_created = moment.utc().format(dateFormat);
    // let tableName=tableName;
    
     var sqlQry =
       // "DELETE FROM " + tableName + " WHERE "+ conditionVariable+" = "+valueId+"; ";
       "DELETE FROM " + tableName + " WHERE "+ "people_id"+" = "+valueId+"; ";
    //DB Connection
    console.log(sqlQry);
    pool.query(sqlQry, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Row Table is successfully deleted!');

    });   
 
}

// DELETE ROW FUNCTION


//UPDATE

function dataDelete(tableName, whereObj = {}, condition = "AND") {
    delete whereObj["table_name"];
    const wheryQry = Object.keys(whereObj)
      .map(function (key, index) {
        var value =
          typeof whereObj[key] === "string"
            ? `'${whereObj[key]}'`
            : `${whereObj[key]}`;
        return `${key} = ${value}`;
      })
      .join(" " + condition + " ");

    var sqlQry = "UPDATE " + tableName + " SET is_deleted = 1";
    if (Object.keys(whereObj).length > 0) {
      sqlQry += " WHERE " + wheryQry;
    }
    return new Promise((resolve, reject) => {
      this.runQuery(sqlQry)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });


    // OR USE THE FOLLOWING CODE FOR DB CONNECTION


     //DB Connection
     console.log(sqlQry);
     pool.query(sqlQry, (err, res) => {
       if (err) {
         console.error(err);
         return;
       }
       console.log('Table is successfully populated!');
 
       // console.log(err, res);
 
 
     });
 
     // DB Connection

    // OR USE THE FOLLOWING CODE FOR DB CONNECTION
  }
//UPDATE



//UPDATE DATA ROW

function dataUpdate(tableName, dataObj, whereObj = {}, condition = "AND") {
    delete dataObj["table_name"];
  //  dataObj.date_modified = moment.utc().format(dateFormat);

    const fieldsName = Object.keys(dataObj)
      .map(function (key, index) {
        var value =
          typeof dataObj[key] === "string"
            ? `'${dataObj[key]}'`
            : `${dataObj[key]}`;
        return `${key} = ${value}`;
      })
      .join(",");

    const wheryQry = Object.keys(whereObj)
      .map(function (key, index) {
        var value =
          typeof whereObj[key] === "string"
            ? `'${whereObj[key]}'`
            : `${whereObj[key]}`;
        return `${key} = ${value}`;
      })
      .join(" " + condition + " ");

    var sqlQry = "UPDATE " + tableName + " SET " + fieldsName;
    if (Object.keys(whereObj).length > 0) {
      sqlQry += " WHERE " + wheryQry;
    }

    return new Promise((resolve, reject) => {
      this.runQuery(sqlQry)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
//UPDATE DATA ROW


//ALTER


function alterTable(tableName, dataObj, whereObj) {
    delete dataObj["table_name"];
    delete dataObj["alter_type"];
  //  dataObj.date_modified = moment.utc().format(dateFormat);

    const fieldsName = Object.keys(dataObj)
      .map(function (key, index) {
        var value =
          typeof dataObj[key] === "string"
            ? `${dataObj[key]}`
            : `${dataObj[key]}`;
        return ` ${value}`;
      })
      .join("");

    
     //JSON Remove trailiing comma from last object
    // fieldsName.replaceAll(',', '');
    // fieldsName.replace('/,/g','');
    if(whereObj == "add"){
     var sqlQry = "ALTER TABLE " + tableName + " ADD COLUMN " + fieldsName;
    }
    else{
        var sqlQry = "ALTER TABLE " + tableName + " DROP COLUMN " + fieldsName;

    }

    return new Promise((resolve, reject) => {
      this.runQuery(sqlQry)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
//UPDATE DATA ROW

//ALTER

//JSON FILE

jsonfile = [

    // {"drop": [
    //     {"table_name":"ITTechnician"},
    //     {"table_name":"ITTechnician2"}
    //             ]
    //   },

    //   {"delete": [
    //     {"table_name":"Staff", "people_id": 14},
    //    // {"table_name":"Staff", "id": 15}
    //             ]
    //   },

    {"alter": [
       // {"table_name":"Camera", "alter_type": "add", "column_name": "resolution", "column_type": "text"},
        {"table_name":"Camera", "alter_type": "delete", "column_name": "resolution"}
                ]
      }
]

//JSON FILE

//PARSER

jsonfile.forEach((obj, key) => {

    //DROPPING TABLES
  
 if (obj.drop) {
      
        let metadata = obj.drop;
        metadata.forEach((mtd, key) => {
  
          if (mtd.table_name) { //if it's a table
            let table_name = mtd.table_name;
    
                dropTable(table_name);

          }
    
        
        })
    
      }
    //DROPPING TABLES

    else if (obj.delete) {
      
        let metadata = obj.delete;
        metadata.forEach((mtd, key) => {
  
          if (mtd.table_name) { //if it's a table
            let table_name = mtd.table_name;
            let idValue = mtd.people_id;
           // deleteRowTable(table_name, idValue);
            //dataDelete(table_name,mtd);
            dataUpdate(table_name,mtd, mtd);

          }
    
        
        })

    
    
      }

      else if (obj.alter) {
      
        let metadata = obj.alter;
        metadata.forEach((mtd, key) => {
  
          if (mtd.table_name) { //if it's a table
            let table_name = mtd.table_name;
            //let idValue = mtd.people_id;
           // deleteRowTable(table_name, idValue);
            //dataDelete(table_name,mtd);
            let typeAlter=mtd.alter_type;
            alterTable(table_name,mtd,typeAlter);

          }
    
        
        })

    
    
      }
    

    
  
       
      


})