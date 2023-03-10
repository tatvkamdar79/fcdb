const Client = require("../models/clientSchema");

module.exports.signUp = function(req,res){

    Client.findOne({email:req.body.email},function(err,client){
        if(!client){
            Client.create(req.body,function(err,newClient){
                return res.json({
                    status: 200,
                    message: "User created successfully"
                });
            });
        } else{
            return res.json({
                status: 200,
                message: "User already has an account, please login"
            });
        }
    });

};

