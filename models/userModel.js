const mongoose =require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:[true,"This feild is required"]
    },
    email:{
        type:String,
        require:[true,"This feild is required"]
    },
    password:{
        type:String,
        require:[true,"This feild is required"]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timeStamps:true});

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;
