const proxy = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    proxy('/api/', {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }),
    proxy('/public/uploads/', {
      target: 'http://127.0.0.1:7001',
      pathRewrite: {
        '^/public/uploads/': '/public/uploads/'
      }
    }),
    proxy('/socket.io', {
      target: 'http://127.0.0.1:7001',
      // pathRewrite: {
      //   '^/api': ''
      // }
    }),
    // proxy('/api1', {
    //   target: 'http://localhost:3002',
    //   changeOrigin: false,// true时和服务器的target相同，为false时使用的是网站的host
    //   pathRewrite: {
    //     '^/api1': ''
    //   }
    // })
  )
}