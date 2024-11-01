import http from "http";
import url from "url";

import { customers, products, orders } from "./data.js";
import * as utils from "./utils.js";

const app = http.createServer((req, res) => {
  //Parse url thành nhiều phần
  const parseURL = url.parse(req.url, true);
  const path = parseURL.pathname;
  const query = parseURL.query;
  var id;
  if (path.startsWith("/customers/")) {
    id = path.split("/")[2];
  }

  switch (path) {
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

    case "/products":
      const minPrice = parseInt(query.minPrice);
      const maxPrice = parseInt(query.maxPrice);
      res.end(
        JSON.stringify(utils.rangePriceProduct(minPrice, maxPrice, products))
      );
      break;

    default:
      res.end(`404 Notfound`);
      break;
  }
});

app.listen(8080, () => {
  console.log("Server is running!");
});
