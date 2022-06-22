const express = require("express");
// const { json } = require("express");
// const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const app = express();
// app.use(json());
app.use("/", routes);
app.use(express.json());
app.use(express.urlencoded())
const port = 6080;
const fs = require("fs");
// const { stringify } = require("querystring");
const tickets = require("./models/ticket.json")


// const flightData = [
//   {
//     id: 1,
//     title: "flight to Ghana",
//     time: "1pm",
//     price: 26000,
//     date: "26-06-2022",
//   },
//   {
//     id: 2,
//     title: "flight to China",
//     time: "2pm",
//     price: 50000,
//     date: "06-07-2022",
//   },
//   {
//     id: 3,
//     title: "flight to Canada",
//     time: "5pm",
//     price: 43000,
//     date: "29-10-2022",
//   },
//   {
//     id: 4,
//     title: "flight to Australia",
//     time: "5pm",
//     price: 60000,
//     date: "29-10-2022",
//   }
// ];

// const stringedData = JSON.stringify(flightData, null, 2)

// fs.writeFile("./models/ticket.json", stringedData, (err)=>{
// if(err) throw err
// })

app.get("/flights", (req, res) => {
  res.send(tickets);
});

app.post("/flights", (req, res) => {
  // tickets.push(req.body.newTicket)
  // let stringedTicket = JSON.stringify(tickets, null, 2)
  const newTicket = {
    id: tickets.length + 1,
    title: req.body.title,
    time: req.body.time,
    price: req.body.price,
    date: req.body.date,
  };
  tickets.push(newTicket);
  // res.json({newTicket});

  let stringedTicket = JSON.stringify(tickets, null, 2)

  fs.writeFile("./models/ticket.json", stringedTicket, (err) => {
    if (err) {
      return res.status(500).json({ message: err })
    }
  })
  return res.status(200).json({ newTicket })
})

app.get(`/flights/:id`, (req, res) => {
  // return res.json(users)
  console.log({ params: req.params.id })
  let id = req.params.id
  // let foundUser = users.find(user=>{
  //   return String(user.id) === id
  // })
  let findTicket = tickets.find(flight => {
    return String(flight.id) === id
  })
  if (!findTicket) {
    // return res.status(200).json({ user: findUser })
    return res.status(404).json({ message: "User not found" })
  }
  else {
    return res.status(200).json({ user: findTicket })
  }
})

app.put(`/flights/:id`, (req, res) => {
  let id = req.params.id

  let findTicket = tickets.find(flight => {
    return String(flight.id) === id
  })
  if (!findTicket) {
    // return res.status(200).json({ user: findUser })
    return res.status(404).json({ message: "User not found" })
  }
  else {
    findTicket.title = req.body.title;
    findTicket.time = req.body.time;
    findTicket.price = req.body.price;
    findTicket.date = req.body.date;
    return res.status(200).json({ user: findTicket })
  }
})
app.delete(`/flights/:id`, (req, res) => {

  let id = req.params.id

  let findTicket = tickets.find(flight => {
    return String(flight.id) === id
  })
  if (!findTicket) {
    // return res.status(200).json({ user: findUser })
    return res.status(404).json({ message: "User not found" })
  }
  else {
    const index = tickets.indexOf(findTicket);
    tickets.splice(index, 1);

    return res.status(200).json({ message: "Deleted successfully" })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
