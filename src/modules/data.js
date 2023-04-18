//const NEXT_PUBLIC_API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const endpoint = 'https://backend-jpvb.api.codehooks.io/dev';
const apikey = process.env.NEXT_PUBLIC_API_KEY;

//Add todo item
export async function addItem(item, userId, authToken) {
    const dict = `{ "item": "${item}", "userId": "${userId}"}`;
    //console.log("dict", dict);

    const result = await fetch(endpoint + '/todo', {
        method: 'POST',
        body: dict,

        headers: {
            Authorization: 'Bearer ' + authToken,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
        },
    });

    // const response = result.json();
    if (result.ok) {
        console.log('get auth okay: addItem');
    } else {
        console.log('bad request bc ', result.statusText);
    }

    return result.json;
}

//Load undone items
export async function loadNotDone(userId, authToken) {
    const result = await fetch(
        endpoint + '/todo?userId=' + userId + '&done=false&sort=-createdOn',
        {
            method: 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
        }
    );

    const response = await result.json();

    //return json data or log error
    if (result.ok) {
        return response;
    } else {
        console.log(result);
    }
    return null;
}

//Load undone items
export async function loadDone(userId, authToken) {
    const result = await fetch(
        endpoint + '/todo?userId=' + userId + '&done=true&sort=-createdOn',
        {
            method: 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            headers: {
                Authorization: 'Bearer ' + authToken,
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json',
            },
        }
    );

    //return json data or log error
    if (result.ok) {
        const response = await result.json();
        return response;
    } else {
        console.log(result.statusText);
    }

    return null;
}

//Get single To-Do item
export async function oneItem(userId, _id, authToken) {
    const newId = JSON.stringify(_id.id);
    const id = newId.slice(1, -1);
    //console.log('string id: ', id);

    const result = await fetch(endpoint + `/todo?userId=${userId}&_id=${id}`, {
        method: 'GET',
        // headers: {
        //     'x-apikey': apikey,
        // },
        headers: {
            Authorization: 'Bearer ' + authToken,
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
        },
    });
    console.log('data.js return item:', result);
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
    let dict = [];
    //completed or not
    if (change) {
        dict = `{ "done": ${true}}`;
    } else {
        dict = `{ "item":"${item}"}`;
    }

    console.log('dict', dict);

    const result = await fetch(endpoint + `/todo/${id}`, {
        method: 'PATCH',
        headers: {
            Authorization: 'Bearer ' + authToken,
            'Content-Type': 'application/json',
        },
        body: dict,
    });

    // const response = result.json();
    if (result.ok) {
        console.log('get auth okay: addItem');
    } else {
        alert(
            'Update Error. Do use ENTER or TAB. Try again',
            result.statusText
        );
        return;
    }

    return result.json;
}
