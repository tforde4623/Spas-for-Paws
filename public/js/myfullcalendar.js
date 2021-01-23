/* eslint-disable prettier/prettier */
$(document).ready(() => {
  $("#dogService").click(() => {
    $("#dog-services").toggle();
  });
  $("#catService").click(() => {
    $("#cat-services").toggle();
  });
  $("#rabbitService").click(() => {
    $("#rabbit-services").toggle();
  });
});

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
        overlap: false,
        constraint: "businessHours",
        extendedProps: { animal: "Dog", apptId: -1 },
      };
    },
  });

  /* initialize the calendar

  -----------------------------------------------------------------*/

  let currentUser = "";
  $.get("/api/user_data").then((data) => {
    currentUser = data.email;
  });

  function toggleModal(displayMessage) {
    $("#msgModal").text(displayMessage);
    const modal = $("#msgModal");
    modal.addClass("is-active");
  }

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
      {
        daysOfWeek: [0, 6],
        startTime: "12:00", // 12
        endTime: "15:00", // 3pm
      },
    ],
    initialView: "timeGridWeek",
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventClick: function(arg) {
      if (currentUser !== arg.event.extendedProps.userEmail) {
        toggleModal("You may only delete your own appointments.");
        arg.revert();
        return;
      }
      if (confirm("Are you sure you want to delete this event?")) {
        if (arg.event.extendedProps.apptId > 0) {
          $.ajax({
            method: "DELETE",
            url: "/api/appointments/" + arg.event.extendedProps.apptId,
          }).then(() => {
            console.log("Deleted appointment", arg.event);
          });
        }
        arg.event.remove();
      }
    },
    eventDrop: function(info) {
      if (currentUser !== info.event.extendedProps.userEmail) {
        toggleModal("You may only modify your own appointments.");
        info.revert();
        return;
      }
      //save to database
      // eslint-disable-next-line vars-on-top
      // eslint-disable-next-line no-var
      const newAppt = {
        id: info.event.extendedProps.apptId,
        // eslint-disable-next-line camelcase
        appointment_time: info.event.start.toISOString(),
      };
      if (info.event.extendedProps.apptId > 0) {
        // Send the update POST request.
        $.ajax("/api/appointments/", {
          type: "PUT",
          data: newAppt,
        }).then(() => {
          console.log("updated appointment", newAppt);
          // Reload the page to get the updated list
          //location.reload();
        });
      }
    },
    eventReceive: function(info) {
      //save to database
      // eslint-disable-next-line vars-on-top
      // eslint-disable-next-line no-var
      const newAppt = {
        email: currentUser,
        // eslint-disable-next-line camelcase
        appointment_time: info.event.start.toISOString(),
        animal: "Dog",
        service: info.event.title,
      };

      // Send the POST request.
      $.ajax("/api/appointments", {
        type: "POST",
        data: newAppt,
      }).then((response) => {
        console.log("created new appointment", newAppt);
        info.event.extendedProps.apptId = response;
        // Reload the page to get the updated list
        location.reload();
      });
    },
    events: function(serviceEvents, callback) {
      //add call to backend mysql database for saved appointments
      $.ajax({
        url: "/api/appointments",
        method: "GET",
      }).then((response) => {
        // eslint-disable-next-line prefer-const
        let serviceEvents = [];
        for (let i = 0; i < response.length; i++) {
          const obj = response[i];
          const ev = {
            title: obj.service + " (" + obj.email.split("@")[0] + ")",
            start: obj.appointment_time,
            overlap: false,
            constraint: "businessHours",
            extendedProps: {
              apptId: obj.id,
              userEmail: obj.email,
            },
          };

          serviceEvents.push(ev);
        }
        callback(serviceEvents);
      });
    },
  });
  calendar.render();
});
