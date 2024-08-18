const mongoose = require("mongoose");

mongoose
  .connect('mongodb+srv://aadu_79:Adillida7@cluster0.zxqsdtw.mongodb.net/BlogDB?retryWrites=true&w=majority&appName=Cluster0'
   
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
