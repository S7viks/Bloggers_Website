function loco() {
    gsap.registerPlugin(ScrollTrigger);
  
    // Using Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
  
    // Each time Locomotive Scroll updates, tell ScrollTrigger to update
    locoScroll.on("scroll", ScrollTrigger.update);
  
    // Tell ScrollTrigger to use these proxy methods for "#main" since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      // Use fixed position on mobile devices where Locomotive Scroll doesn't transform the container
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
  
    // Refresh ScrollTrigger and Locomotive Scroll on window updates
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
    // After everything is set up, refresh ScrollTrigger and Locomotive Scroll
    ScrollTrigger.refresh();
  }
  
  loco();
  
  // Example animation for #page
  gsap.to("#page", {
    scrollTrigger: {
      trigger: '#page',
      start: 'top top',
      end: 'bottom top',
      scroller: '#main',
      pin: true
    }
  });
  
  // Example animation for #page-bottom with corrected selector
  gsap.to("#page-bottom", {
    scrollTrigger: {
      trigger: '#page-bottom',  // Fixed typo here
      start: '15% top',
      end: 'bottom top',
      scroller: '#main',
    },
    opacity: 0
  });
  