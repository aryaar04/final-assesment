const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
require('./connection');
const BlogModel=require('./model');

app.post('/add',async(req,res)=>{
  try{
      var item=req.body; 
      const data_add=new BlogModel(item);
      const data= await data_add.save();
      res.send('Post successful',data);
  }
  catch (error){
    console.log(error);
  }
})

app.get("/get", async (req, res) => {
  try {
    const data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.put('/edit/:id',async(req,res)=>{
  try {
      const data= await BlogModel.findByIdAndUpdate(req.params.id,req.body)
      res.send('Update successful',data)
  } catch (error) {
      console.log(error);
  }
})

app.delete('/delete/:id',async(req,res)=>{
  try {
      const data= await BlogModel.findByIdAndDelete(req.params.id)
      res.send('Delete successful',data)
  } catch (error) {
      console.log(error);
  }
})

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
