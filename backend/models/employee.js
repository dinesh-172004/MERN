const mongoose =require('mongoose')


const EmpSchema =new mongoose.Schema({
    name: String,
    email:String,
    mobile:String,
    designation:String,
    gender:String,
    subjects:[String],
    image:String,
    createat:String,
});



const EmpModel =mongoose.model("employee",EmpSchema);
module.exports = EmpModel;
 