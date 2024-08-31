function titleTrim(title, maxLength) {
  // Ensure title is defined and is a string
  if (typeof title !== "string") {
    return "";
  }

  // Check if the title exceeds the maximum length
  if (title.length > maxLength) {
    // Trim the title and append ellipses
    return title.slice(0, maxLength - 3) + "...";
  } else {
    return title;
  }
}

export default titleTrim;
