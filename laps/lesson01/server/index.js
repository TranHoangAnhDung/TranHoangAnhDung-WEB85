import http from "http";
import { customers, products, orders } from "./data.js";
import * as utils from "./utils.js";

const app = http.createServer((req, res) => {
  const endpoint = req.url;
  var id;
  if (endpoint.startsWith("/customers/")) {
    id = endpoint.split("/")[2];
    console.log("id:", id);
  }

  switch (endpoint) {
    case "/customers":
      res.end(JSON.stringify(customers));
      break;

    case `/customers/${id}`:
      //   res.end(`ID bạn đang yêu cầu là: ${id}`);
      res.end(JSON.stringify(utils.findById(id, customers)));
      break;

    case `/customers/${id}/orders`:
      res.end(JSON.stringify(utils.findOrdersById(id, orders)));
      break;

    case "/orders/highvalue":
      res.end(JSON.stringify(utils.findHighValue(orders)));
      break;

    case `/products?minPrice=5000000&maxPrice=10000000`:
        res.end(JSON.stringify(res));
      break;

    default:
      res.end(`404 Notfound`);
      break;
  }
});

app.listen(8080, () => {
  console.log("Server is running!");
});
