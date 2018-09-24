

// 方法一:
// const promise = new Promise((resolve,rejects)=>{
//     const random = Math.random()
//     console.log(random);
//     // 如果成果就把参数返回
//     if(random>0.5){
//         resolve({status:0,message:'success'})
//     }else {
//         rejects(new Error())
//     }
    
// })

// // promise.then(result=>{
// //     console.log(result);
    
// // },error=>{
// //     console.log(error);
    
// // })
// promise.then(result=>{
//     console.log(result);
    
// }).catch(error=>{
//     console.log(error);
    
// })
//setTimeout(() => {
//    console.log("---第一层----")
//    setTimeout(() => {
//        console.log("---第二层----")
//        setTimeout(() => {
//            console.log("---第三层----")
//            setTimeout(() => {
//                console.log("---第四层----")
//            }, 2000);
//        }, 1000);
//    }, 3000);
//}, 2000);
// 方法二:解决回调地狱
// 写一个构造函数 , 返回一个新的promise

function delay(time,str){
    const promise = new Promise((resolve,rejects)=>{
        setTimeout(() => {
            resolve(str)
        }, time);
    })
    return promise
}

// delay(2000,"---第一层----").then(reslut=>{
//    return delay(3000,"---第二层----")
//})返回了一个新的promise
delay(2000,"---第一层----").then(reslut1=>{
    console.log(reslut1);  
    return delay(3000,"---第二层----")
}).then(result2=>{
    console.log(result2);  
    return delay(1000,"---第三层----")
}).then(reslut3=>{
    console.log(reslut3);  
    return delay(2000,"---第四层----")
}).then(result4=>{
    console.log(result4);  
})