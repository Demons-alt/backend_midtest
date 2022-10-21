const Jwt = require("jsonwebtoken");
const response = require('../Helper/BaseRespons');

// function AuthToken (req,res,next) {
//     const Token = req.params.tokenAcess
//     Jwt.verify(req.headers.Token, 'secret', (err,result)=>{
//         if (err) {

//             console.log(Token)
//             console.log(err);
//             response.Failed(res,err)
            
//         }
        
//         res.json('success')
//         next()
//     })
    

// }

const jwt = require('jsonwebtoken');

function AuthToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'secret', (err, user) => {
    // console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = AuthToken