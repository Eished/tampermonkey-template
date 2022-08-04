import { GenericObject } from '@/global';

// POST返回 xml数据类型转换成 字符串或html 模块
function turnCdata(xmlRepo: XMLDocument) {
  const data = xmlRepo.getElementsByTagName('root')[0].childNodes[0].nodeValue;
  if (!data) return '';
  if (replaceHtml(data)) {
    // 如果判断去掉html是否还有文字，否则返回html
    return replaceHtml(data); // 去掉html内容，返回文字
  } else {
    const domParser = new DOMParser();
    const htmlData = domParser.parseFromString(data, 'text/html');
    return htmlData;
  }
}

// URL 参数添加器
function urlSearchParams(object: { [x: string]: string | number }) {
  const searchParamsData = new URLSearchParams();
  for (const key in object) {
    searchParamsData.append(key, String(object[key]));
  }
  return searchParamsData;
}

// 编码统一资源定位符模块
function turnUrl(data: string, type?: boolean) {
  if (type) {
    return decodeURI(data);
  } else {
    return encodeURI(data);
  }
}

// 判断html和字符串是不是html
function checkHtml(htmlStr: string | Document) {
  if (htmlStr instanceof Document) {
    return true;
  } else {
    const reg = /<[^>]+>/g;
    return reg.test(htmlStr);
  }
}

// 过滤html标签、前后空格、特殊符号
function replaceHtml(txt: string) {
  const reg3 = /[\r|\n|\b|\f|\t|\v]+/g; //去掉特殊符号
  const reg = /<.+>/g; //去掉所有<>内内容
  // 先reg3,\n特殊符号会影响reg的匹配
  return txt.replace(reg3, '').replace(reg, '').trim();
}

// promise 等待模块
const waitFor = (ms: number) => new Promise((r) => setTimeout(r, ms));

// n, m 范围随机整数生成
function rdNum(n: number, m: number) {
  const c = m - n + 1;
  return Math.floor(Math.random() * c + n);
}

// 比较键
function compaObjKey(source: GenericObject, target: GenericObject) {
  if (Object.keys(target).length == Object.keys(source).length) {
    // 用户数据匹配
    Object.keys(source).forEach((key) => {
      // https://stackoverflow.com/questions/39282873/object-hasownproperty-yields-the-eslint-no-prototype-builtins-error-how-to
      if (!Object.prototype.hasOwnProperty.call(target, key)) {
        return false;
      }
    });
    return true;
  } else {
    return false;
  }
}

// 赋值对象的值
function copyObjVal(
  target: GenericObject & GenericObject,
  source: GenericObject & GenericObject
): GenericObject & GenericObject {
  Object.keys(source).forEach((key) => {
    if (source[key] && Object.prototype.hasOwnProperty.call(target, key)) {
      target[key] = source[key];
    }
  });
  return target;
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

export {
  turnCdata,
  urlSearchParams,
  turnUrl,
  checkHtml,
  replaceHtml,
  waitFor,
  rdNum,
  compaObjKey,
  copyObjVal,
  getUuiD,
  getVersionNum,
};
