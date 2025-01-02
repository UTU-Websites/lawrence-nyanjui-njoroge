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


///Lightbox 
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const images = document.querySelectorAll('img');
    const slideshowToggle = document.getElementById('slideshow-toggle');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentImageIndex;
    let slideshowInterval;
    let isPlaying = false;

    // Variables to track touch scroll sensitivity
    let touchStartX = 0;
    let touchEndX = 0;
    const touchThreshold = 100; // Adjust sensitivity threshold as needed

    // Open the lightbox with the selected image
    function openLightbox(index) {
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxImg.src = images[index].src;
        currentImageIndex = index;
        updateToggleButton();
        lightboxImg.classList.add('visible'); // Start the fade-in effect
    }

    // Close the lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        stopSlideshow();
    }

    // Show the next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    // Show the previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentImageIndex].src;
    }

    // Start the slideshow
    function startSlideshow() {
        stopSlideshow();
        if (isPlaying) return;
        isPlaying = true;
        slideshowToggle.textContent = "Pause";
        slideshowInterval = setInterval(showNextImage, 7000); // Change image every 7 seconds
    }

    // Stop the slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
        isPlaying = false;
        slideshowToggle.textContent = "Play";
    }

    // Toggle the slideshow on button click
    function toggleSlideshow() {
        if (isPlaying) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    }

    // Update the slideshow toggle button text
    function updateToggleButton() {
        slideshowToggle.textContent = isPlaying ? "Pause" : "Play";
    }

    // Add click and touch event listeners to images
    images.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));

        // Prevent the default context menu on long-press and drag
        img.addEventListener('contextmenu', (e) => e.preventDefault()); // Prevent right-click
        img.addEventListener('dragstart', (e) => e.preventDefault()); // Prevent dragging

        // Touch handling for image tap, only opens if not scrolled
        img.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        img.addEventListener('touchmove', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const touchDiff = Math.abs(touchStartX - touchEndX);

            // Stop propagation if threshold is exceeded (allowing scroll without lightbox open)
            if (touchDiff > touchThreshold) {
                e.stopPropagation();
            }
        });

        img.addEventListener('touchend', (e) => {
            const touchDiff = touchStartX - touchEndX;
            if (Math.abs(touchDiff) > touchThreshold) {
                if (touchDiff > 0) {
                    showNextImage();  // Swipe left to show next image
                } else {
                    showPrevImage();  // Swipe right to show previous image
                }
            }
            touchStartX = 0; // Reset after each touch
            touchEndX = 0;
        });
    });

    // Add event listeners for controls
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    slideshowToggle.addEventListener('click', toggleSlideshow);

    // Close lightbox on clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Prevent right-click and touch context menu in lightbox
    if (lightbox) { // Check if lightbox exists
        lightbox.addEventListener('contextmenu', (e) => e.preventDefault()); // Prevent right-click
        lightbox.addEventListener('dragstart', (e) => e.preventDefault()); // Prevent dragging on lightbox image
    }

    // Swiping functionality for next/prev images (touch support)
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        const touchDiff = touchStartX - touchEndX;
        if (Math.abs(touchDiff) > touchThreshold) {
            if (touchDiff > 0) {
                showNextImage();  // Swipe left to show next image
            } else {
                showPrevImage();  // Swipe right to show previous image
            }
        }
        touchStartX = 0; // Reset after each touch
        touchEndX = 0;
    });
});
