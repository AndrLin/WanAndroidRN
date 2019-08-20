# run
``` 
cd WanAndroidRN
npm install
```
android

``` bash
react-native run-android
```

ios

``` bash
react-native run-ios
```

# 目录结构说明

| 目录 | 说明 |
| :- | :-|
| `__tests__` | 测试文件目录
| `android` | Android工程目录
| `ios` | iOS工程目录
| `node_modules` | node依赖产生的第三方包
| `.buckconfig` | buck的配置文件，buck是Facebook开源的高效编译系统
| `.eslintrc.js` | ESLint配置文件
| `.flowconfg` | flow的配置文件，flow用于静态代码检查，用来捕获常见的 bugs，比如隐式类型转换，空引用等
| `.gitattributes` | git属性文件设定一些项目特殊的属性。比如比较word文档的不同；对strings程序进行注册；合并冲突的时候不想合并某些文件等；
| `.gitignore` | 用来配置git提交需要忽略的文件
| `.watchmanconfig` | Watchman的配置文件，用于监控bug文件和文件变化，并且可以出发指定的操作
| `App.js` | 默认的入口组件
| `app.json` | 默认生成的，在`index.js`中有用，里面定义有组件名称
| `babel.config.js` | babel配置文件,Babel是一个广泛使用的转码器，比如可以将ES6代码转为ES5代码，从而在现有环境执行。用来设置转码规则和插件；
| `index.js` | 程序入口文件
| `metro.config.js` | metro配置文件，Metro是一个JavaScript的打包工具。
| `package.json` | 项目基本信息（比如名称、版本、许可证等元数据）以及依赖信息（npm install安装的模块）等；
| `yarm.lock` | Yarn 是 一个由 Facebook 创建的新 JavaScript 包管理器；每次添加依赖或者更新包版本，yarn都会把相关版本信息写入yarn.lock文件。这样可以解决同一个项目在不同机器上环境不一致的问题。

