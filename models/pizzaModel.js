const mongoose=require('mongoose');


const pizzaSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    varients:[],
    prices:[],
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
},{timeStamps:true});


const PizzaModel=mongoose.model('pizza',pizzaSchema);

module.exports=PizzaModel;