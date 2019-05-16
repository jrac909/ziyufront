export function initWebSocket(id){
    const URL = `ws://localhost:9988/websocket/${id}`;
    let websock = {};
    // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
    websock = new WebSocket(URL);
    console.log("登录成功，用户上线");
    websock.onopen = websocketonopen();
    websock.onerror = websocketonerror();

    return websock;
}
function websocketonopen() {
  console.log("WebSocket连接成功");
}

function websocketonerror(e) {
      console.log("WebSocket连接发生错误");
    }
export function websocketonopen() {
    console.log("WebSocket连接成功");
}
export function websocketonerror(e) {
    console.log("WebSocket连接发生错误");
}
export function websocketonmessage(e) {
    if (e.data) {
        alert("Test:"+e.data);
    }
}
export function websocketclose(e) {
    this.websock.close(); //关闭TCP连接
    console.log("connection closed");
}