import { createConnection } from "typeorm";
import App from "./app";

createConnection()
  .then(() => console.log("Connect DB"))
  .catch((err) => console.log(err));

const server = App.getInstance();
server.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Listening Port ${process.env.SERVER_PORT}`);
});

export default server;
