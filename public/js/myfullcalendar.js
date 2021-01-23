/* eslint-disable prettier/prettier */

document.addEventListener("DOMContentLoaded", () => {
  /* initialize the external events
  -----------------------------------------------------------------*/
  const containerEl = document.getElementById("pet-services-list");
  new FullCalendar.Draggable(containerEl, {
    itemSelector: ".fc-event",
    eventData: function(eventEl) {
      return {
        // eslint-disable-next-line prettier/prettier
        title: eventEl.innerText.trim(),
      };
    },
  });

  /* initialize the calendar

  -----------------------------------------------------------------*/

  // apiroutes.get("/api/appointments").then((data) => {
  //   console.log("getting appointments", data);
  //   for (let i = 0; i < data.length; i++) {
  //     let obj = data[i];
  //     let ev = {
  //       title: obj.service,
  //       start: obj.appointment_time,
  //       overlap: false,
  //       constraint: "businessHours",
  //     };
  //     appointments.push(ev);
  //   }
  // });

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getMonth() +
      1 +
      "/" +
      date.getDate() +
      "/" +
      date.getFullYear() +
      "  " +
      strTime
    );
  }

  const calendarEl = document.getElementById("calendar");
  const calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "timeGridWeek,timeGridDay,listMonth",
    },
    height: "auto",
    visibleRange: function(currentDate) {
      // Generate a new date for manipulating in the next step
      const startDate = new Date(currentDate.valueOf());
      const endDate = new Date(currentDate.valueOf());

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
        daysOfWeek: [1, 2, 3, 4, 5],
        startTime: "08:00", // 8am
        endTime: "19:00", // 7pm
      },
    ],
    initialView: "timeGridWeek",
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    // eventClick: function() {
    //   if (confirm("Show module to add comments here ")) {
    //     //arg.event.editable();
    //   }
    // },
    eventDragStop: function(info) {
      if (
        !confirm(
          "Thank you for scheduling " +
            info.event.title +
            "!\n Please confirm " +
            formatDate(info.event.start) +
            " time slot."
        )
      ) {
        info.revert();
      } else {
        //save to database
        // eslint-disable-next-line vars-on-top
        // eslint-disable-next-line no-var
        const newAppt = {
          email: "sharon@test.com",
          appointment_time: info.event.start.toISOString(),
          animal: "Dog",
          service: info.event.title,
        };

        // Send the POST request.
        $.ajax("/api/appointments", {
          type: "POST",
          data: newAppt,
        }).then(() => {
          console.log("created new appointment", newAppt);
          // Reload the page to get the updated list
          //location.reload();
        });
      }
    },
    eventReceive: function(info) {
      if (
        !confirm(
          "Thank you for scheduling " +
            info.event.title +
            "!\n Please confirm " +
            formatDate(info.event.start) +
            " time slot."
        )
      ) {
        info.revert();
      } else {
        //save to database
        // eslint-disable-next-line vars-on-top
        // eslint-disable-next-line no-var
        const newAppt = {
          email: "sharon@test.com",
          appointment_time: info.event.start.toISOString(),
          animal: "Dog",
          service: info.event.title,
        };

        // Send the POST request.
        $.ajax("/api/appointments", {
          type: "POST",
          data: newAppt,
        }).then(() => {
          console.log("created new appointment", newAppt);
          // Reload the page to get the updated list
          //location.reload();
        });
      }
    },
    events: function(serviceEvents, callback) {
      //add call to backend mysql database for saved appointments
      $.get("/api/appointments", (data) => {
        const serviceEvents = [];
        console.log("appointments", data);
        for (let i = 0; i < data.length; i++) {
          const obj = data[i];
          const ev = {
            title: obj.service,
            start: obj.appointment_time,
            overlap: false,
            constraint: "businessHours",
          };
          serviceEvents.push(ev);
        }
        console.log("appointments", serviceEvents);
      });
      callback(serviceEvents);
    },
  });
  calendar.render();
});