const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = app => {
    app.use(
        createProxyMiddleware("/", {
            target: "https://chocolatevistaapi.infinityfreeapp.com",
            changeOrigin: true
        })
    )
}