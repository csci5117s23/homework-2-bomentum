/*
 * Auto generated Codehooks (c) example
 * Install: npm i codehooks-js codehooks-crudlify
 */
import { app } from "codehooks-js";
import { crudlify } from "codehooks-crudlify";
import { date, object, string, boolean } from "yup";
import { createFunc } from "./create";
// import jwtDecode from "jwt-decode";

//database schema
const todoSchema = object({
    id: string().required(),
    name: string().required().default(""),
    text: string().required(),
    done: boolean().default(() => false),
    createdOn: date().default(() => new Date()),
});

// // This can largely be copy-pasted, it just grabs the authorization token and parses it, stashing it on the request.
// const userAuth = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     if (authorization) {
//       const token = authorization.replace("Bearer ", "");
//       // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
//       const token_parsed = jwtDecode(token);
//       req.user_token = token_parsed;
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
// app.use(userAuth);

// Codehooks API routes
app.get("/hello", async (req, res) => {
    res.json({ message: "Hello!" });
});

app.get("/", async (req, res) => {
    res.json("redirect to login somehow");
});

app.get("/todos", createFunc);

// Use Crudlify to create a REST API for any collection
crudlify(app, { todo: todoSchema });

// bind to serverless runtime
export default app.init();
