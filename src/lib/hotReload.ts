const hotReload = () => {
  if (window.location.host.includes('localhost')) {
    const oldRefresh = GM_getValue('refresh');
    GM_setValue('refresh', !oldRefresh);
  }

  if (!window.location.host.includes('localhost')) {
    const callback = (name: string, oldValue: boolean, newValue: boolean, remote: boolean) => {
      if (remote) {
        window.location.reload();
      }
    };
    GM_addValueChangeListener('refresh', callback);
  }
};
export { hotReload };
