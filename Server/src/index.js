import app from "./app"
import http from "http"
import config from "./config"

let server;
let currentApp = app;



server = http.createServer(app)
server.listen(80);


if (module.hot) {
    module.hot.accept('./app', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}