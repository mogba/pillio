function isMobile() {
  return window.matchMedia("screen and (max-width: 760px)").matches;
}

export {
  isMobile,
};