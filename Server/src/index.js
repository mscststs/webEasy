import app from "./app"
import http from "http"

let server;
server = http.createServer(app)

let currentApp = app;
server.listen(80);


if (module.hot) {
    module.hot.accept('./app', () => {
        server.removeListener('request', currentApp)
        server.on('request', app)
        currentApp = app
    })
}