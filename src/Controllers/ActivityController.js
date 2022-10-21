const { db } = require("../Modules/ConnectionDB");
const response = require("../Helper/BaseRespons");

//Add Ticket
const AddActivity = (req, res) => {
  const {
    id_ticket, total_claim
  } = req.body;

  const sqlQuery = `INSERT INTO ticket_list_activity (id_ticket, total_claim) VALUE (?,?)`;

  db.query(
    sqlQuery,
    [
      id_ticket, total_claim
    ],
    (err, result) => {
      const object = {
        message: "success add user",
      };
      if (err) {
        // console.log(err);
        response.Failed(res, err, "FILD10");
      }

      response.Success(res, 'message : Activity Success Add', "ASKN10");
    }
  );
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
    response.Success(res, result, "ASKN20");
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

      response.Success(res, 'message : Activity has Deleted', "ASKN20");
    });
  });
};

module.exports = {
    AddActivity,
    AllActivitys,
    OneActivity,
    DeleteOneActivity,
};
