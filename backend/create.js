import { app, Datastore } from "codehooks-js";

export async function createFunc(req, res) {
    // const { collection } = req.params;
    // const document = req.body;
    // const conn = await Datastore.open();
    // const result = await conn.insertOne("todos", req.body);
    // res.status(201).json(doc);
    res.json({ message: "Display message!" });
}

// export async function createFunc(req, res) {
//   const { collection } = req.params;
//   const document = req.body;
//   const conn = await Datastore.open();
//   const result = await conn.insertOne(collection, document);
//   res.status(201).json(doc);
// }
