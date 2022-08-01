import app from '@/app';
import { isTampermonkey } from '@/lib/environment';

if (PRODUCTION) {
  app();
} else {
  // 本地可开发时注入页面的js，不是油猴环境则不运行。
  // 开启压缩后 webpack 在生产环境构建会把这部分代码删掉。
  if (isTampermonkey()) {
    app();
  }
}
