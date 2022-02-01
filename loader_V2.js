const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'elahe',
//     host: ' ',
//     database: ' ',
//     password: ' ',
//     port: 5432,
// });

const pool = new Pool({
  user: 'postgres',
  host: ' ',
  database: ' ',
  password: ' ',
  port: 5432,
});


// const Pool = require('pg').Pool

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'tippersdb_env',
//   password: '73052',
//   port: 5432,
// });
//

// const Pool = require('pg').Pool

// const pool = new Pool({
//   user: 'postgres',
//   host: '',
//   database: ' ',
//   password: ' ',
//   port: 5432,
// });
//
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

// UPDATE functions




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
    // return new Promise((resolve, reject) => {
    //   this.runQuery(sqlQry)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });


    // OR USE THE FOLLOWING CODE FOR DB CONNECTION


     //DB Connection
     console.log(sqlQry);
     pool.query(sqlQry, (err, res) => {
       if (err) {
         console.error(err);
         return;
       }
       console.log('Table is successfully updated!');
 
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

    // return new Promise((resolve, reject) => {
    //   this.runQuery(sqlQry)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });


    // OR USE THE FOLLOWING CODE FOR DB CONNECTION


     //DB Connection
     console.log(sqlQry);
     pool.query(sqlQry, (err, res) => {
       if (err) {
         console.error(err);
         return;
       }
       console.log('Row data is successfully updated!');
 
       // console.log(err, res);
 
 
     });
 
     // DB Connection

    // OR USE THE FOLLOWING CODE FOR DB CONNECTION


    
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
    else if(whereObj == "drop"){
        var sqlQry = "ALTER TABLE " + tableName + " DROP COLUMN " + fieldsName;

    }
    else if(whereObj == "rename_column"){ //rename column
      var a = fieldsName.split(' ');
      var first = a.slice(0, 1).join(' ');
      var second =  a.slice(1).join(' TO ');
      var sqlQry = "ALTER TABLE " + tableName + " RENAME COLUMN " + second; 
      console.log(sqlQry);
    }
    else if(whereObj == "rename_table"){ //rename table name 
      //ALTER TABLE IF EXISTS table_name RENAME TO new_table_name;
      var sqlQry = "ALTER TABLE IF EXISTS " + tableName + " RENAME TO " + fieldsName; 
      console.log(sqlQry);
    }

    // }


    // return new Promise((resolve, reject) => {
    //   this.runQuery(sqlQry)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });

      // OR USE THE FOLLOWING CODE FOR DB CONNECTION


     //DB Connection
     console.log(sqlQry);
     pool.query(sqlQry, (err, res) => {
       if (err) {
         console.error(err);
         return;
       }
       console.log('Table is successfully updated!');
 
       // console.log(err, res);
 
 
     });
 
     // DB Connection

    // OR USE THE FOLLOWING CODE FOR DB CONNECTION
  }
//UPDATE DATA ROW

//ALTER







//UPDATE functions


jsonfile = [{
  "system":
  {
    "functions": [
      {
        "function_name": "populate_geo",
        "function_body": "TBD"
      }
    ]
  }
}
  ,
// {
//   "metadata": [ //start of table description

//   //   {
//   //     "table_name":"AnotherCameraSensor", 
//   //     "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//   //     {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//   //  },
   
//     {
//       "table_name": "Administrator",
//       "columns": [{ "column_name": "user_id", "column_type": "integer", "primary_key": true },
//       { "column_name": "user_name", "column_type": "text", "unique": true, "not_null": true },
//       { "column_name": "parent_type_name", "column_type": "text" },
//       { "column_name": "preferred_location", "column_type": "text", "foreignkey": { "foreign_table": "Space", "foreign_column": "space_name" } },
//       { "column_name": "date_of_birth", "column_type": "date" },
//       { "column_name": "address", "column_type": "text" }
//       ]
//     },
     
//     {
//       "table_name":"sensor_types", 
//       "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true},
//       {"column_name": "parent_type_id", "column_type":"integer", "unique": true, "not_null": true},
//       {"column_name": "output_type_id", "column_type":"integer"}]
//     },

//     {
//       "table_name":"space_types", 
//       "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true},
//       {"column_name": "parent_type_id", "column_type":"integer", "unique": true, "not_null": true}]
//     },

//     {
//       "table_name":"CCDSensor", 
//       "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//        "table_name":"AnotherCameraSensor", 
//        "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//        {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"observation_types", 
//       "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"event_types", 
//       "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true},
//       {"column_name": "parent_type_id", "column_type":"integer", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"Meeting", 
//       "columns": [{"column_name": "event_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "event_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//         "table_name":"people_types", 
//         "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true},
//         {"column_name": "parent_type_id", "column_type":"integer", "unique": true, "not_null": true}]
//       },

//       {
//         "table_name":"Staff", 
//         "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//       },
//       {
//         "table_name":"GraduateStudent", 
//         "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//       },
//       {
//       "table_name":"Faculty", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//       "table_name":"Professor", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//       "table_name":"Technician", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//       "table_name":"ITTechnician", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//       "table_name":"ITTechnician2", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//       {
//       "table_name":"ITDirector", 
//       "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "people_name", "column_type":"text", "unique": true, "not_null": true}]
//     },


//     {
//      "table_name":"Camera", 
//      "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//      {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
   
//     {
//       "table_name":"WiFiAP", 
//       "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true},
//       {"column_name": "associated_location", "column_type":"text"}]
//     },
//     {
//       "table_name":"TempSensor", 
//       "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"Example", 
//       "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"Occupancy", 
//       "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "sensor_name", "column_type":"text", "unique": true, "not_null": true}]
//     },
//     {
//       "table_name":"other_types", 
//       "columns": [{"column_name": "type_id", "column_type":"integer", "primary_key":true},
//       {"column_name": "type_name", "column_type":"text", "unique": true, "not_null": true},
//       {"column_name": "parent_type_id", "column_type":"integer", "unique": true, "not_null": true}]
//     },
//       {
//         "table_name":"FireHydrants", 
//         "columns": [{"column_name": "other_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "other_name", "column_type":"text", "unique": true, "not_null": true}]
//       },
       
//         {
//           "table_name":"SensorSpace", 
//           "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//           {"column_name": "space_id", "column_type":"integer", "primary_key":true}] 
//         },
//         {
//           "table_name":"IsIn", 
//           "columns": [{"column_name": "sensor_id", "column_type":"integer", "primary_key":true},
//           {"column_name": "space_id", "column_type":"integer", "primary_key":true}]
//         },
//         {
//           "table_name":"HeldIn", 
//           "columns": [{"column_name": "space_id", "column_type":"integer", "primary_key":true},
//           {"column_name": "event_id", "column_type":"integer", "primary_key":true}]
//         },
//         {
//         "table_name":"Supervises", 
//         "columns": [{"column_name": "people_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "people_id2", "column_type":"integer", "primary_key":true}]
//       },
//       {
//         "table_name":"imageUrls", 
//         "columns": [{"column_name": "space_id", "column_type":"integer", "primary_key":true},
//         {"column_name": "image_url", "column_type":"text", "primary_key":true}]
//       //}]
//       },


//   ] //end of table description
// },

,

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
        //{"table_name":"Camera", "alter_type": "delete", "column_name": "resolution"},
       // {"table_name":"students", "alter_type":"rename_column", "old_column":"email","new_column": "emails"},
            {"table_name":"students", "alter_type":"rename_table","new_name": "student"}
                ]
      },

