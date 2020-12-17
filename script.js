// DOM VARIABLES
let currentDayEl = $('#currentDay');
let containerEl = $('.container');

// VARIABLES
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];

currentDayEl.text(luxon.DateTime.local().toLocaleString(luxon.DateTime.DATE_HUGE));

hours.forEach(hour => {
  let row = $('<div class="row">');
  let timeCol = $('<div class="col">');
  let inputCol = $('<div class="col">');
  let saveCol = $('<div class="col">');

  let hourEl = $('<p class="hour">');
  hourEl.text(hour);
  timeCol.append(hourEl);

  let textArea = $('<textarea>');
  inputCol.append(textArea);

  let saveBtn = $('<button class="saveBtn">');
  saveCol.append(saveBtn);

  let saveIcon = $('<i class="fas fa-save">');
  saveBtn.append(saveIcon);

  row.append(timeCol, inputCol, saveCol);
  containerEl.append(row);
});