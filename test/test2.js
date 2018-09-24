function delay(time, str) {
    const promise = new Promise((resolve, rejects) => {
        setTimeout(() => {
            resolve(str);
        }, time);
    });
    return promise;
}

async function creatDelay() {
    // 通过返回值
    const result1 = await delay(3000, "---第一层----");
    console.log(result1);

    const result2 = await delay(2000, "---第二层----");
    console.log(result2);
}
creatDelay();
