// je kono promise er 3ta strep thake
// 1. pending
// 2. resoved
// 3. rejected


const myPromise = new Promise((resove, reject) => {
    const user = null
    if(!user){
        reject("Data have been no fount")
    }else{
        setTimeout(()=>{
            resove("data have sucssesfully don")
        },1000)
    }
})

myPromise.than(res => console.log("fount in than", res)).catch(error => console.log("fount in catch", error))