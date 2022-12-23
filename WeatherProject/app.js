const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const units = "metric";
  const apiKey = "5cc03d9b6e00828630a9b0df20feaef4";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units+"&appid=" + apiKey;
  https.get(url,function(response){

    response.on("data",function(data){
      const weatherInfo = JSON.parse(data);
      const temp = weatherInfo.main.temp;
      const description = weatherInfo.weather[0].description;
      const icon = weatherInfo.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>Temperature in " + query + " is " + temp + " degrees Celsius</h1>");
      res.write("<p>The weather is " + description + "</p>");
      res.write("<img src = " + imageUrl + ">");
    });

  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
