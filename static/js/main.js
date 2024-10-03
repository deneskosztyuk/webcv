document.addEventListener('DOMContentLoaded', function() {
    // Existing variables
    let lastKnownPosition = { x: 0, y: 0 }; // Changed to object to hold x and y
    let ticking = false;
    const header = document.getElementById('videoHeader');
    const video = document.getElementById('headerVideo');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const scrollContainer = document.querySelector('.projects-scroll');
    const panels = document.querySelectorAll('.panel');

    // Check for video header elements
    if (!header || !video) {
        console.error('Video header elements could not be found');
    }

    // Scroll functionality
    if (leftArrow && rightArrow && scrollContainer) {
        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft -= 300; // Adjust the scroll amount as needed
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft += 300; // Adjust the scroll amount as needed
        });
    } else {
        console.error('Scroll elements could not be found');
    }

    // Debounce function
    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Video transform function
    function setVideoTransform(x, y) {
        console.log('Setting video transform');
        const width = header.offsetWidth;
        const height = header.offsetHeight;
        const moveX = ((x - header.offsetLeft) / width * 2 - 1) * -10; // Adjust the multiplier for effect strength
        const moveY = ((y - header.offsetTop) / height * 2 - 1) * -10; // Adjust the multiplier for effect strength

        video.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }

    function updatePosition() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                setVideoTransform(lastKnownPosition.x, lastKnownPosition.y);
                ticking = false;
            });

            ticking = true;
        }
    }

    const debouncedUpdatePosition = debounce(updatePosition, 10);

    // Mouse move listener
    if (header) {
        header.addEventListener('mousemove', function(e) {
            console.log('Mouse moved');
            lastKnownPosition = {
                x: e.clientX,
                y: e.clientY
            };
            debouncedUpdatePosition();
        });
    }

    // Initial video scale
    if (video) {
        video.style.transform = 'scale(1.1)';
    }

});
