let currentTime = new Date()
console.log(currentTime)

let currentTimeLocal = currentTime.toLocaleString()
console.log(currentTimeLocal)

console.log(new Date(currentTimeLocal).toISOString())