const isEmpty = (data)=>{
    let result = true
    let objArr = Object.keys(data)
    for(let i=0;i<objArr.length;i++){
        if(data[objArr[i]].length==0){
            result=false
            break
        }
    }
    return result
}

const validateEmail = (email)=>{
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    return regex.test(email)
}


export default {
    isEmpty,
    validateEmail,
}