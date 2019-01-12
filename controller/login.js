const { Pool, Client } = require('pg');
const pool = require('../config/db');
var SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const auth = require('../model/auth');
const lodash = require('lodash');
exports.Login = (req, res) => {
    var email = req.body.email;
    var pass = SHA256(req.body.pass);
    pass = pass.toString().toUpperCase()
    auth.login(email, pass).then(value=>{
        if(value.rows.length < 1) {
            auth.getAll().then(result =>{
                if(result.rows.length > 0){
                    // console.log(result.rows)
                    if(lodash.findIndex(result.rows,{email:`${email}`} ) == -1){
                        return res.status(401).json({message:"Email not found!"});
                    }
                    if(lodash.findIndex(result.rows,{pass:`${pass}`}) == -1){
                        return res.status(401).json({message:"Password not found!"});
                    }
                }
                // }else{
                //     return res.status(500).json({message:"Not Found!"})
                // }
            }).catch(err =>{
                return res.status(500).json({message:"Can't connect"});
            })
            
        }else{
            var acToken = auth.generateAccessToken(value.rows[0]);
            var rfToken = auth.generateRefreshToken();

          auth.updateRefreshToken(email, rfToken)
            .then(() => {
              var user_res = {
                user: {
                  email:value.rows[0].email,
                  fullname: value.rows[0].fullname,
                  type: value.rows[0].type,
                  access_token: acToken,
                  refresh_token: rfToken
                }
              };
            return res.status(200).json({message:"Success", user:user_res})
        }).catch(err=>{
            return res.status(500).json({message:"Can't connect"});
        })}
    }).catch( err =>{
        return res.status(500).json({message:"Can't connect"});
    })
    
}