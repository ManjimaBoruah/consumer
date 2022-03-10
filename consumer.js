const amqp = require("amqplib");
const { channel } = require("diagnostics_channel");
 
connect(); 
async function connect(){
     try{
         //creating a connection
        const connection = await amqp.connect("amqp://someaddress:5672")
        //we need to create channel
        const channel = await connection.createChannel();
         //making sure a queue exists or else a queue will be made
        const result = await channel.assertQueue("jobs"); 
         channel.consume("jons",message =>{
            const input = JSON.parse(message.content.toString());
            initMap(input.lat,input.lng)

          
         })
        console.log("waiting for messages")
          
     }
     catch (ex){
         console.error(ex)
     }
 }

 function initMap(latitude,longitude){
            
    var options = {
        zoom:8,
        center:{lat:latitude,lng:longitude}
    }
   
   var map= new google.maps.Map(document.getElementById('map'),options);
   
   var marker= new google.maps.Marker({
       position:{lat:latitude,lng:longitude},
       map:map
   });
}