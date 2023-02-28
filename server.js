const express = require("express");
const app = express();
const connectDB = require("./config/db");
const user = require("./routes/user");
const auth = require("./routes/auth");

//Connect to Database
connectDB();

//Allow app to use JSON
app.use(express.json());

//App routes
app.use("/api/user", user);
app.use("/api/auth", auth);

const PORT = 8000;

app.listen(PORT, (err) => {
  console.log(`Server is running on ${PORT}`);
});
