export const autoInstall = () => {
  const isNewInstall = localStorage.getItem('isNewInstall');
  if (!isNewInstall) {
    window.open(FILENAME, 'self');
    localStorage.setItem('isNewInstall', 'false');
  }
};
