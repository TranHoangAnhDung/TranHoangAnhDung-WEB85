import express from "express";
import * as database from "./data.js";
const app = express();
app.use(express.json());
const port = 8080;

// get /customers
// lấy toàn bộ ds khách hàng
app.get("/customer", (req, res) => {
  res.send(database.customers);
});

// GET /customers/:id
// lấy thông tin chi tiết của một khách hàng dựa trên id.
app.get("/customers/:id", (req, res) => {
  const customerId = req.params.id;
  console.log(customerId);
  const customer = database.customers.find(
    (customer) => customer.id === customerId
  );
  if (customer) {
    res.status(200).send({
      status: "200",
      message: "data found",
      data: customer,
    });
  } else {
    res.status(404).send({
      status: "fail",
      message: "data not found",
      data: null,
    });
  }
});

// GET /customers/:customerId/orders
// lấy danh sách các đơn hàng của một khách hàng cụ thể dựa trên customerId
app.get("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;
  const ordersByCusID = database.orders.filter(
    (other) => other.customerId === customerId
  );
  if (ordersByCusID) {
    res.status(200).send({
      status: "Success",
      message: "Data found",
      data: ordersByCusID,
    });
  } else {
    res.status(404).send({
      status: "fail",
      message: "Data not found",
      data: null,
    });
  }
});

// GET /orders/highvalue
// Trả về danh sách các đơn hàng có totalPrice lớn hơn 10 triệu.
app.get("/orders/highvalue", (req, res) => {
  const ordersHighValue = database.orders.filter(
    (order) => order.totalPrice >= 10000000
  );
  if (ordersHighValue) {
    res.status(200).send({
      status: "Success",
      message: "Data found",
      data: ordersHighValue,
    });
  } else {
    res.status(404).send({
      status: "Fail",
      message: "Data not found",
      data: null,
    });
  }
});

// GET /products?minPrice=?&maxPrice=?
//  lọc danh sách sản phẩm dựa trên khoảng giá minPrice và maxPrice
app.get("/products", (req, res) => {
  const minPrice = parseInt(req.query.minPrice) || 0;
  const maxPrice = parseInt(req.query.maxPrice) || Infinity;

  const productsPrice = database.products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  if (productsPrice) {
    res.status(200).send({
      status: "Success",
      message: "Data found",
      data: productsPrice,
    });
  } else {
    res.status(404).send({
      status: "Fail",
      message: "Data not found",
      data: null,
    });
  }
});

// POST /customers
//  thêm một khách hàng mới vào danh sách khách hàng.
app.post("/customers", (req, res) => {
  const newCus = req.body;
  console.log(newCus);
  database.customers.push(newCus);
  res.send(database.customers);
});

// POST /orders
// thêm một đơn hàng mới vào danh sách đơn hàng
app.post("/orders", (req, res) => {
  const newOrder = req.body;
  database.orders.push(newOrder);
  res.send(database.orders);
});

// PUT /orders/:orderId
// cập nhật số lượng sản phẩm trong một đơn hàng dựa trên orderId
app.put("/orders/:orderId", (req, res) => {
  const { orderId } = req.params;
  const quantity = parseInt(req.query.quantity) || 0;
  const order = database.orders.find((order) => order.orderId === orderId);
  if (order && quantity > 0) {
    const product = database.products.find(
      (product) => product.id === order.productId
    );
    order.quantity = quantity;
    order.totalPrice = product.price * quantity;
    res.status(200).send({
      status: "success",
      message: "order update",
      data: database.orders,
    });
  } else {
    res.status(404).send({
      status: "fail",
      message: "order update fail",
      data: null,
    });
  }
});

// DELETE /customers/:id
// xóa một khách hàng dựa trên id.
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const updateCustomers = database.customers.filter((cus) => cus.id != id);
  if (id && updateCustomers.length < database.customers.length) {
    res.status(200).send({
      status: "Success",
      message: "Delete Success",
      data: updateCustomers,
    });
  } else {
    res.status(404).send({
      status: "Fail",
      message: "Delete fail",
      data: null,
    });
  }
});

// Page not found
app.get("*", (req, res) => {
  res.send("Page not found");
});
app.listen(port, () => {
  console.log(`server is running at localhost:${port}`);
});
