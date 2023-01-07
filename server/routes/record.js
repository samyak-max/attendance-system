const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const app = express();
app.use(express.json());

recordRoutes.route("/record/view").get(function (req, res) {
 let db_connect = dbo.getDb("students");
 db_connect
   .collection("records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   roll: req.body.roll,
   checkIn: req.body.checkInTime,
   checkOut: req.body.checkOutTime
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
   
 });
});
 
recordRoutes.route("/record/update").post(function (req, response) {
 let db_connect = dbo.getDb();
 db_connect.collection("records").updateOne({ roll: req.body.roll },{$set: {checkOut: req.body.checkOutTime}}, {upsert: false}, (err, res)=>{
     if (err) throw err;
     console.log("Out time added");
     response.json(res);
   });
});
 
recordRoutes.route("/record/update").post(function (req, response) {
  let db_connect = dbo.getDb();
  db_connect.collection("records").findOne({ roll: req.body.roll });
});
 
module.exports = recordRoutes;