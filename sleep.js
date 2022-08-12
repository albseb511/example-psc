
function sleep(delay){
    return new Promise((res,rej)=>{
        console.log("checking if its a number")
        if( typeof delay !== "number" ){
            rej("delay needs to be a number")
        }
        console.log("checking if its > 0")
        if(delay < 0){
            rej("delay needs to be greater than 0")
        }
        console.log("running set timeout")
        setTimeout(()=>{
            res("Success!")
        },delay)
    })
}
sleep(3000).then(res=>{
    console.log(res)
})