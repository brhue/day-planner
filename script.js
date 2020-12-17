// DOM VARIABLES
let currentDayEl = $('#currentDay');
let containerEl = $('.container');

// VARIABLES
let now = luxon.DateTime.local();
let today = luxon.DateTime.local().startOf('day');
let hours = [9, 10, 11, 12, 13, 14, 15, 16, 17].map(hour => {
  return today.plus({hours: hour});
});

let dayPlansData = localStorage.getItem('plans');

if (!dayPlansData) {
  dayPlansData = {};
} else {
  dayPlansData = JSON.parse(dayPlansData);
}

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
  textArea.attr('data-hour', hour.hour);
  textArea.text(dayPlansData[hour.hour]);
  inputCol.append(textArea);

  let saveBtn = $('<button class="saveBtn w-100 h-100">');
  saveBtn.attr('data-hour', hour.hour);
  saveCol.append(saveBtn);

  let saveIcon = $('<i class="fas fa-save">');
  saveBtn.append(saveIcon);

  row.append(timeCol, inputCol, saveCol);
  containerEl.append(row);
}

$('.container').on('click', '.saveBtn', function(e) {
  let hourToSave = $(this).attr('data-hour');
  let noteToSave = $('textarea[data-hour=' + hourToSave + ']').val()
  dayPlansData[hourToSave] = noteToSave;
  localStorage.setItem('plans', JSON.stringify(dayPlansData));
});