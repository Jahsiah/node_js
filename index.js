const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/", require("./routes/starts"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log('Example app listening on port ${port}');
  })
}

initializeApp()