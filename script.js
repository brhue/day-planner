// DOM VARIABLES
let currentDayEl = $('#currentDay');
let containerEl = $('.container');

// VARIABLES
let now = luxon.DateTime.local();
let today = luxon.DateTime.local().startOf('day');
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => {
  return today.plus({hours: hour});
});

currentDayEl.text(now.toLocaleString(luxon.DateTime.DATE_HUGE));

hours.forEach(hour => {
  let currentHour = now.hour;
  let whenInTime = '';
  if (hour.hour < currentHour) {
    whenInTime = 'past';
  } else if (hour.hour == currentHour) {
    whenInTime = 'present';
  } else {
    whenInTime = 'future';
  }
  createRow(hour, whenInTime);
});

function createRow(hour, when) {
  let row = $('<div class="row no-gutters">');
  let timeCol = $('<div class="col time-block">');
  let inputCol = $('<div class="col-10">');
  let saveCol = $('<div class="col">');

  let hourEl = $('<p class="hour">');
  hourEl.text(hour.toLocaleString(luxon.DateTime.TIME_SIMPLE));
  timeCol.append(hourEl);

  let textArea = $('<textarea class="w-100 h-100 ' + when + '">');
  inputCol.append(textArea);

  let saveBtn = $('<button class="saveBtn w-100 h-100">');
  saveCol.append(saveBtn);

  let saveIcon = $('<i class="fas fa-save">');
  saveBtn.append(saveIcon);

  row.append(timeCol, inputCol, saveCol);
  containerEl.append(row);
}