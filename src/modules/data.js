//const NEXT_PUBLIC_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const endpoint= 'https://backend-jpvb.api.codehooks.io/dev';
const apikey = process.env.NEXT_PUBLIC_API_KEY;

//Add todo item
export async function addItem(item, userId,authToken) {
    console.log("item passed: ", item);
    console.log('token: ', endpoint);

    const dict = `{ "item": "${item}", "userId": "${userId}"}`;
    console.log("dict", dict);
    
    const result = await fetch(endpoint + '/todo', {
        'method': 'POST',
        // 'headers': {
        //     'x-apikey': apikey,
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        'body': dict,

        'headers': {
            'Authorization': "Bearer " + authToken,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            },
});

    // const response = result.json();
    if (result.ok) {
        console.log('get auth okay: addItem');
    } else {
        console.log('no goooo', result);
        console.log("bad request bc ",result.response);
    }

    return result.json;
}

//Load undone items
export async function loadNotDone(userId, authToken) {
        console.log("endpoint: ", endpoint);
    console.log('loadDone: ', userId);
    console.log('token: ', authToken);

    const result = await fetch(endpoint + '/todo?userId=' + userId + '&done=false&sort=-createdOn',
        {
            'method': 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            'headers': {
                Authorization: "Bearer " + authToken,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
        }
    );
    
    const response = await result.json();

    //return json data or log error
    if (result.ok) {
        console.log('loadNotDone:get auth okay. ADD ERROR CHECK', result);
        return response;
    } else {
        console.log(result);
    }
    console.log("before returning null");
    return null;
}

//Load undone items
export async function loadDone(userId, authToken) {
    console.log('loadDone: ', userId);
    console.log('token: ', authToken);
    console.log("apikey: ", apikey);
    console.log("endpoint: ", endpoint)
    const result = await fetch(endpoint + '/todo?userId=' + userId + '&done=true&sort=-createdOn',
        {
            method: 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            headers: {
                Authorization: "Bearer " + authToken,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
        }
    );

    
    console.log("json response in data.js", result);
    //return json data or log error
    if (result.ok) {
        console.log('Response okay, but valid json??? ADD ERROR CHECK LATER');
        const response = await result.json();
        return response;
    } else {
        console.log(result.statusText);
    }

    return null;
}

//Get single To-Do item
export async function oneItem(userId, _id, authToken) {
    console.log("endpoint: ", endpoint);
    console.log('loadDone: ', userId);
    console.log('item id: ', _id);
    console.log('token: ', authToken);

    const newId = JSON.stringify(_id.id);
    const id = newId.slice(1, -1);
    console.log('string id: ', id);

    const result = await fetch(endpoint + `/todo?userId=${userId}&_id=${id}`,
        {
            'method': 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            'headers': {
                Authorization: "Bearer " + authToken,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'
            },
        }
    );
    console.log("data.js return item:", result);
    //return json data or log error
    if (result.ok) {
        const response = await result.json();
        return response;
    } else {
        console.log(result.statusText);
    }

    return null;
}

//Update item done
export async function updateItem(userId, id, item, change, authToken) {
    console.log("item passed: ", item);
    console.log('id passed: ', id);
    console.log("changed passed", change);
    
    let dict = [];
    //completed or not
    if (change) {
        dict = `{ "done": ${true}}`;
    } else {
        dict = `{ "item":"${item}"}`;
    }

    console.log("dict", dict);

    
    const result = await fetch(endpoint + `/todo/${id}`, {
        'method': 'PATCH',
        // 'headers': {
        //     'x-apikey': apikey,
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        // },
        'headers': {
            'Authorization': "Bearer " + authToken,
            'Content-Type': 'application/json',
        },
        'body': dict,
});

    // const response = result.json();
    if (result.ok) {
        console.log('get auth okay: addItem');
    } else {
        console.log('no goooo', result);
        console.log("bad request bc ", result.statusText);
        alert("Update Error. Do use ENTER or TAB", result.statusText);
        return;
    }

    return result.json;
}

//Update item done
// export async function updateItem(item, userId, _id, authToken) {
//     console.log("item passed: ", item);
//     console.log('id pass: ', _id);
//     console.log("item passed: ", item);
//     console.log('token: ', authToken);


//     const dict = `{ "item": "${item}"}`;
//     console.log("dict", dict);
    
//     const result = await fetch(endpoint + `/todo?userId=${userId}&_id=${_id}`, {
//         'method': 'PUT',
//         'headers': {
//             'x-apikey': apikey,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         'body': dict,

//         // 'headers': {
//         //     'Authorization': "Bearer " + authToken,
//         //     'Cache-Control': 'no-cache',
//         //     'Content-Type': 'application/json',
//         //     },
// });

//     // const response = result.json();
//     if (result.ok) {
//         console.log('get auth okay: addItem');
//     } else {
//         console.log('no goooo', result);
//         console.log("bad request bc ",result.response);
//     }

//     return result.json;
// }