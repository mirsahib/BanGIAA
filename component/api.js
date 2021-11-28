
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
        let response = await fetch(url+'?email='+data.email+'&password='+data.password, {
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

const uploadImage = async (url, uri) => {
    try {
        let base64Img = `data:image/jpg;base64,${uri}`
        let imageData = { file: base64Img, upload_preset: "annotationImage" }
        let response = await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(imageData),
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}


export {
    createUser,
    readUser,
    uploadData,
    uploadImage
}