{"data": [
  {"observation_types": [{"type_id":102,"type_name":"Text3"}]},

  // {"event_types": [{"type_id":1,"type_name":"Meeting","parent_type_id":9}]},

  // {"people_types": [{"type_id":1,"type_name":"Staff","parent_type_id":3},

  // {"type_id":2,"type_name":"Graduate Student","parent_type_id":1},
  // {"type_id":3,"type_name":"Faculty","parent_type_id":1},
  // {"type_id":4,"type_name":"Professor","parent_type_id":3},
  // {"type_id":5,"type_name":"Technician","parent_type_id":1},
  // {"type_id":6,"type_name":"IT Technician","parent_type_id":1},
  // {"type_id":8,"type_name":"IT Technician 2","parent_type_id":1},
  // {"type_id":12,"type_name":"IT Director","parent_type_id":1}]},

  // {"sensor_types": [{"type_id":1,"type_name":"Camera","parent_type_id":2,"output_type_id":null},
  // {"type_id":2,"type_name":"CCD Sensor","parent_type_id":1,"output_type_id":null},
  // {"type_id":3,"type_name":"Another Camera sensor","parent_type_id":1,"output_type_id":null},
  // {"type_id":4,"type_name":"WiFi AP","parent_type_id":2,"output_type_id":null},
  // {"type_id":5,"type_name":"TempSensor","parent_type_id":4,"output_type_id":null},
  // {"type_id":6,"type_name":"Example","parent_type_id":1,"output_type_id":null},
  // {"type_id":10,"type_name":"Occupancy","parent_type_id":6,"output_type_id":null}]},

  // {"other_types": [{"type_id":1,"type_name":"FireHydrants","parent_type_id":1}]},

  // {"space_types": [{"type_id":1, "type_name":"Building", "parent_type_id":1},
  // {"type_id":2, "type_name":"Floor", "parent_type_id":2},
  // {"type_id":3, "type_name":"Room", "parent_type_id":3},
  // {"type_id":4, "type_name":"Region", "parent_type_id":4},
  // {"type_id":5, "type_name":"Coverage", "parent_type_id":1},
  // {"type_id":1,"type_name":"Campus","parent_type_id":2},
  // {"type_id":4,"type_name":"Building","parent_type_id":1},
  // {"type_id":5,"type_name":"City","parent_type_id":3},
  // {"type_id":6,"type_name":"Street","parent_type_id":1},
  // {"type_id":7,"type_name":"Floor","parent_type_id":4},
  // {"type_id":8,"type_name":"Room","parent_type_id":7},
  // {"type_id":11,"type_name":"Office","parent_type_id":8}]},

  // {"Camera": [{"sensor_id":6, "sensor_name": "AP0124"}]},

  // {"CCDSensor": [{"sensor_id":5, "sensor_name": "dcdd"}]},

  // {"WiFiAP": [{"sensor_id":1, "sensor_name": "AP1245", "associated_location":"AP2365"},
  // {"sensor_id":3, "sensor_name": "AP2363", "associated_location":"AP2363"}]},

  // {"SensorSpace": [{"sensor_id":6, "space_id":10}]},

  // {"space":[
  //   {"space_id":2, "space_name":"Earth", "parent_space_id":2, "coordinate_system_name":"GPS", "space_type_id":6},
  //   {"space_id":6, "space_name":"test1", "parent_space_id":1, "coordinate_system_name":"gps", "space_type_id":4}]}





]}
// {
//   "data": [

