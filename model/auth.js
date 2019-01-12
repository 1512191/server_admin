var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');
const pool = require('../config/db');
var db = require('../fn/database');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 120; // seconds

class AuthRepos {
    generateAccessToken(userEntity) {
        var payload = {
            user: userEntity,
            info: 'more info'
        }
        var token = jwt.sign(payload, SECRET, {
            expiresIn: AC_LIFETIME
        });
        return token;
    }

    verifyAccessToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, SECRET, (err, payload) => {
                if (err) {
                   
                    res.status(400).json({
                        msg: 'INVALID TOKEN',
                        error: err
                    })
                } else {
                    req.token_payload = payload;
                    next();
                }
            });
        } else {
            
            res.status(403).json({
                msg: 'NO_TOKEN'
            });
        }
    }

    generateRefreshToken() {
        const SIZE = 80;
        return rndToken.generate(SIZE);
    }
    login(email, pass){
        var sql = `SELECT *FROM login WHERE email='${email}' AND pass='${pass}'`;
        return db.load(sql);
    }
    updateRefreshToken (email, token)  {  
        var sql = `Update login set token = '${token}' where email = '${email}'`;           
        return db.load(sql);   
    }
    getUser(email){
        var sql=`select *from login where email='${email}'`;
        return db.load(sql);
    }
    getAll(){
        var sql=`select *from login`;
        return db.load(sql);
    }
}

module.exports = new AuthRepos();