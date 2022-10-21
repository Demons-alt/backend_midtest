const app = require("./src/Routers/app");
const port = 3001;

app.listen(port, () => {
  console.log(`API runging on localhiost ${port}`);
});
