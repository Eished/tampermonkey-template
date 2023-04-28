以斗鱼直播自动切换清晰度作为示例的油猴脚本开发模板

使用此模板发开油猴脚本的[视频教程](https://www.bilibili.com/video/BV1oB4y1478c) or [文字教程](https://iknow.fun/2022/08/03/vscode-webpack-typescript-you-hou-kai-fa-huan-jing-da-jian-ben-di-diao-shi-shi-shi-re-shua-xin-zi-dong-gou-jian-he-fa-bu/)

使用此模板[创建油猴脚本项目](https://github.com/Eished/monkey-template/generate)

## 特性

- [x] 配置简单，和前端工程化开发框架一致的开发体验
- [x] 支持本地网页自动热刷新和目标网站自动热刷新
- [x] 支持本地模拟目标网站，网页加载速度快，大幅提高开发效率
- [x] 使用 TypeScript + ESlint 实现类型检查、错误修正、智能补全和自动格式化
- [x] 支持使用 `@require` 引入依赖，减小脚本大小
- [x] 支持 Tampermonkey API 提示和自动补全
- [x] 第一次运行时自动安装新油猴脚本

## 开发环境

`Node.js 14+`

`npm or yarn`

## 开发语言

`TypeScript` or `JavaScript`

## 修改配置文件

先在 Chrome 浏览器管理扩展程序页 `chrome://extensions/` 内，点击油猴插件详情，打开允许访问文件网址选项。

然后修改开发环境油猴头文件信息：[`config/dev.meta.json`](config/dev.meta.json) 内下述代码改为自己存放项目的文件路径。

```json
"require": ["file://<你的文件路径>/tampermonkey-template/dist/douyu.dev.user.js"]
```

> 油猴头文件默认配置在 [`config/common.meta.json`](config/common.meta.json)，按需修改。

## 启动项目

安装依赖：`npm install` or `yarn install`

VSCode 内 `ctrl + shift + B` 选择 `start & dev`

> `ctrl shift B` 选择 `start & dev` 实际运行了两个命令，单独运行也可以：
>
> - `npm run start` devServer 提供 web 服务和网页热刷新功能
>
> - `npm run dev` 生成脚本，让 tampermonkey 使用

### 自动安装脚本：

第一次启动项目时，将会自动安装油猴脚本，但安装完要去编辑器内把头文件以外的内容删除，不然会运行两次脚本。（操作：选中并剪切头文件->然后全选->粘贴，覆盖掉其它内容）

### 或手动安装：

[`dist/douyu.dev.user.js`](dist/douyu.dev.user.js) 复制油猴**头文件**，在浏览器油猴插件新建脚本，粘贴进去，刷新浏览器打开的本地页面，看到可选择的清晰度选项时油猴脚本即正常运行。

## 开发和调试脚本

### 本地调试方法 1：

把目标网站的静态资源 `html、css、JavaScript` 等下载到本地，复制到 `public` 文件夹下，插入到 `index.html` 即可本地调试脚本静态功能。

### 本地调试方法 2（本模板采用的方法）：

如果不能下载，需要先分析其运行逻辑，在 [`src/mock`](src/mock) 文件夹内添加模拟运行逻辑，以方便本地调试。

> 不需要模拟可以删除 mock 文件夹并在 [`src/index.ts`](src/index.ts) 中移除引入。

### 开发脚本：

在 [`src/app.ts`](src/app.ts) 内开发自己的油猴脚本。

> 确保 `app.ts` 的默认导出函数是入口函数，否则可能影响 webpack 打包。

### 在线调试

本地调试目标网站 API 网络请求时会有跨域问题，涉及网络请求的脚本需要使用在线调试。

注意：在目标网站上调试时不能关闭本地调试的网页窗口，目标网站自动热刷新依赖于本地网页运行的油猴脚本。

## 发布项目

### 自动发布

默认上传到 GitHub 触发 Actions 自动构建到主分支的 [`dist/`](dist/) 目录下，使用 Greasyfork 自动发布参考[视频教程](https://www.bilibili.com/video/BV1oB4y1478c)。

### 手动发布

运行 `npm run build`

生成文件文件：[`dist/douyu.user.js`](dist/douyu.user.js)

## 适应其它网站

修改油猴头文件 [`config/common.meta.json`](config/common.meta.json) 的 `match` 内容

```json
"match": "*://*.<目标网站>/*",
```

## 修改输出文件名

修改 [`package.json`](package.json) 里面 `filename=<新文件名>`

```json
 "scripts": {
    "start": "xxxxx --env filename=douyu.dev.user.js", // 开发环境脚本的文件名
    "dev": "xxxxx --env filename=douyu.dev.user.js", // 开发环境脚本的文件名
    "build": "xxxx --env filename=douyu.user.js", // 生产环境脚本的文件名
  },
```

## 引入 CSS

默认支持 css 和 less，参考 [`src/mock/douyu.less`](src/mock/douyu.less)

## 安装依赖

`npm install <安装的包名>` 或者 `yarn add <安装的包名>`，Webpack 会自动将依赖打包进 [`dist/douyu.user.js`](dist/douyu.user.js)。

### 排除依赖项减小脚本大小

脚本大小不能超过 2.0 MB。如果您的脚本接近此限制，可能需考虑：

- 将 URI、JSON 等非代码数据移出脚本。
- 使用 `@require` 或 [webpack 的 `externals` 选项](https://webpack.js.org/configuration/externals/)加载库。

以 `jquery` 举例：

```bash
# 安装jquery
npm install jquery
# 安装jquery类型声明作为开发依赖
npm install @types/jquery -D
```

[`config/common.meta.json`](https://github.com/Eished/tampermonkey-template/blob/externals/config/common.meta.json)

```javascript
"require": ["https://code.jquery.com/jquery-3.6.3.slim.min.js"] // 版本要和 package.json 中的对应
```

[`config/webpack.prod.js`](https://github.com/Eished/tampermonkey-template/blob/externals/config/webpack.prod.js)

```javascript
baseOptions.externals = {
  jquery: '$', // 排除项
};
```

### 启用代码压缩：

> 注意：提交到 Greasy Fork 的代码不得混淆或最小化。如果脚本使用了 WebPack 之类的工具打包，则必须以非最小化的形式输出，保留空白和变量名。

开启代码压缩：[`config/webpack.config.base.js`](config/webpack.config.base.js)

```javascript
optimization: {
  minimize: true,
  ...
}
```

## 使用网站已有的全局变量

[`src/global.d.ts`](src/global.d.ts)

```typescript
declare global {
  //  在这里声明要用到的全局函数或变量
}
```

## 在线网页热刷新的实现

受到 `scriptcat` 后台脚本与油猴脚本通信方式的启发，使用 `GM_addValueChangeListener` 来实现在线调试自动热刷新。

本地修改文件后会更新 `localhost` 网页，`localhost` 网页的油猴脚本会修改 `refresh` 的值，在线网页运行的油猴脚本会监听这个值的变化来刷新自己。

## HMR 热模块替换

由于油猴插入的 JavaScript 运行在油猴环境，不支持 HMR，仅支持 live reload 热重载，默认开启热重载。

在本地模拟环境中的 JavaScript 是 webpack 打包的，支持 HMR，需要大量本地模拟时可自行开启 HMR。

开启 HMR：[`config/webpack.dev.js`](config/webpack.dev.js)

```javascript
baseOptions.devServer = {
  ...
  hot: true,
  liveReload: false,
  ...
};
```

## 使用 JavaScript 开发

将文件后缀改为 `.js` 即可

[`.eslintrc.js`](.eslintrc.js) 加入规则，用于忽略未定义的值报错以兼容油猴 API

```javascript
  rules: {
    ...
    'no-undef': 'off',
  },
```

如果想让 JavaScript 支持类型检查，在 `tsconfig.json` 修改 `"checkJs": true`

## 一些实用的库

跨域网络请求参考：[`src/lib/ajax.ts`](src/lib/ajax.ts)

消息通知参考：[`src/lib/message.ts`](src/lib/message.ts)

> 不需要则可以删除 lib 文件夹。

## 参考项目及其文档

https://github.com/the1812/Bilibili-Evolved

https://github.com/Eished/jkforum_helper

https://github.com/lisonge/vite-plugin-monkey
