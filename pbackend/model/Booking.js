import mongoose from 'mongoose';

const bookingSchema=new mongoose.Schema({
studioname:{
    type:String,
    require:true
},
studiogmail:{
    type:String,
    require:true
},
studiomobile:{
    type:String,
    require:true
},
customername:{
    type:String,
    require:true
},
address:{
    type:String,
    require:true
},
email:{
    type:String,
    require:true
},
mobile:{
    type:String,
    require:true
},
startdate:{
    type:String,
    require:true

},
enddate:{
    type:String,
    require:true

},
status:{
    
    type:String,
    require:true

},


},{ timestamps: true });

export default mongoose.model("Booking",bookingSchema);