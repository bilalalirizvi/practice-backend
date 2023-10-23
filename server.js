const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
http.createServer(app);

const PORT = 3200;

//init middleware
app.use(express.json({ extended: false }));
app.use(cors());

app.get("/", (_, res) =>
  res.json({
    message: `Server Running at port ${PORT} v 1.0.0`,
  })
);

// ROUTES
app.use("/user", require("./routes/user"));
app.use("/shop", require("./routes/shop"));
app.use("/product", require("./routes/product"));
app.use("/order", require("./routes/order"));

app.listen(PORT, () => {
  console.log(`Server is Connected with port ${PORT}`);
});

// START DATABASE
(async () => {
  try {
    const databaseURI =
      "mongodb+srv://osamawaseem692:J21UyXsga2Bbs5Gr@trackkrr.apvgk4z.mongodb.net/practice-bilal";
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(databaseURI, options);
    console.log("Database Connected");
  } catch ({ message }) {
    console.log("Database Connection Error:", message);
  }
})();
