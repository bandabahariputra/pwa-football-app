const months = [
  'January',
  'February',
  'March',
  'April',
  'Mei',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const date = utcDate => {
  const instance = new Date(utcDate);

  const month = months[instance.getMonth()];
  const date = instance.getDate();

  return `${month} ${date}`;
}

const time = utcDate => {
  const instance = new Date(utcDate);

  let hour = instance.getHours();
  let minute = instance.getMinutes();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;

  return `${hour}:${minute}`;
}

export { date, time }
