const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


// app.use();
app.use(cors({
  origin: 'http://localhost:5005'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const db = require("./Sql/db");

const Login = require("./routers/Login");
const Dashboard = require("./routers/Dashboard");
const FingerPrint = require("./routers/FingerPrint");
const RegularScreen = require("./routers/RegularScreen");
const Header = require("./routers/Header");
// const RegularChildScreen = require("./routers/RegularChildScreen");
// const ActionableScreen = require("./routers/ActionableScreen");
// const ActionableChildScreen = require("./routers/ActionableChildScreen");
// const BasicInformation = require("./routers/BasicInformation");
// const SpotSampling = require("./routers/SpotSampling");
// const ReviewData = require("./routers/ReviewData");




app.use(Login);
app.use(Dashboard);
app.use(FingerPrint);
app.use(RegularScreen);
app.use(Header);
// app.use(RegularChildScreen);
// app.use(ActionableScreen);
// app.use(ActionableChildScreen);
// app.use(BasicInformation);
// app.use(SpotSampling);
// app.use(ReviewData);


app.listen(5005, () => {  
  console.log("Server Is Running At Port Number 5005 LOCAL");
});
