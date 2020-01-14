const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
app.use(
  (req, res, next) => {
    res.append("Access-Control-Allow-Headers", "Content-Type");
    res.append("Access-Control-Allow-Origin", "*");
    next();
  },
  [
    cors(),
    fileUpload({
      useTempFiles: true,
      safeFileNames: true,
      preserveExtension: 4,
      tempFileDir: `/tmp/`
    })
  ]
);
app.options("*", cors());

connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Logway API" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/clients", require("./routes/clients"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/loadings", require("./routes/loadings"));
app.use("/api/files", require("./routes/files"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
