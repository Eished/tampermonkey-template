import app from '@/app';
import { isTampermonkey } from '@/lib/environment';

if (PRODUCTION) {
  app();
} else {
  // 本地开发时注入页面的js，设置为只在油猴环境运行。
  // 开启压缩后 webpack 在生产环境构建会把这部分代码删掉。
  if (isTampermonkey()) {
    app();
  }
}
