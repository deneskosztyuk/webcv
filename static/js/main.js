document.addEventListener('DOMContentLoaded', function() {
    let lastKnownPosition = 0;
    let ticking = false;
  
    // Debounce function to limit the rate at which the parallax can fire
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };
  
    const header = document.getElementById('videoHeader');
    const video = document.getElementById('headerVideo');
  
    function setVideoTransform(x, y) {
      const width = header.offsetWidth;
      const height = header.offsetHeight;
      const moveX = ((x - header.offsetLeft) / width * 2 - 1) * -10;
      const moveY = ((y - header.offsetTop) / height * 2 - 1) * -10;
  
      video.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
  
    // Enhanced function with requestAnimationFrame for smoothness
    function updatePosition() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          setVideoTransform(lastKnownPosition.x, lastKnownPosition.y);
          ticking = false;
        });
  
        ticking = true;
      }
    }
  
    // Debounced version of the event handler for better performance
    const debouncedUpdatePosition = debounce(updatePosition, 10);
  
    header.addEventListener('mousemove', function(e) {
      lastKnownPosition = {
        x: e.pageX,
        y: e.pageY
      };
      debouncedUpdatePosition();
    });
  
    // Apply an initial scale to avoid the 'jump'
    video.style.transform = 'scale(1.1)';
  });
  