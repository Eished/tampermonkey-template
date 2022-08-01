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
