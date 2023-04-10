/*
 * Auto generated Codehooks (c) example
 * Install: npm i codehooks-js codehooks-crudlify
 */
import { app } from "codehooks-js";
import { crudlify } from "codehooks-crudlify";
import { date, object, string, boolean } from "yup";
import { render } from "react-dom";

//database schema
const todoSchema = object({
  id: string().required(),
  name: string().required().default(""),
  text: string().required(),
  done: boolean().default(() => false),
  createdOn: date().default(() => new Date()),
});

// codehooks api routes
app.get("/hello", async (req, res) => {
  console.log("Inside hello");
  res.json({ message: "Hello world What happened!" });
});

app.get("/", async (req, res) => {
  console.log("Root");
  res.json({ message: "Hello world!" });
});

app.get("/todos", async (req, res) => {
  res.json({ message: "in todo page" });
});

app.get("/done", (req, res) => {
  res.json({ result: "show done/competed items and add link todo page" });
});

app.get("/todo/:id", (req, res) => {
  res.json({ result: "show done/competed items and add link todo page" });
});

// Use Crudlify to create a REST API for any collection
crudlify(app, { todoSchema });

// bind to serverless runtime
export default app.init();
