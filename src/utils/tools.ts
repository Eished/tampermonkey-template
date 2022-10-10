// URL 参数添加器
function urlSearchParams(object: { [x: string]: string | number }) {
  const searchParamsData = new URLSearchParams();
  for (const key in object) {
    searchParamsData.append(key, String(object[key]));
  }
  return searchParamsData;
}

// promise 等待模块
const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

// n, m 范围随机整数生成
function rdNum(n: number, m: number) {
  const c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}

/**
 * 生成不重复的ID
 * @param { Number } randomLength
 */
function getUuiD(randomLength: number) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}

const getVersionNum = (ver: string): number => {
  return Number(ver.replace(/\./g, ''));
};

export { urlSearchParams, waitFor, rdNum, getUuiD, getVersionNum };
