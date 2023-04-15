const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const apikey = process.env.NEXT_PUBLIC_API_KEY;

//Add todo item
export async function addItem(item, userId, authToken) {

    //Total hack for the json body
    const newItem = item.slice(0, -1);
    let dict = newItem + ",\"userId\"" + ":" + "\"" + userId + "\"}";    
    console.log("dict", dict);

    const result = await fetch(endpoint + '/todo', {
        'method': 'POST',
        'headers': {
            'x-apikey': apikey,
            'Content-Type': 'application/json',
        'body': dict,
        },
        // 'headers': {
        //     'Authorization': "Bearer " + authToken,
        //     'Cache-Control': 'no-cache',
        //     'Content-Type': 'application/json',
        //     },

        // 'body': dict,
    });

    if (result.ok) {
        console.log('get auth okay: addItem');
    } else {
        console.log('no goooo', result);
    }

    return result.json;
}

//Load undone items
export async function loadNotDone(userId, authToken) {
    console.log('loadDone: ', userId);
    console.log('token: ', authToken);

    const result = await fetch(
        endpoint + '/todo?userId=' + userId + '&done=false&sort=-createdOn',
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
    
    // const response = await result.json();

    //return json data or log error
    if (result.ok) {
        console.log('loadNotDone:get auth okay', result);
        return result;
        console.log("where did we go");
        //return await result.json();
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
    const result = await fetch(endpoint + '/todo?userId=' + userId + '&done=true&sort=-createdOn',
        {
            method: 'GET',
            headers: {
                'x-apikey': apikey,
            },
            // headers: {
            //     Authorization: "Bearer " + authToken,
            //     'Cache-Control': 'no-cache',
            //     'Content-Type': 'application/json'
            // },
        }
    );

    const response = await result.json();
    console.log("json response in data.js", response);
    //return json data or log error
    if (result.ok) {
        console.log('Response okay, but valid json??? ADD ERROR CHECK LATER');
        return response;
    } else {
        console.log(result);
    }

    return null;
}
