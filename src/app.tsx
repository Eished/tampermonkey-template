export default function () {
  const videoSub = document.querySelector('.layout-Player-videoSub');
  const results = window.location.href.match(/[\d]{6}/);
  if (!videoSub || !results) {
    return;
  }

  const rid = results[0];
  const Clarities = ['全局默认最高画质', '全局默认最低画质'];
  const selectedClarity: string | undefined = GM_getValue(rid);
  const defaultClarity: number | undefined = GM_getValue('defaultClarity');

  const scanClarity = (list: NodeListOf<HTMLLIElement>) => {
    let notFoundCount = 0;
    list.forEach((li) => {
      const availableClarity = li.innerText;
      if (!availableClarity) return;
      GM_registerMenuCommand(availableClarity, () => {
        GM_setValue(rid, availableClarity);
        li.click();
      });
      if (selectedClarity === availableClarity) {
        li.click();
      } else {
        notFoundCount++;
      }
    });

    if (selectedClarity === Clarities[0]) {
      list[0].click();
    } else if (selectedClarity === Clarities[1]) {
      list[list.length - 1].click();
    } else if (notFoundCount === list.length) {
      if (defaultClarity === 0) {
        list[list.length - 1].click();
      } else {
        list[0].click();
      }
    }

    Clarities.forEach((clarity, index) => {
      GM_registerMenuCommand(clarity, () => {
        if (index === 0) {
          list[index].click();
          GM_setValue('defaultClarity', 1);
        } else {
          list[list.length - 1].click();
          GM_setValue('defaultClarity', 0);
        }
      });
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(videoSub, {
    childList: true,
    subtree: true,
  });

  function callback() {
    const controller = videoSub?.querySelector(`[value="画质 "]`);
    if (controller) {
      observer.disconnect();
      const ul = controller.nextElementSibling;
      const list = ul?.querySelectorAll('li');
      list ? scanClarity(list) : console.error('斗鱼直播助手：未找到画质选项');
    }
  }
}
