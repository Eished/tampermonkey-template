import app from './app';

let rid = new URLSearchParams(window.location.search).get('rid');
if (!rid) {
  const results = window.location.pathname.match(/[\d]{1,10}/);
  if (results) {
    rid = results[0];
  } else {
    throw new Error('斗鱼直播助手：未找到直播间id');
  }
}
const videoSub = document.querySelector('.layout-Player-videoSub');

if (rid && videoSub) {
  app(rid, videoSub);
}
