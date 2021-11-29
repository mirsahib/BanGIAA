// This function is the webhook's request handler.

exports = async function(payload,response) {
    // try{
      
    // }catch(e){
    //   console.log(e)
      
    // }
    const mongodb = context.services.get("mongodb-atlas");
    const db = mongodb.db("objectAnnotation");
    const users = db.collection("users");
    const {email,password} = payload.query;
    console.log('query',typeof password,password);
    //const body =EJSON.parse(payload.body.text());
    //console.log("body val", typeof body.userId);
    //console.log("body val", JSON.stringify(body));
  
    try{
      //console.log('from try',EJSON.parse(payload.body.text()))
      //const query = {"_id":"6199de4d8ca9b18a414f692e"}
      //const result= await users.findOne({"_id" : BSON.ObjectId(userId)},{"email":1,"password":1})
      const result= await users.findOne({"email" : email })
      
      console.log("from db",JSON.stringify(result))
      if(!result){
        response.setBody(JSON.stringify({error:"User not found"}))
        return {"User":"User not found"}
      }else if(result.password!==password){
        response.setBody(JSON.stringify({error:"Password don't match."}))
        return {"User":"Password don't match."}
      }else{
        response.setBody(JSON.stringify(result))
        return {"User":"User exist"}
      }
      
    }catch(err){
      return err;
    }
  };