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
export default isEmpty