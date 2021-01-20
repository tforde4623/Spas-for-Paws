document.addEventListener("DOMContentLoaded", function () {
  /* initialize the external events
  -----------------------------------------------------------------*/

  var containerEl = document.getElementById("pet-services-list");
  new FullCalendar.Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText.trim(),
      };
    },
  });

  //// the individual way to do it
  // var containerEl = document.getElementById('external-events-list');
  // var eventEls = Array.prototype.slice.call(
  //   containerEl.querySelectorAll('.fc-event')
  // );
  // eventEls.forEach(function(eventEl) {
  //   new FullCalendar.Draggable(eventEl, {
  //     eventData: {
  //       title: eventEl.innerText.trim(),
  //     }
  //   });
  // });

  /* initialize the calendar
  -----------------------------------------------------------------*/

  //add call to backend mysql database for saved appointments
  var serviceEvents = [
    {
      title: "Stored Event 3",
      start: "2021-01-21T13:00:00",
      overlap: false,
      constraint: "businessHours",
    },
    {
      title: "Stored Event 4",
      start: "2021-01-20T11:00:00",
      overlap: false,
      constraint: "businessHours",
    },
  ];

  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay,listMonth",
    },
    height: "auto",
    visibleRange: function (currentDate) {
      // Generate a new date for manipulating in the next step
      var startDate = new Date(currentDate.valueOf());
      var endDate = new Date(currentDate.valueOf());

      // Adjust the start & end dates, respectively
      startDate.setDate(startDate.getDate() - 1); // One day in the past
      endDate.setDate(endDate.getDate() + 30); // 30 days into the future

      return { start: startDate, end: endDate };
    },
    slotMinTime: "08:00:00",
    slotMaxTime: "19:00:00",
    allDaySlot: false,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    nowIndicator: true,
    businessHours: [
      // specify an array instead
      {
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: "08:00", // 8am
        endTime: "19:00", // 7pm
      },
    ],
    initialView: "timeGridWeek",
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventClick: function (arg) {
      if (confirm("Show module to add comments here ")) {
        //arg.event.editable();
      }
    },
    eventSources: [serviceEvents],

    // events: function (serviceEvents, callback) {
    //   //add call to backend mysql database for saved appointments
    //   var serviceEvents = [
    //     {
    //       title: "Stored Event 1",
    //       start: "2021-01-21T13:00:00",
    //       overlap: false,
    //       constraint: "businessHours",
    //     },
    //     {
    //       title: "Stored Event 2",
    //       start: "2021-01-20T11:00:00",
    //       overlap: false,
    //       constraint: "businessHours",
    //     },
    //   ];
    //   callback(serviceEvents);
    // },
  });
  calendar.render();
});
