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
        const user= await users.findOne({"email" : body.email })
        console.log('user',JSON.stringify(user))
        if (user){
            response.setBody(JSON.stringify({error:"Email already exist"}))
            return {"error":"Email already exist"}
        }else{
            const result= await users.insertOne(body);
            console.log("from db",result)
            if(result){
                const id = result.insertedId
                console.log('userId',id)
                response.setBody(JSON.stringify({userId:result.insertedId,message:"User created successfully"}))
                return {"user":"saved"}
            }else{
                response.setBody(JSON.stringify({error:"Something went wrong"}))
                return {"error":"Something went wrong"}
            }   
      }
    }catch(err){
      console.log('error',err)
      return err;
    }
  };