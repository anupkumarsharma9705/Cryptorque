(function () {
  try {
    var saved = localStorage.getItem('aks-theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
