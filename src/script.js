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

//img-dog
document.querySelectorAll('img').forEach((img) => {
  img.oncontextmenu = () => false; // Disable right-click context menu
  img.ondragstart = () => false;   // Disable drag

  // Prevent long-press context menu on mobile
  img.addEventListener('touchstart', (e) => {
      e.preventDefault(); // Prevent long press without affecting swipe
  });
});


//alert toast
document.addEventListener('DOMContentLoaded', function () {
  var pbnjToast = new bootstrap.Toast(document.getElementById('pbnjToast'), {
    delay: 10000 //seconds
  });
  pbnjToast.show();
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


document.addEventListener('DOMContentLoaded', function() {
  var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Close all other sections
    for (var j = 0; j < coll.length; j++) {
      if (coll[j] !== this) {
        coll[j].classList.remove("active");
        coll[j].nextElementSibling.style.maxHeight = null;
      }
    }
    
    // Toggle the current section
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
});

document.addEventListener("DOMContentLoaded", function() {
  var buttons = document.querySelectorAll(".ayaBtn");

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      var parentLi = this.closest('.aya-topic', 'p'); 
      var dots = parentLi.querySelector(".dots");
      var moreText = parentLi.querySelector(".more");
      
      if (dots.style.display === "none") {
        dots.style.display = "inline";
        this.innerHTML = "Read More"; 
        moreText.style.display = "none";
      } else {
        dots.style.display = "none";
        this.innerHTML = "Read Less"; 
        moreText.style.display = "inline";
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var toggleMapButton = document.querySelector(".toggleMap");
  var mapSection = document.querySelector("#collapseWidthExample");

  toggleMapButton.addEventListener("click", function() {
    if (mapSection.style.maxHeight === "0px" || mapSection.style.maxHeight === "") {
      // Expand the section
      mapSection.style.maxHeight = mapSection.scrollHeight + "px";
      this.innerHTML = '<img src="/images/google-map-icon.png" class="map-icon"> Hide Location Maps';
    } else {
      // Collapse the section
      mapSection.style.maxHeight = "0";
      this.innerHTML = '<img src="/images/google-map-icon.png" class="map-icon"> Other Location Maps';
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const dynamicSubheader = document.getElementById('dynamicSubheader');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dynamicSubheader.textContent = entry.target.getAttribute('data-text');
      }
    });
  }, {
    threshold: 0.1, // Adjusted threshold for sensitivity

  });

  sections.forEach(section => {
    observer.observe(section);
  });
});


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
