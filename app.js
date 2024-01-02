const express = require("express");
const https = require("node:https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  // console.log("post recieved");
//   console.log(req.body.cityName);

  // res.send("server is up and running!!!");

  const query = req.body.cityName;
  const apiKey = "07b3cf46e05d0978899ae1c607d7624a";
  const unit = "metric";
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ unit; 

  https.get(url,(response)=>{
      // console.log(response.statusCode);

      response.on("data",function(data){

          WeatherData = JSON.parse(data);
          const weatherIcon = WeatherData.weather[0].icon;
          const iconUrl= "https://openweathermap.org/img/wn/"+weatherIcon+"@2x.png"

        //   console.log(weatherIcon);
          res.write("<h1>temperature at "+req.body.cityName+" is "+WeatherData.main.temp+" degree celsius</h1>");
          res.write("<p>the weather discription is " + WeatherData.weather[0].description + "</p>");
          res.write("<img src=" +iconUrl+ ">");
          res.send();
      })
  })
});




app.listen(8080,function(){
    console.log("server started at port 8080.")
});