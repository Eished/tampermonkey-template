## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

`TypeScript` or `JavaScript`

## 修改配置文件

修改开发环境油猴头文件信息：

`config/dev.meta.json`

```json
"require": ["file://<你的文件路径>/douyu-helper/dist/douyu.dev.user.js"]
```

改为自己存放项目的文件路径。

油猴头文件默认配置在 `config/common.meta.json`，按需修改。

## 启动项目

`ctrl shift B` 选择 `start & dev`

> VSCode Task See https://go.microsoft.com/fwlink/?LinkId=733558

第一次启动时，将会自动安装油猴脚本，但安装完要去编辑器内把头文件以外的内容删除，不然会运行两次脚本。（操作：选中并剪切头文件->然后全选->粘贴，覆盖掉其它内容）

或者手动安装：

`dist/douyu.dev.user.js` 复制油猴**头文件**，在浏览器油猴插件新建脚本，粘贴进去，刷新打开的本地页面，油猴脚本即可正常运行。

`ctrl shift B` 选择 `start & dev` 实际运行了两个命令，单独运行也可以：

- `yarn start` devServer 提供 web 服务和网页热刷新功能

- `yarn dev` 生成脚本，让 tampermonkey 使用

## 在本地调试脚本

把目标网站的静态资源（`html、JavaScript`）下载，复制到 `public` 文件夹下，插入到 `index.html` 即可本地调试脚本静态功能。

如果不能下载，需要先分析其运行逻辑，在 `src/mock` 文件夹内添加模拟运行逻辑，以方便本地调试。

在 `src/app.ts` 编写油猴代码，确保 `app.ts` 的默认导出函数是入口函数，否则可能影响 webpack 打包。

## 在线调试

受到 `scriptcat` 后台脚本与油猴脚本通信方式的启发，使用 `GM_addValueChangeListener` 来实现在线调试自动热刷新。

本地修改文件后会更新 `localhost` 网页，`localhost` 网页的油猴脚本会修改 `refresh` 的值，在线网页运行的油猴脚本会监听这个值的变化来刷新自己。

## 手动发布项目

`yarn build`

生成文件文件：`douyu-helper\dist\douyu.user.js`

## 适应其它网站

修改油猴头文件 `config/common.meta.json` 的 `"match": "*://*.xxx.com/*",`

## 使用 JavaScript 开发

将文件后缀改为 `.js` 即可

`.eslintrc.js` 加入规则，用于忽略未定义的值报错以兼容油猴 API

```javascript
  rules: {
    ...
    'no-undef': 'off',
  },
```

如果想让 JavaScript 支持类型检查，在 `tsconfig.json` 修改 `"checkJs": true`

## 修改输出文件名

修改 `package.json` 里面 `filename=<新文件名>`

```javascript
 "scripts": {
    "start": "xxxxx --env filename=douyu.dev.user.js",
    "dev": "xxxxx --env filename=douyu.dev.user.js",
    "build": "xxxx --env filename=douyu.user.js",
  },
```

## 一些实用的库

网络请求：

`src/lib/ajax.ts`

消息通知：

`src/lib/message.ts`

## 关于 HMR 热模块替换

由于油猴插入的 JavaScript 运行在油猴环境，不支持 HMR，仅支持 live reload 热重载，默认开启热重载。

在本地模拟环境中的 JavaScript 是 webpack 打包的，支持 HMR，需要大量本地模拟时可自行开启 HMR。

开启 HMR：`config/webpack.dev.js`

```javascript
baseOptions.devServer = {
  static: [
    {
      directory: path.join(__dirname, '../public'),
    },
    {
      directory: path.join(__dirname, '../dist'),
    },
  ],
  compress: true,
  port: 8080,
  hot: true,
  open: true,
  liveReload: false,
};
```

## 参考项目及其文档

https://github.com/the1812/Bilibili-Evolved

https://bilibili-evolved-doc.vercel.app/developer

https://github.com/lisonge/vite-plugin-monkey
