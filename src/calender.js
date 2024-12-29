document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

// JavaScript to close the navbar when clicking outside of it
document.addEventListener('click', function (event) {
  const navbar = document.getElementById('navbarNavDropdown');
  const toggler = document.querySelector('.navbar-toggler');

  // Check if the clicked target is not the navbar or the toggler button
  if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
      // Collapse the navbar if it is open
      if (navbar.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbar, {
              toggle: false
          });
          bsCollapse.hide();
      }
  }
});


let lastScrollPosition = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function () {
  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down
    navbar.style.top = '-80px'; // Adjust for navbar height
  } else {
    // Scrolling up
    navbar.style.top = '0';
  }

  lastScrollPosition = currentScrollPosition;
});

// Toast initialization function for multiple toasts
function initializeToasts() {
  const toastButtons = [
      { buttonId: "liveToastBtn", toastId: "liveToast" },
      { buttonId: "liveToastBtn1", toastId: "liveToast1" },
      { buttonId: "toastButton1", toastId: "toast1" },
      { buttonId: "toastButton2", toastId: "toast2" }
  ];

  toastButtons.forEach(({ buttonId, toastId }) => {
      const button = document.getElementById(buttonId);
      const toastElement = document.getElementById(toastId);

      if (button && toastElement) {
          const toastInstance = new bootstrap.Toast(toastElement);
          button.addEventListener("click", () => {
              toastInstance.show();
          });
      }
  });
}

// Run the initialization on page load
document.addEventListener("DOMContentLoaded", initializeToasts);


// Add event listener to the button when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
  const copyButton = document.getElementById("copyButton");
  
  // Attach the event listener to the button
  copyButton.addEventListener("click", copyPhoneNumber);
});

function copyPhoneNumber() {
  // Get the text content of the phone number
  const phoneNumber = document.getElementById("phoneNumber").textContent;

  // Create a temporary input element to copy the text
  const tempInput = document.createElement("input");
  tempInput.value = phoneNumber;
  document.body.appendChild(tempInput);

  // Select the input field and copy the text
  tempInput.select();
  document.execCommand("copy");

  // Remove the temporary input element from the DOM
  document.body.removeChild(tempInput);

  // Change the button text to indicate success
  const copyButton = document.getElementById("copyButton");
  copyButton.textContent = "Copied!";

  // Reset the button text after 2 seconds
  setTimeout(() => {
      copyButton.textContent = "Copy";
  }, 4000);
}



document.addEventListener("DOMContentLoaded", function() {
  updateCalendar();
});

// Days and Months Arrays 
//0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday 6 saturday YYYY-MM-DD
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Event data
const events = [
  { day: 1, date: '2024-10-21', title: "Macakaya ~ Wake", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 1, date: '2024-10-21', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 2, date: '2024-10-22', title: "Macakaya ~ Wake", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 2, date: '2024-10-22', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 3, date: '2024-10-23', title: "Macakaya ~ Wake", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 3, date: '2024-10-23', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 4, date: '2024-10-24', title: "Macakaya ~ Wake", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 4, date: '2024-10-24', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 5, date: '2024-10-25', title: "Macakaya ~ Wake Service Led by Evg. J. Njenga", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 5, date: '2024-10-25', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 6, date: '2024-10-26', title: "Macakaya ~ Wake Service Led by P.C.M.F", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 6, date: '2024-10-26', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 0, date: '2024-10-27', title: "CHURCH SERVICE", time: "03:00 PM", location: "P.C.E.A Kihumo Church, Rironi" },
  { day: 0, date: '2024-10-27', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 1, date: '2024-10-28', title: "Macakaya ~ Wake", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 1, date: '2024-10-28', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 2, date: '2024-10-29', title: "Macakaya ~ Wake Service Led by Women's Guild ", time: "04:00 PM", location: "Gitau Family Residence" },
  { day: 2, date: '2024-10-29', title: "Committee Meeting", time: "07:00 PM", location: "Gitau Family Residence" },
  { day: 3, date: '2024-10-30', title: "FUNERAL SERVICE", time: "08:00 AM", location: "P.C.E.A Kihumo Church, Rironi"}
];

let startOfWeek = new Date();

