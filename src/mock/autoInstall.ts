export const autoInstall = () => {
  const isNewInstall = localStorage.getItem('isNewInstall');
  if (!isNewInstall || isNewInstall === null) {
    window.open(FILENAME, 'self');
    localStorage.setItem('isNewInstall', 'false');
  }
};
