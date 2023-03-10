const mongoose = require("mongoose")
const {Schema} = mongoose;

const clientSchema= new Schema({
    name: {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    contact:{
        type:String,
        require:true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    workingwith:[
        {
            type:Schema.Types.ObjectId,
            refs:"freeLancers"
        }
    ]
})

const client = mongoose.model('client' , clientSchema);

module.exports = client;