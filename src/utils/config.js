/**
 * Config options:
 * - wallpaper
 * - open in window
 */

function loadConfig() {
  config = safeParse(localStorage.getItem(LS_CONFIG_KEY)) || {};
  applyConfig();
}

function applyConfig() {
  // Load all properties
  loadWallpaper();
}

function saveConfig() {
  localStorage.setItem(LS_CONFIG_KEY, JSON.stringify(config));
}

function updateConfig() {
  const wallpaper = document.getElementById('wallpaper-input').value;
  const internalWebpages = document
    .getElementById('internal-webpages-input')
    .classList.contains('active');
  const newTab = document
    .getElementById('tab-webpages-input')
    .classList.contains('active');
  config = {
    ...config,
    wallpaper,
    internalWebpages,
    newTab
  };
  applyConfig();
  saveConfig();
  Object.keys(windows).forEach(redrawWindow);
}

function loadWallpaper() {
  const httpsRegex = /(http:\/\/)|(https:\/\/)/g
  const colorRegex = /(rgb)|(rgba)|(^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$)/g
  const el = document.getElementById('desktop');
  if (config.wallpaper) {
    if (
      httpsRegex.test(config.wallpaper)
    ) {
      el.style['background-image'] = `url("${config.wallpaper}")`;
    }
    if (
      colorRegex.test(config.wallpaper)
    ) {
      el.style['background-color'] = config.wallpaper;
    }
  } else {
    el.style['background-color'] = null;
    el.style['background-image'] = null;
  }
}

function toggleButton(id, labels) {
  const el = document.getElementById(id);
  if (el.classList.contains('active')) {
    el.innerText = labels[1];
    return el.classList.remove('active');
  }

  el.innerText = labels[0];
  el.classList.add('active');
}
