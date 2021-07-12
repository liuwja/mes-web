module.exports = {
    publicPath:'./',
    // outputDir: 'mes-web',//构建输出目录
    // assetsDir: 'assets',//静态资源目录
    lintOnSave: false,//是否开启ESLint
    devServer: {
        open: true,
        host: 'localhost',
        port: 8083,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}