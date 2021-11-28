
const createUser = async (url, data) => {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}
const readUser = async (url, data) => {
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const uploadData = async (url, data) => {
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export {
    createUser,
    readUser,
    uploadData
}