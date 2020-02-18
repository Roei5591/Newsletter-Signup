const express = require("express");
const bodyParesr = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));

app.use(bodyParesr.urlencoded({extended: true}));

app.get("/" , function(req, res)
{
  res.sendFile(__dirname+ "/signup.html");
});

app.post("/" , function(req, res)
{
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data =
  {
    members:
    [
    {
      email_address: email,
      status: "subscribed",
      merge_fields:
      {
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options =
  {
    url: "https://us4.api.mailchimp.com/3.0/lists/902519147d",
    method: "POST",
    headers:
    {
      "Authorization" : "Roei5591 347a9f019101dcebd912426d6825e209-us4"
    },
    body: jsonData
  }
  request(options, function(error, response, body)
{
  if(error)
  {
    res.send("There was an error");
  }
  else
  {
    if(response.statusCode == 200)
    {
      res.send("Success!");
    }
    else
    {
      res.send(response.statusCode.toString());
    }
  }

});

});

app.listen(process.env.PORT || 3000 , function()
{
  console.log("Server is runninig on port 3000");
});

app.post("/b" , function(req, res)
{
  var crypto = req.body.crypto;
  var cur = req.body.cur;
  console.log(crypto + cur);

  var url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + cur;

  request(url, function(error, response, body)
  {
    var data = JSON.parse(body);
    var price = data.last;

    res.send("<h1>The current price of" + crypto + "is " + price + " " + cur + "</h1>" );
  });
});
