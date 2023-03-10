const mongoose = require("mongoose")
const {Schema} = mongoose;

const clientSchema= new Schema({
    name: {
        type:String,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    workingwith:[
        {
            type:Schema.Types.ObjectId,
            refs:"freeLancers"
        }
    ]
})

mongoose.model('client' , clientSchema);