const db = require("../db/ConnectDB");
const Schema = require("../db/schema/Ratings");
const qrr=require("../constants.js").questions_arr;
const router=require("express").Router();
const request=require('request-promise');

router.get("/ratings",(req,res)=>{
 
   res.render("ratingPage.ejs",{questions:qrr});

});


router.get('/ratings/:id',(req, res) => {
  var ratings = req.body; // JSON Object

  var data = new Schema({
    videoID: ratings.videoID,
    Rating: ratings.Rating,
    RatedBy: ratings.RatedBy,
  });
  db.collection("videos")
  .update(
    { documentRef: req.params.id },
    {
      $push: { Ratings: new Schema({Rating:"rating1",RatedBy:"rating2"}) },
    }
  )
  .then(() => {
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
});



// async function node_py_comm(arr)
// {
 
// }


router.post("/ratings",async (req, res)=> {

 
  const ratings = req.body; 
  var arr=[];
  var j=0;
  for(i in ratings)
  {
     arr[j++]=parseInt(ratings[i]);
    
  }

  arr[30]=24;
  arr[31]=1;


  

  
  // node_py_comm(arr).then(value=>{
  // res.send(value+"hi");
  //const response= await node_py_comm(arr);
  //console.log(response,'dfsf')
  // res.send(response+"hi");
 // })

const data={'questions':arr.toString() }

 const options={
   method:'POST',
   uri:'http://127.0.0.1:5000',
   body:data,
   json:true
 }

request(options).then(function(parsedBody){

res.render("result.ejs",{value:parsedBody.toString()});

}).catch((err)=>{
  console.log(err);
  return err;
})



 
});



module.exports =router;
