export function genToken(){
    return Math.floor(Math.random() * 8999 + 1000).toString()
}