const mongoose=require("mongoose");
const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const model=mongoose.model('blog',schema);
module.exports=model