// Function to update the current day display
function updateCurrentDay() {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const currentDate = today.toISOString().split('T')[0];
  const month = monthsOfYear[today.getMonth()];
  const currentDayText = `<span class="current-details">~ ${daysOfWeek[currentDayIndex]} ~</span><br>${today.getDate()} ${month} ${today.getFullYear()}`;

  const currentDayDiv = document.getElementById("current-day");
  currentDayDiv.innerHTML = `<h4 class="current-day-style">${currentDayText}</h4>`;

  const currentDayEvents = events.filter(event => event.date === currentDate);
  if (currentDayEvents.length > 0) {
    const eventsList = document.createElement("ul");
    for (const event of currentDayEvents) {
      const eventItem = document.createElement("li");
      eventItem.textContent = `${event.title} ${event.time} (${event.location})`;
      eventsList.appendChild(eventItem);
    }
    currentDayDiv.appendChild(eventsList);
  } else {
    const noEventsMsg = document.createElement("p");
    noEventsMsg.textContent = "Date passed";
    currentDayDiv.appendChild(noEventsMsg);
  }
}

// Function to generate the week calendar
function generateWeekCalendar() {
  const weekCalendar = document.getElementById("week-calendar");
  const today = new Date();
  const startOfWeekCopy = new Date(startOfWeek);

  weekCalendar.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.setAttribute("data-day", i);

    const date = new Date(startOfWeekCopy);
    date.setDate(startOfWeekCopy.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add("active");
    }

    const dayText = `${daysOfWeek[date.getDay()]} (${date.getDate()} ${monthsOfYear[date.getMonth()]} ${date.getFullYear()})`;
    dayElement.textContent = dayText;

    const dayEvents = events.filter(event => event.date === formattedDate);
    if (dayEvents.length > 0) {
      const eventsList = document.createElement("ul");
      for (const event of dayEvents) {
        const eventItem = document.createElement("li");
        eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
        eventsList.appendChild(eventItem);
      }
      dayElement.appendChild(eventsList);
    } else {
      const noEventsMsg = document.createElement("p");
      noEventsMsg.textContent = "No Activities";
      dayElement.appendChild(noEventsMsg);
    }

    weekCalendar.appendChild(dayElement);
  }
}

// Function to check and display event indicators (dots) on navigation buttons
function checkForScheduledEvents() {
  const prevWeekButton = document.getElementById('prev-week');
  const nextWeekButton = document.getElementById('next-week');

  let hasPreviousWeekEvents = false;
  let hasNextWeekEvents = false;

  const prevWeekStart = new Date(startOfWeek);
  prevWeekStart.setDate(startOfWeek.getDate() - 7);
  const nextWeekStart = new Date(startOfWeek);
  nextWeekStart.setDate(startOfWeek.getDate() + 7);

  // Check previous week
  for (let i = 0; i < 7; i++) {
    const date = new Date(prevWeekStart);
    date.setDate(prevWeekStart.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (events.some(event => event.date === formattedDate)) {
      hasPreviousWeekEvents = true;
      break;
    }
  }

  // Check next week
  for (let i = 0; i < 7; i++) {
    const date = new Date(nextWeekStart);
    date.setDate(nextWeekStart.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (events.some(event => event.date === formattedDate)) {
      hasNextWeekEvents = true;
      break;
    }
  }

  // Update button indicators
  if (hasPreviousWeekEvents) {
    prevWeekButton.classList.add('has-events');
    prevWeekButton.style.setProperty('--dot-color', 'blue'); // Custom color for prev button
  } else {
    prevWeekButton.classList.remove('has-events');
  }

  if (hasNextWeekEvents) {
    nextWeekButton.classList.add('has-events');
    nextWeekButton.style.setProperty('--dot-color', 'red'); // Default red color for next button
  } else {
    nextWeekButton.classList.remove('has-events');
  }
}

// Function to navigate weeks
function navigateWeek(direction) {
  if (direction === 'prev') {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
  } else if (direction === 'next') {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  updateCalendar();
}

// Function to update the calendar and event indicators
function updateCalendar() {
  updateCurrentDay();
  generateWeekCalendar();
  checkForScheduledEvents();
}

// Initial check on page load
window.addEventListener('DOMContentLoaded', (event) => {
  // Set startOfWeek to the beginning of the current week (Sunday)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  updateCalendar();  // Initialize the calendar
  checkForScheduledEvents();  // Ensure the dots show correctly on load
});

// Update calendar every minute (60000 milliseconds)
setInterval(updateCalendar, 60000);
