// DOM VARIABLES
let currentDayEl = $('#currentDay');
let containerEl = $('.container');

// VARIABLES
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let now = luxon.DateTime.local();

currentDayEl.text(now.toLocaleString(luxon.DateTime.DATE_HUGE));

hours.forEach(hour => {
  let currentHour = now.hour;
  let whenInTime = '';
  if (hour < currentHour) {
    whenInTime = 'past';
  } else if (hour == currentHour) {
    whenInTime = 'present';
  } else {
    whenInTime = 'future';
  }
  createRow(hour, whenInTime);
});

function createRow(hour, when) {
  let row = $('<div class="row">');
  let timeCol = $('<div class="col">');
  let inputCol = $('<div class="col">');
  let saveCol = $('<div class="col">');

  let hourEl = $('<p class="hour">');
  if (hour > 12) {
    hour -= 12;
    hourEl.text(hour + 'PM');
  } else {
    hourEl.text(hour + 'AM');
  }
  timeCol.append(hourEl);

  let textArea = $('<textarea class="' + when + '">');
  inputCol.append(textArea);

  let saveBtn = $('<button class="saveBtn">');
  saveCol.append(saveBtn);

  let saveIcon = $('<i class="fas fa-save">');
  saveBtn.append(saveIcon);

  row.append(timeCol, inputCol, saveCol);
  containerEl.append(row);
}