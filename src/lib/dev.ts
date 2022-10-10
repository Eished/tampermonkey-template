/**
 * 判断运行环境，阻止本地webpack注入的重复js代码执行
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
  if (window.location.host.includes('localhost')) {
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
