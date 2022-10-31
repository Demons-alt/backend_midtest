const app = require("./src/Routers/app");
const Client = require('./src/Modules/redisConnect');
const port = 3001;

app.listen(port, async() => {
  await Client.connect();
  console.log(`API runging on localhiost ${port}`);
});
