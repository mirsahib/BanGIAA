// This function is the webhook's request handler.
exports = async function(payload,response) {
    // try{
      
    // }catch(e){
    //   console.log(e)
      
    // }
    const mongodb = context.services.get("mongodb-atlas");
      const db = mongodb.db("objectAnnotation");
      const users = db.collection("users");
    
    const body =EJSON.parse(payload.body.text());
    //console.log("body val", body);
    console.log("body val", JSON.stringify(body));
  
    try{
      //console.log('from try',EJSON.parse(payload.body.text()))
      const result= await users.insertOne(body);
      console.log("from db",result.insertedId)
      if(result){
        const id = result.insertedId
        console.log('userId',id)
        response.setBody(JSON.stringify({userId:id,message:"saved"}))
      }else{
        response.setBody(JSON.stringify({error:"user not saved"}))
      }
      return {"data":result.insertedId}
    }catch(err){
      return err;
    }
  };