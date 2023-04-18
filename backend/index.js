/*
 * Auto generated Codehooks (c) example
 * Install: npm i codehooks-js codehooks-crudlify
 */
import { app, Datastore } from 'codehooks-js';
import { crudlify } from 'codehooks-crudlify';
import { date, object, string, boolean } from 'yup';
import jwtDecode from 'jwt-decode';


//database schema
const todo = object({
    userId: string().required(),
    item: string().required(),
    done: boolean().required().default(false),
    createdOn: date().default(() => new Date()),
});

// //func to update item from Codehooks
// async function updateItem(req, res) {
//     const conn = await Datastore.open();
//     const data = await conn.updateOne('todo', req.param.id, req.body);
//     res.json(data);
// }

// //Codehooks updateOne
// app.put('/updateToDo', updateItem)

// Use Crudlify to create a REST API for any collection
crudlify(app, { todo });

// bind to serverless runtime
export default app.init();
