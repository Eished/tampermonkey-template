// 开发环境相关工具函数，请勿删除本文件

/**
 * 判断运行环境，阻止 webpack 重复注入 js 代码
 */
export const isTampermonkey = () => {
  let tampermonkey = true;
  try {
    GM_info;
  } catch (err) {
    tampermonkey = false;
  }
  return tampermonkey;
};

/**
 * 提供在线调试热刷新
 */
export const hotReload = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const oldRefresh = GM_getValue('refresh');
    GM_setValue('refresh', !oldRefresh);
  } else {
    const callback = (name: string, oldValue: boolean, newValue: boolean, remote: boolean) => {
      if (remote) {
        window.location.reload();
      }
    };
    GM_addValueChangeListener('refresh', callback);
  }
};

/**
 * 首次运行时自动安装
 */
export const autoInstall = () => {
  const isInstalled = localStorage.getItem(FILENAME);
  if (!isInstalled) {
    window.open(FILENAME, 'self');
    localStorage.setItem(FILENAME, 'Installed');
    alert(
      '第一次自动安装后，请在脚本编辑器内把头文件以外的内容删除，不然会运行两次脚本。（操作：选中并剪切头文件->然后全选->粘贴，覆盖掉其它内容）'
    );
  }
};
