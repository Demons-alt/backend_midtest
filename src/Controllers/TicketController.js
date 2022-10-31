const { db } = require("../Modules/ConnectionDB");
const response = require("../Helper/BaseRespons");

//Add Ticket
const AddTicket = (req, res) => {
  const {
    ticket_type,
    created_by,
    current_approval_name,
    current_approval_role,
    status,
  } = req.body;

  const sqlQuery = `INSERT INTO ticket (ticket_type, created_by, current_approval_name, current_approval_role,status) VALUE (?,?,?,?,?)`;

  db.query(
    sqlQuery,
    [
      ticket_type,
      created_by,
      current_approval_name,
      current_approval_role,
      status,
    ],
    (err, result) => {
      const object = {
        message: "Success Add Ticket",
      };
      if (err) {
        console.log(err);
        response.Failed(res, err, "FILD10");
      }

      response.Success(res, object, "ASKN10");
    }
  );
};

// get all tickets
const AllTickets = (req, res) => {
  const sqlQuery = "SELECT ticket_type,created_by,status FROM ticket";

  db.query(sqlQuery, (err, result) => {
    const object = {
      data: result,
    };
    if (err) {
      console.log(err);
      response.Failed(res, err, "FLD20");
    }
    // res.send(result)
    response.Success(res, result, "ASKN20");
  });
};

//One ticket
const OneTicket = (req, res) => {
  const Id = req.params.ticketId;
  const sqlQuery = `SELECT * FROM ticket WHERE ticket_id = '${Id}'`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      // console.log(err);
      response.Failed(res, err, "FLD30");
    }

    response.Success(res, result, "ASKN30");
  });
};

//Delete ticket
const DeleteOneTicket = (req, res) => {
  const Id = req.params.ticketId;
  const sqlQuery = `DELETE FROM ticket WHERE ${Id}`;
  const sqlQuery2 = "SELECT * FROM ticket ";

  db.query(sqlQuery, ticket_id, (err, result) => {
    if (err) {
        response.Failed(res, err, "FLD40");
    }
    db.query(sqlQuery2, (err, result) => {
      if (err) {
        response.Failed(res, err, "FLD40");
      }

      response.Success(res, 'Ticket Has Deleted', "ASKN40");
    });
  });
};

//update status 
const updateStatus = (req, res) => {
    const status = req.body.status
    const sqlQuery = `UPDATE ticket SET status = '${status}' WHERE ticket_id = ${req.params.ticketId}`
    db.query(sqlQuery, (err, result) => {
        if (err) {
            response.Failed(res, err, "FLD40");
        }
        console.log(status);
          response.Success(res, 'Status Updated', "ASKN40");
        });
}
// get Summary

const GetSummary = (req, res) => {
    const sqlQuery = `select COUNT(if(status='pending',1,NULL)) as pending, COUNT(if(status='reject',1,NULL)) as reject, COUNT(if(status='approve',1,NULL)) as approve from ticket;`
     db.query(sqlQuery, (err, result) => {
        if (err) {
            // console.log(err);
            response.Failed(res, err, "FLD30");
          }
      
          response.Success(res, result, "ASKN30");
      });

}
module.exports = {
  AddTicket,
  AllTickets,
  OneTicket,
  DeleteOneTicket,
  GetSummary,
  updateStatus
};
