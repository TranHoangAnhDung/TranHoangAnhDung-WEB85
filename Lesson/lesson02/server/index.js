import express from "express";
import { customers, products, orders } from "./data.js";

const port = 8080;
// khởi tạo server
const app = express();

app.use(express.json());

//get
//nhận vào 1 path và 1 cb fc(request,response,next)
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customer = customers.find((customer) => customer.id === id);
  //check customer
  if (customer) {
    res.status(200).send({
      status: "success",
      message: "data found",
      data: customer,
    });
  } else {
    res.status(400).send({
      status: "fail",
      message: "data not found",
      data: null,
    });
  }
});

// get
// lấy others dựa trên customerId và productId
app.get("/others/:cId/:pId", (req, res) => {
  const { cId, pId } = req.params;
  const listOther = orders.filter(
    (order) => order.customerId === cId && order.productId === pId
  );
  if (listOther) {
    res.status(200).send({
      status: "success",
      message: "data found",
      data: listOther,
    });
  } else {
    res.status(404).send({
      status: "fail",
      message: "data not found",
      data: null,
    });
  }
  res.send(listOther);
});

// Post
// thêm 1 customer mới
app.post("/customers", (req, res) => {
  const body = req.body;
  customers.push(body);
  res.send(customers);
});

//Update
app.put("customers/:id", (req, res) => {
  const dataUpdate = req.body;
  const { id } = req.params;

  const customer = customers.find((customer) => customer.id === id);
  Object.keys(dataUpdate).forEach((key) => {
    console.log(key);
    customer[key] = dataUpdate[key];
  });
  res.send(customer);
});

// Delete = Delete
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const filterCustomers = customers.filter((c) => c.id != id);
  res.send(filterCustomers);
});

//run server
app.listen(port, () => {
  console.log("Server is running!");
});
