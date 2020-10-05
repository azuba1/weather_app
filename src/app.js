const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
// body-parser config
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  // varibales for url
  const query = req.body.cityName;
  const apiKey = "877b8936e124398b97a294a4807b126b";
  const units = "metric";

  //url for weather api
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<p>The weather currently ${weatherDescription}</p>`);
      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees Celcius.</h1>`
      );
      res.write(`<img src=${imageURL}>`);
      res.send();
    });
  });
});

// Server Port
const port = 3000;
app.listen(port, () => {
  console.log(`Server is now running on port ${port}...`);
});
