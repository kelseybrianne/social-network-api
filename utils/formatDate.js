const formatDate = (timestamp) => {
  const dateObj = new Date(timestamp);

  let hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  hour > 12 ? (hour -= 12) : (hour = hour);

  return `${hour}:${minute}`;
};

module.exports = formatDate;
