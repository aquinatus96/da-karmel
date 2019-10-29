import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { el, mount } from "redom";
import { TweenMax } from "gsap/TweenMax";
import _ from "lodash";

const calendar = document.getElementById("calendarContent");
new SimpleBar(document.getElementById("simplebar"), {
  forceVisible: true
});

const clientId =
  "409278065804-86msqocmv67nbapsnfvavvic9j0l5s3r.apps.googleusercontent.com";
const apiKey = "AIzaSyBq7dEcP9d-J0PsksALdjg5QxjOD6_LysE";
const timeZone = "Europe/Warsaw";
// IDs of public calendars
const calID = {
  mek: "3hq0oqdfeehnk5toesg5vdi914@group.calendar.google.com",
  dak1: "38ujeqlc0fb7qkivfrpbq2efls@group.calendar.google.com",
  dak2: "f34dk8gg865l98iskuevf4mltk@group.calendar.google.com",
  kplus: "kcpqupk7f45a126fcc5vjvdm64@group.calendar.google.com"
};

// Connect with API
function init() {
  gapi.client
    .init({
      apiKey,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
      ]
    })
    .then(() => getCalendar(calID.dak1));
}

function getCalIDKey(e, CAL_ID) {
  let ID = CAL_ID[e.target.dataset.calendar];
  return getCalendar(ID);
}

function getCalendar(CAL_ID) {
  return gapi.client
    .request({
      path: "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    })
    .then(() => getCalendarEventList(CAL_ID))
    .then(eventList => getFormatedObjArray(eventList))
    .then(events => {
      calendar.innerHTML = "";
      calendar.scrollTop = 0;

      const isCalendarEmpty = events.length !== 0 ? false : true;

      if (isCalendarEmpty) {
        calendar.classList.add("calendar--empty");

        const div = el("div.calendar__empty-box");

        const emptyInfo = el(
          "p.calendar__empty-info",
          "Już niebawem zaktualizujemy ten kalendarz"
        );

        const emptyAnimation = el("span.calendar__animation", "⏳");

        mount(calendar, div);
        mount(div, emptyInfo);
        mount(div, emptyAnimation);
      } else {
        if (calendar.classList.contains("calendar--empty")) {
          calendar.classList = "";
        }

        events.map(event => {
          const {
            eventType,
            eventTitle,
            time: { eventDate, eventDay, eventHours },
            eventLocation,
            isWithTime
          } = event;

          const eventItem = el(".calendar__item", [
            el(".calendar__date", [
              el("span", { dataset: { day: "" } }, eventDay),
              el("p", { dataset: { date: "" } }, eventDate)
            ]),
            el(".calendar__event", [
              el("span", { dataset: { eventType: "" } }, eventType),
              el("p", { dataset: { topic: "" } }, eventTitle),
              el(
                "span",
                { dataset: { event: "" } },
                `${isWithTime ? `${eventHours} / ` : ""}${eventLocation}`
              )
            ])
          ]);

          mount(calendar, eventItem);
        });
      }
    });
}

function getCalendarEventList(CAL_ID) {
  return gapi.client.calendar.events.list({
    timeZone,
    calendarId: CAL_ID,
    singleEvents: true,
    timeMin: new Date().toISOString(), //gathers only events not happened yet
    orderBy: "startTime"
  });
}

function getFormatedObjArray({ result: { items } }) {
  const events = [];

  items.map(({ start: eventTime, summary, location: eventLocation }) => {
    let isWithTime = true;

    if (eventTime.dateTime === undefined) {
      eventTime.dateTime = eventTime.date;
      delete eventTime.date;
      isWithTime = false;
    }

    const date = new Date(`${eventTime.dateTime}`);

    const eventDate = format(date, "d MMM y", { locale: pl });
    const eventDay = format(date, "iiii", { locale: pl });
    const eventHours = format(date, "HH:mm");

    // Trim the first word to check a type of the event
    let eventType = summary.split(": ")[0].toLowerCase();
    // Trim the string to get only the event title which is preceded by ": "
    let eventTitle = summary.substr(summary.indexOf(": ") + 2);

    if (eventType === eventProps.meeting) {
      eventType = eventProps.meeting;
    } else if (type === eventProps.integration) {
      eventType = eventProps.integration;
    } else {
      eventType = eventProps.defaultEventType;
    }

    if (eventLocation === undefined) {
      eventLocation = "Podziemia DA";
    }

    events.push({
      eventType,
      eventTitle,
      time: {
        eventDate,
        eventDay,
        eventHours
      },
      eventLocation,
      isWithTime
    });
  });
  return events;
}

let btn1 = document.querySelector("#mek");
let btn2 = document.querySelector("#dak1");
let btn3 = document.querySelector("#dak2");

btn1.addEventListener("click", e => {
  getCalIDKey(e, calID);
  // activateTab(e);
});
btn2.addEventListener("click", e => {
  getCalIDKey(e, calID);
  // activateTab(e);
});
btn3.addEventListener("click", e => {
  getCalIDKey(e, calID);
  // activateTab(e);
});

const eventProps = {
  meeting: "spotkanie",
  integration: "integracja",
  defaultEventType: "spotkanie",
  defaultEventLocation: "Podziemia DA"
};

const calMenu = document.querySelector(".calendar__menu");
const calMenuItems = document.querySelectorAll(".calendar__menu-item");
const calMenuIndicator = document.querySelector(".calendar__menu-indicator");

const activateTab = e => {
  if (e.target.classList.contains("calendar__menu-item")) {
    calMenuItems.forEach(item => {
      item.classList.remove("calendar__menu-item--active");
    });

    e.target.classList.add("calendar__menu-item--active");
  }
};

calMenu.addEventListener("click", activateTab);

gapi.load("client", init);