//     {
//       "space": [
//         { "space_id": 1, "space_name": "Earth", "coordinate_system_name": "GPS" },
//         {
//           "space_id": 2, "space_name": "UCI", "parent_space_id": 1, "coordinate_system_name": "GPS", "space_shape": "Polygon", "vertices": [
//             {
//               "latitude": 33.6315566,
//               "longitude": -117.8418829
//             },
//             {
//               "latitude": 33.6320354,
//               "longitude": -117.8438398
//             }
//             // },
//             // {
//             //     "latitude": 33.6329287,
//             //     "longitude": -117.8470155
//             // },
//             // {
//             //     "latitude": 33.6337147,
//             //     "longitude": -117.8494617
//             // },
//             // {
//             //     "latitude": 33.6344437,
//             //     "longitude": -117.8508779
//             // },
//             // {
//             //     "latitude": 33.6358729,
//             //     "longitude": -117.8527834
//             // },
//             // {
//             //     "latitude": 33.6380381,
//             //     "longitude": -117.8551008
//             // },
//             // {
//             //     "latitude": 33.6393958,
//             //     "longitude": -117.8567316
//             // },
//             // {
//             //     "latitude": 33.6400032,
//             //     "longitude": -117.8572294
//             // },
//             // {
//             //     "latitude": 33.6414895,
//             //     "longitude": -117.8575727
//             // },
//             // {
//             //     "latitude": 33.6433759,
//             //     "longitude": -117.8584739
//             // },
//             // {
//             //     "latitude": 33.6450765,
//             //     "longitude": -117.8591005
//             // },
//             // {
//             //     "latitude": 33.646777,
//             //     "longitude": -117.8595297
//             // },
//             // {
//             //     "latitude": 33.6475416,
//             //     "longitude": -117.859461
//             // },
//             // {
//             //     "latitude": 33.6482775,
//             //     "longitude": -117.858534
//             // },
//             // {
//             //     "latitude": 33.6490635,
//             //     "longitude": -117.8581564
//             // },
//             // {
//             //     "latitude": 33.650078,
//             //     "longitude": -117.8582765
//             // },
//             // {
//             //     "latitude": 33.6505425,
//             //     "longitude": -117.8535215
//             // },
//             // {
//             //     "latitude": 33.6505899,
//             //     "longitude": -117.8532664
//             // },
//             // {
//             //     "latitude": 33.6510212,
//             //     "longitude": -117.8509466
//             // },
//             // {
//             //     "latitude": 33.6517571,
//             //     "longitude": -117.848818
//             // },
//             // {
//             //     "latitude": 33.6522136,
//             //     "longitude": -117.8480263
//             // },
//             // {
//             //     "latitude": 33.6527073,
//             //     "longitude": -117.84717
//             // },
//             // {
//             //     "latitude": 33.654776,
//             //     "longitude": -117.8446845
//             // },
//             // {
//             //     "latitude": 33.6542076,
//             //     "longitude": -117.843896
//             // },
//             // {
//             //     "latitude": 33.653625,
//             //     "longitude": -117.8431359
//             // },
//             // {
//             //     "latitude": 33.6531737,
//             //     "longitude": -117.8427271
//             // },
//             // {
//             //     "latitude": 33.6529242,
//             //     "longitude": -117.8425589
//             // },
//             // {
//             //     "latitude": 33.6525703,
//             //     "longitude": -117.8423712
//             // },
//             // {
//             //     "latitude": 33.652067,
//             //     "longitude": -117.8422104
//             // },
//             // {
//             //     "latitude": 33.6516247,
//             //     "longitude": -117.8421232
//             // },
//             // {
//             //     "latitude": 33.6508109,
//             //     "longitude": -117.8418239
//             // },
//             // {
//             //     "latitude": 33.6503678,
//             //     "longitude": -117.8415291
//             // },
//             // {
//             //     "latitude": 33.6499709,
//             //     "longitude": -117.8411619
//             // },
//             // {
//             //     "latitude": 33.6492921,
//             //     "longitude": -117.8401663
//             // },
//             // {
//             //     "latitude": 33.6483275,
//             //     "longitude": -117.8386213
//             // },
//             // {
//             //     "latitude": 33.6481324,
//             //     "longitude": -117.838135
//             // },
//             // {
//             //     "latitude": 33.6479488,
//             //     "longitude": -117.8376772
//             // },
//             // {
//             //     "latitude": 33.6477399,
//             //     "longitude": -117.8364888
//             // },
//             // {
//             //     "latitude": 33.6477089,
//             //     "longitude": -117.8360873
//             // },
//             // {
//             //     "latitude": 33.6476992,
//             //     "longitude": -117.8356792
//             // },
//             // {
//             //     "latitude": 33.6477018,
//             //     "longitude": -117.8355384
//             // },
//             // {
//             //     "latitude": 33.6477008,
//             //     "longitude": -117.8354903
//             // },
//             // {
//             //     "latitude": 33.6477059,
//             //     "longitude": -117.8348705
//             // },
//             // {
//             //     "latitude": 33.649878,
//             //     "longitude": -117.8246137
//             // },
//             // {
//             //     "latitude": 33.6463769,
//             //     "longitude": -117.8225538
//             // },
//             // {
//             //     "latitude": 33.6447907,
//             //     "longitude": -117.8220217
//             // },
//             // {
//             //     "latitude": 33.6430043,
//             //     "longitude": -117.8219358
//             // },
//             // {
//             //     "latitude": 33.6418468,
//             //     "longitude": -117.8221247
//             // },
//             // {
//             //     "latitude": 33.6404176,
//             //     "longitude": -117.8226825
//             // },
//             // {
//             //     "latitude": 33.6356299,
//             //     "longitude": -117.8258583
//             // },
//             // {
//             //     "latitude": 33.6354747,
//             //     "longitude": -117.8260065
//             // },
//             // {
//             //     "latitude": 33.6348224,
//             //     "longitude": -117.8266737
//             // },
//             // {
//             //     "latitude": 33.6343222,
//             //     "longitude": -117.8277036
//             // },
//             // {
//             //     "latitude": 33.6340149,
//             //     "longitude": -117.8288624
//             // },
//             // {
//             //     "latitude": 33.6337616,
//             //     "longitude": -117.8338888
//             // },
//             // {
//             //     "latitude": 33.633729,
//             //     "longitude": -117.8345873
//             // },
//             // {
//             //     "latitude": 33.6335792,
//             //     "longitude": -117.8354815
//             // },
//             // {
//             //     "latitude": 33.6333527,
//             //     "longitude": -117.8364001
//             // },
//             // {
//             //     "latitude": 33.6327744,
//             //     "longitude": -117.8384369
//             // },
//             // {
//             //     "latitude": 33.6321837,
//             //     "longitude": -117.840327
//             // },
//             // {
//             //     "latitude": 33.6315566,
//             //     "longitude": -117.8418829
//             // }
//           ]
//         }
//       ]
//     }
//   ]
// }
] // end of the JSON file

