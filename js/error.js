// it runs on the browser not vs code

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


//asynchronous
console.log(1);
setTimeout(() => {
    console.log(2)
}, 3000)
console.log(3)


//synchronous 