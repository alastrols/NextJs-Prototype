const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 8085;
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/uploaded"));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true); 
  next();
});

app.get('/', function(req, res){
  res.json('success')
})

app.get('/api/image/:img_name', function (req, res) {
  var img_name = req.params.img_name
  var filepath = __dirname + "/uploaded/images/" + img_name 
  res.sendFile(filepath);
});

app.use("/api/v2/authen/", require("./api_authen"));
app.use("/api/v2/stock/", require("./api_stock"));

app.listen(PORT, () => {
  console.log("Backend is running.. " + PORT);
});
