import express from "express";
const port = 8080;
// khởi tạo server
const app = express();
//nhận vào 1 path và 1 cb fc
app.get("", (req, res) => {
  const data = { school: "mindX" };
  res.send(data);
});

app.listen(port, () => {
  console.log("Server is running!");
});
