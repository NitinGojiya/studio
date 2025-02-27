import mongoose from 'mongoose';

const citySchema=new mongoose.Schema({
city:{
    type:String,
    require:true
}
});

export default mongoose.model("city",citySchema);