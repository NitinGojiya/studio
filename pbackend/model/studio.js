import mongoose from 'mongoose';

const studioSchema=new mongoose.Schema({
name:{
    type:String,
    require:true
},
serviceType:{
    type:String,
    require:true

},
imageUrl: {
    type: String, // ✅ Store the image path (if using multer)
    
},
city:{
    type:String,
    require:true
},
password:{
    type:String,
    require:true

},
email:{
    type:String,
    require:true  
  
}
,
mobile:{
    type:String,
    require:true  
  
}
}
,{ timestamps: true }
);

  
export default mongoose.model("studio",studioSchema);