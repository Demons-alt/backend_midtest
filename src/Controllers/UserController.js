const { db } = require("../Modules/ConnectionDB");
const response = require("../Helper/BaseRespons");
const Jawt = require("jsonwebtoken");
//add User
const Register = (req, res) => {
  const { email, password, nik, address, phone, role, name } = req.body;

  const sqlQuery = `INSERT INTO users (email, password, nik, address, phone, role, name) VALUE (?,?,?,?,?,?,?)`;

  db.query(
    sqlQuery,
    [email, password, nik, address, phone, role, name],
    (err, result) => {
      const object = {
        message: "success add user",
      };
      if (err) {
        console.log(err);
        response.Failed(res, err, "FILD10");
      }
      console.log(object);  
      response.Success(res, object, "ASKN10");
    }
  );
};

const Login = (req, res) => {
  const { email, password } = req.body;
  const sqlQuery = `SELECT email, user_id, name FROM users where email = ? && password = ? `;
  db.query(sqlQuery, [email,password], (err, result) => {
    try {
      if (result == 0) {
        console.log(email, password);
        response.Success(res, "user not found", "ASKN20");
      }
      console.log(result);
      Jawt.sign({ result }, "secret",{expiresIn : '36000s'}, (err, token) => {
        if (err) {
          console.log(err);
          return;
        }
        const Token = token;
        res.json({
           result,
          Token: Token,
        });
        
      });
    } catch (err) {
      response.Failed(res, err);
    }
  });
};

const GetProfile = (req, res) => {
  const sqlQuery = `SELECT * FROM users where user_id = ${req.params.UserId}`;
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


//logout
const LogOut = (req,res) => {
    let Token = req.headers['authorization']
    if (!Token) {
        
        res.send('Logouted')
    }else{
    let Token = null
    res.send(Token + ' logeout')
    return
    }
}


const updateProfile = (req, res) => {
  const { email, password, nik, address, phone, role,name } = req.body;

  const sqlQuery = `UPDATE users email = ? password = ? nik = ? address = ? phone = ? role =?  name =? where user_id = ${req.params.userId}`;

  db.query(
    sqlQuery,
    [email, password, nik, address, phone, role, name],
    (err, result) => {
      const object = {
        message: "success update user",
      };
      if (err) {
        console.log(err);
        response.Failed(res, err, "FILD10");
      }
      console.log(object);  
      response.Success(res, object, "ASKN10");
    }
  );
};

module.exports = {
  Register,
  Login,
  GetProfile,
  LogOut,
  updateProfile
};
