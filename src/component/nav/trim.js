function trimTitle(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength - 3) + "...";
  } else {
    return title;
  }
}
export default trimTitle;
