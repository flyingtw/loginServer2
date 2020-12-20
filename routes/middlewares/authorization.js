const jwt = require('jsonwebtoken');
const secretObj = require('../../config/jwt');

const verifyToken = (req, res, next) => {
    const clientToken = req.cookies.token;
    try{
        
        const decoded = jwt.verify(clientToken, secretObj.secret);
        console.log(clientToken);
        

        if(decoded){
            //res.locals.userId = decoded.user_id;//?
            //res.send("토큰 확인 완료");
            next();
        } else {
           
        }
    } catch (err) {
        res.render("index", {
            token : clientToken
          });
    }
};

exports.verifyToken = verifyToken;