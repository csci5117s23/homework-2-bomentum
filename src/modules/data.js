const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
const apikey = process.env.NEXT_PUBLIC_API_KEY;

//Add todo item
export async function addItem(item, userId) {

    //Total hack for the json body
    const newItem = item.slice(0, -1);
    let dict = newItem + ",\"userId\"" +":"+"\""+userId+"\"}";    

    const result = await fetch(endpoint + '/todo', {
        'method': 'POST',
        'headers': {
            'x-apikey': apikey,
            'Content-Type': 'application/json',
        },

        'body': dict,
    });

    if (result.ok) {
        console.log('get auth okay');
    } else {
        console.log('no goooo', result);
    }

    return result.json;
}

//Load undone items
export async function loadNotDone(userId, authToken) {
    console.log('loadDone: ', userId);
    console.log('token: ', authToken);
    console.log("detached head correction");
    const result = await fetch(
        endpoint + '/todo?userId=' + userId + '&done=false&sort=-createdOn',
        {
            method: 'GET',
            headers: {
                'x-apikey': apikey,

            },
            // headers: {
            //     Authorization: "Bearer " + authToken,
            // },
        }
    );

    //return json data or log error
    if (result.ok) {
        console.log('get auth okay');
        return await result.json();
    } else {
        console.log(result);
    }

    return null;
}

//Load undone items
export async function loadDone(userId, authToken) {
    // console.log('loadDone: ', userId);
    // console.log('token: ', authToken);
    const result = await fetch(
        endpoint + '/todo?userId=' + userId + '&done=true&sort=-createdOn',
        {
            method: 'GET',
            // headers: {
            //     'x-apikey': apikey,
            // },
            headers: {
                Authorization: "Bearer " + authToken,
            },
        }
    );

    //return json data or log error
    if (result.ok) {
        console.log('get auth okay');
        return await result.json();
    } else {
        console.log(result);
    }

    return null;
}