//PARSER
jsonfile.forEach((obj, key) => {
  if (obj.system) {

  }
  else if (obj.metadata) { //Metadata START
    let metadata = obj.metadata;
    metadata.forEach((mtd, key) => {
      if (mtd.table_name) { //if it's a table
        let table_name = mtd.table_name;
        let columns = mtd.columns;


        // not hardcoded--integration--ingestor
       let query2;

        var result = columns.filter(x => x.column_name == 'sensor_id');
        if(result){console.log(result);
       
        if(table_name == "camera"){ // camera_data table
          table_name1=table_name+"_data";
          query2 = "CREATE TABLE IF NOT EXISTS " + table_name1 + " ("+"id" +" "+"integer"+", "+"data"+" "+"bytea"+","+"timestamp"+" text"+", "+"path"+" text" +")"+";";
          
      
       } // camera_data table
       else{

         table_name1=table_name+"_data";
         query2 = "CREATE TABLE IF NOT EXISTS " + table_name1 + " ("+"id" +" "+"integer"+", "+"data"+" "+"text"+","+"timestamp"+" text"+", "+"path"+" text" +")"+";";

      }

      console.log(query2);
      console.log("==================================")
    //pool.query(query); //LOOK INTO This!!!

    //DB Connection
     pool.query(query2, (err, res) => {
     if (err) {
       console.error(err);
       return;
     }
     console.log('Integration Table is successfully created');

     // console.log(err, res);

   });

   // DB Connection
  }
  // not hardcoded--integration--ingestor

      


        // create the table for integrating the loader and ingestor


        //start query string
        let query = "CREATE TABLE IF NOT EXISTS " + table_name + " (";
        let primary_keys = [];
        let unique = [];
        let foreing_keys = [];
        let fk;
        let fkValue = false;
        //JSONObject jsonObject = new JSONObject();
        // `${a}.tet khkj`

        //ADD LAST_SEEN STATUS SAMPLING_PERIOD in the sensors tables for integration--loader-ingestor


       // for(x in sensor_tables){
      
         // if((table_name == sensor_tables[x])){
           if(result){

            query= query+ " last_seen" +" "+"text"+", "+"status"+" "+"integer"+","+"sampling_period"+" integer, ";
  
  
            
  
          console.log(query);
          console.log("==================================")
        //pool.query(query); //LOOK INTO This!!!
           }
        //
        
        //}
  
       // }
        //ADD LAST_SEEN STATUS SAMPLING_PERIOD in the sensors tables for integration--loader-ingestor

        columns.forEach((col, key) => { //remember to delete last comma
          let column_name = col.column_name;
          let column_type = col.column_type;
          let not_null = false;
          if (col.not_null) not_null = true;
          if (col.primary_key) primary_keys.push(column_name);
          //  if (col.foreignkey) foreing_keys.push(column_name);
          if (col.unique) unique.push(column_name);
          query = query + column_name + " " + column_type;
          if (not_null) query = query + " NOT NULL, ";
          else { query = query + ", " }
          //FK

          let p = col.foreignkey;

          for (var key in p) {
            if (p.hasOwnProperty(key)) {
              //console.log(key + " -> " + p[key]);
              foreing_keys.push(p[key]);
            }
          }

          if (col.foreignkey) {

            fk = "FOREIGN KEY" + "(" + column_name + ")" + " " + "REFERENCES" + " " + foreing_keys[0] + "(" + foreing_keys[1] + ")";
            fkValue = true;
          }
          //FK
        })
        query = query + "PRIMARY KEY (";
        primary_keys.forEach((col, key) => { //remember to delete last comma
          query = query + col + ",";
        })
        query = query + ")"
        if (unique.length > 0) {
          query = query + ", UNIQUE(";
          unique.forEach((col, key) => { //remember to delete last comma
            query = query + col + ",";
          })

          //loop through unique
        }
        query = query + ")"
        //JSON Remove trailiing comma from last object
        let regex = /\,(?!\s*?[\{\[\"\'\w])/g;

        // javascript
        //let input; // this is the initial string of data
        let correct = query.replace(regex, ''); // remove all trailing commas
        query = correct;
        //let data = JSON.parse(correct); // build a new JSON object based on correct string
        ////JSON Remove trailiing comma from last object
        //console.log(correct);
        if (!fkValue && !primary_keys) {

          query = query + "));";
        }
        else if(primary_keys) {

          query = query + ");";
        }
        else {

          query = query + ")" + "" + ", " + fk + ");";
        }

        console.log(query);
        console.log("==================================")
        //pool.query(query); //LOOK INTO This!!!

        //
        //DB Connection
        pool.query(query, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Table is successfully created');

          // console.log(err, res);


        });

        // DB Connection
      }

      else if (mtd.type_name) { //if it's a TYPE
        let type_name = mtd.type_name;
        let type_components = mtd.type_components;
        let query = "CREATE TYPE IF NOT EXISTS " + type_name + " AS" + "(";
        // let metadata = obj.metadata;
        type_components.forEach((mtd, key) => {
          //  if (mtd.table_name) { //if it's a table
          let component_name = mtd.component_name;
          let component_type = mtd.component_type;
          //start query string

          query = query + component_name + " " + component_type + ", ";




        }) // end FOR

        //JSON Remove trailiing comma from last object
        let regex = /\,(?!\s*?[\{\[\"\'\w])/g;

        // javascript
        //let input; // this is the initial string of data
        let correct = query.replace(regex, ''); // remove all trailing commas
        query = correct;


        query = query + ");";
        // }


        console.log(query);
        console.log("==================================")
        //pool.query(query); //LOOK INTO This!!!

        //
        //DB Connection
        pool.query(query, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Custome Type is successfully created');

          // console.log(err, res);

          // DB Connection


          //} 
        })//end pool

      }// TYPE


    })
  } //Metadata END



  //START OF DATA PART
  else if (obj.data) {
    //NEW


    let metadata = obj.data;
    metadata.forEach((mtd, key) => {
      var keys;
      for(var k in mtd){
        keys= k;
        console.log(k);
        break;
      }
      let XX = mtd[keys];

      XX.forEach((element) => { 
        dataInsert(k, element);
        //   console.log(element);

      })

      
    })

  }
  //END OF DATA PART


    //start of update data
	
	//DROPPING TABLES
  
    else if (obj.drop) {
      
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



   //end of update data part 
   	
  //INSERTION async dataInsert(

  function dataInsert(tableName, value) {
    // value.date_created = moment.utc().format(dateFormat);

    const fields = Object.keys(value)
      .map((key) => `${key}`)
      .join(",");
    const values = Object.values(value)
      .map((value) => {
        return typeof value === "string" ? `'${value}'` : `${value}`;
      })
      .join(",");

    var sqlQry =
      "INSERT INTO " + tableName + " (" + fields + ") values (" + values + ") ";
    //DB Connection
    console.log(sqlQry);
    pool.query(sqlQry, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Table is successfully populated');

      // console.log(err, res);


    });

    // DB Connection

    // return new Promise((resolve, reject) => {
    //   this.runQuery(sqlQry)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }


  //INSERTION


  //insert for space

  //INSERTION async dataInsert(

  function dataInsert(tableName, value) {
    // value.date_created = moment.utc().format(dateFormat);
    let query1;
    const fields = Object.keys(value)
      .map((key) => `${key}`)
      .join(",");
    const values = Object.values(value)
      .map((value) => {
        if (value!= null && typeof value === 'object') {



          //
          //new one
          //start query string
          // query1 = "row ( ";
          query1 = " ";

          value.forEach((element) => { //remember to delete last comma
            let column_name = element.latitude;
            let column_type = element.longitude;
            query1 = query1 + "( " + column_name + ", " + column_type + ")::coordinate, ";
            //query1 = query1 + "'("+column_name + ", "+column_type +")'::coordinate [], ";


            //   console.log(element);


          })
          //JSON Remove trailiing comma from last object
          //    let regex = /\,(?!\s*?[\{\[\"\'\w])/g;

          //     // javascript
          //  //let input; // this is the initial string of data
          //  let correct = query1.replace(regex, ''); // remove all trailing commas
          //  query1=correct;
          query1 = query1.replace(/,\s*$/, "");

          query1 = "ARRAY[" + query1 + " ]";


          // }

          //new one


          //


        } //end IF
        else {
          return typeof value === "string" ? `'${value}'` : `${value}`;
        }
      })
      .join(",");
    if (typeof query1 !== 'undefined') {
      var sqlQry =
        "INSERT INTO " + tableName + " (" + fields + ") values (" + values + query1 + "); ";
    }
    else {
      var sqlQry =
        "INSERT INTO " + tableName + " (" + fields + ") values (" + values + "); ";

    }
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

    // return new Promise((resolve, reject) => {
    //   this.runQuery(sqlQry)
    //     .then((data) => {
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  }
  //insert for space



})


// INSERT INTO space(space_name, parent_space_id, coordinate_system_name, space_shape, vertices) 
// VALUES('sdjsgkl', 1, 'GPS', 'Polygon', 
// ARRAY[('0','0',NULL)::coordinate, ('0','1',NULL)::coordinate, ('1','1',NULL)::coordinate, ('0','0',NULL)::coordinate])
