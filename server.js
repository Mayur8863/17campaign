// sequelize-auto -o "./models" -d campaign -h localhost -u root -p 3306 -x root -e mysql -t customer
const http = require("http");
const express = require("express");
const app  =express();
app.use(express.json());



const campaignRoutes = require("./routes/campaignRoute");
app.use("/campaign",campaignRoutes);

const customerRoutes = require("./routes/customerRoute");
app.use("/customer",customerRoutes);

// const dataInsertion = require("./controllers/dataInsertion");
// dataInsertion();

const server = http.createServer(app);
server.listen(3000,)