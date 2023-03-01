import express from "express";
import { connectDB } from "./config/db.js";
import { userRoute } from "./routes/user/index.js";
import { authRoute } from "./routes/auth/index.js";
import { profileRoute } from "./routes/profile/index.js";

const app = express();

//Connect to Database
connectDB();

//Allow app to use JSON
app.use(express.json());

//App routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);

const PORT = 8000;

app.listen(PORT, (err) => {
  console.log(`Server is running on ${PORT}`);
});
