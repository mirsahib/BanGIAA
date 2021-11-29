// This function is the webhook's request handler.
exports = async function(payload,response) {
    // try{
      
    // }catch(e){
    //   console.log(e)
      
    // }
    const mongodb = context.services.get("mongodb-atlas");
      const db = mongodb.db("objectAnnotation");
      const annotation = db.collection("annotation");
    
    const body =EJSON.parse(payload.body.text());
    console.log("body val", body);
    console.log("body val", JSON.stringify(body));
    
    const data = {
      className:body.className,
      productName:body.productName,
      image:body.image,
      userId:BSON.ObjectId(body.userId)
    }
    console.log('data',JSON.stringify(data))
    try{
      //console.log('from try',EJSON.parse(payload.body.text()))
      const result= await annotation.insertOne(data);
      console.log("from db",result)
      if(result){
        response.setBody(JSON.stringify({data:result,message:"saved"}))
      }else{
        response.setBody(JSON.stringify({message:"not saved"}))
      }
      return {"data":"saved"}
    }catch(err){
      return err;
    }
  };