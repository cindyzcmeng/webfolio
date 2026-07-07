let savedScrollY = 0;

export function saveScrollY() {
  savedScrollY = window.scrollY;
}

export function getSavedScrollY() {
  return savedScrollY;
}
