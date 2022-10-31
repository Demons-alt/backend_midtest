const { db } = require("../Modules/ConnectionDB");
const response = require("../Helper/BaseRespons");
const xlstojson = require("xlsx-to-json-lc");
const RedisService = require("../Modules/redisConnect");
const path = require("path");
const { v1 } = require("uuid");
const uuid = v1();

//Add Ticket
const AddActivity = (req, res) => {
  const { id_ticket, total_claim } = req.body;

  const sqlQuery = `INSERT INTO ticket_list_activity (id_ticket, total_claim) VALUE (?,?)`;

  db.query(sqlQuery, [id_ticket, total_claim], (err, result) => {
    const object = {
      message: "success add user",
    };
    if (err) {
      // console.log(err);
      response.Failed(res, err, "FILD10");
    }

    response.Success(res, "message : Activity Success Add", "ASKN10");
  });
};

// get all tickets
const AllActivitys = (req, res) => {
  const sqlQuery = "SELECT * FROM ticket_list_activity";

  db.query(sqlQuery, (err, result) => {
    const object = {
      data: result,
    };
    if (err) {
      //   console.log(err);
      response.Failed(res, err, "FLD20");
    }
    response.Success(res, object, "ASKN20");
  });
};

//One ticket
const OneActivity = (req, res) => {
  const Id = req.params.activityId;
  const sqlQuery = `SELECT * FROM ticket_list_activity WHERE id = '${Id}'`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      // console.log(err);
      response.Failed(res, err, "FLD20");
    }

    response.Success(res, result, "ASKN20");
  });
};

//Delete ticket
const DeleteOneActivity = (req, res) => {
  const Id = req.params.activityId;
  const sqlQuery = `DELETE FROM ticket_list_activity WHERE ${Id}`;
  const sqlQuery2 = "SELECT * FROM ticket_list_activity ";

  db.query(sqlQuery, ticket_id, (err, result) => {
    if (err) {
      console.log(err);
    }
    db.query(sqlQuery2, (err, result) => {
      if (err) {
        response.Failed(res, err, "FLD30");
      }

      response.Success(res, "message : Activity has Deleted", "ASKN20");
    });
  });
};

//exel to json to database
const UploadExel = (req, res) => {
  xlstojson(
    {
      input: req.files.file.path,
      output: null,
      lowerCaseHeaders: true,
    },
    async function (err, result) {
      if (err) {
        console.log(err);
      }
      const finalResult = result
        .filter(
          (item) =>
            item.activity_date != "" ||
            item.total_claim != "" ||
            item.description != "" ||
            item.id_ticket != ""
        )
        .map((item) => {
          return {
            activity_id: uuid,
            id_ticket: item.id_ticket,
            activity_date: item.activity_date,
            amount_claim: item.total_claim,
            description: item.description,
          };
        });
      // res.send(finalResult);
      try {
        console.log("store data in redis");
        await RedisService.set(uuid, JSON.stringify(finalResult));
        res.send(JSON.parse(await RedisService.get(uuid)));
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
  );
};

const postData = (req, res) =>{
  const sqlQuery = `INSERT INTO ticket_list_activity (id,id_ticket,description, total_claim) VALUE (?,?)`;

}

module.exports = {
  AddActivity,
  AllActivitys,
  OneActivity,
  DeleteOneActivity,
  UploadExel,
};
