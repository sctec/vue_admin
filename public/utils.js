function formatDate(str) {
  let year = str.toString().slice(0, 4);
  let month = str.toString().slice(4, 6);
  let day = str.toString().slice(6, 8);
  return year + "-" + month + "-" + day;
}

export {formatDate}