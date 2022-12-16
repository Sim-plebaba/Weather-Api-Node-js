const http = require('http');
const fs = require('fs');
const requests = require('requests');

const mainfile =fs.readFileSync("home.html","utf-8")

//api.openweathermap.org/data/2.5/weather?q=Noida&appid=c81675aac722e4d753f5b98fbdad8564
const server = http.createServer((req, res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=c81675aac722e4d753f5b98fbdad8564")
        .on("data",(chunk)=>{
            const objdata = JSON.parse(chunk);
            const arrData = [objdata];
            console.log(arrData[0].name)

            myweatherstate = '<i class ="fa fa-cloud" style = "font-size: 170px; color: rgb(92,92,92)"></i>';
        let realtime = mainfile.replace(
            "{%temperature%}",((arrData[0].main.temp - 273.15).toFixed(1) + "°C")).replace("{%city%)",arrData[0].name)
            .replace("{%weathericon%}",myweatherstate)
        res.write(realtime,"utf-8")
        res.end()
    })
    .on("end",function(err){
        console.log("Ended Successfully")
    })
        
    }
})

server.listen(3000,()=>{
    console.log("Server running at port 3000")
})