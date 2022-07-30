## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

## 启动项目

`ctrl shift B` 选择 `start: style & dev`

VSCode Task See https://go.microsoft.com/fwlink/?LinkId=733558

在浏览器油猴插件新建脚本，`douyu.dev.user.js` 复制油猴**头文件**并加入：

```javascript
// @require       file://<你的文件路径>/douyu-helper\dist\douyu.dev.user.js
```

## 在本地调试脚本

油猴头文件加入 `// @match http://localhost:8080/*`

`start: style & dev` 启动项目，然后 `yarn start`

把目标网站的静态 `html` 文件复制到 `public` 文件夹下，插入到 `index.html` 即可本地调试脚本静态功能。

- `yarn start` devServer 提供 web 服务和网页热刷新功能

- `start: style & dev` 生成脚本，让 tampermonkey 使用

## 发布项目

`yarn build`

生成文件文件：`douyu-helper\dist\douyu.user.js`

### splitchunks 拆包，减小发布体积

> 生成主文件发布，生成的 module 文件使用 `@require` 从自己代码库的 CDN 导入
>
> 实测提示：Code 使用了一个未经批准的外部脚本，无法发布。

## 适应其它网站

修改油猴头文件 `src/common.meta.json` 的 `"match": "*://*.xxx.com/*",`

## 参考项目及其文档

https://bilibili-evolved-doc.vercel.app/developer
