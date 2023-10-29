const app = require("./app");
const mogoose = require("mongoose");
const { DB_HOST, PORT } = process.env;
mogoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
