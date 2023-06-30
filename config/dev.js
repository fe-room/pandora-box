module.exports = {
  env: {
    NODE_ENV: '"development"',
  },
  // 声明的变量要去types 目录下同步
  defineConstants: {
    BASE_URL: JSON.stringify('http://192.168.99.62:8000/'),
  },
  mini: {
    webpackChain: (chain, webpack) => {
      chain.merge({
        plugin: {
          install: {
            plugin: require('terser-webpack-plugin'),
            args: [
              {
                terserOptions: {
                  compress: true, // 默认使用terser压缩
                  // mangle: false,
                  keep_classnames: true, // 不改变class名称
                  keep_fnames: true, // 不改变函数名称
                },
              },
            ],
          },
        },
      })
    }
  },
  h5: {}
}
