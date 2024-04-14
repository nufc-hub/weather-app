// Returns named day of the week.
function dayGetter(timestamp) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date(timestamp * 1000);
  const dayOfWeekIndex = date.getDay();
  // If dayOfWeekIndex = 0, Sunday will be returned from the daysOfWeek array.
  return daysOfWeek[dayOfWeekIndex];
}

export default dayGetter;
