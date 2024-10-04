function loco() {
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

gsap.to("#page>video",{
  scrollTrigger:{
      trigger:'#page video',
      start:'2% top',
      end:'bottom top',
      scroller:'#main',
      scrub: true,
      reversed: true
  },
  onStart:()=>{
    document.querySelector("#page video").play()
  }
})
gsap.to("#page",{
  scrollTrigger:{
    trigger:'#page',
    start:'top top',
    end:'bottom top',
    scroller:'#main',
    pin: true
    }
  })
gsap.to("#page-bottom",{
  scrollTrigger:{
    trigger:'#page-buttom ',
    start:'15% top',
    end:'bottom top',
    scroller:'#main',
    },
    opacity:0
  })
 
  document.addEventListener('mousemove', (event) => {
    const eyeballs = document.querySelectorAll('.eyeball');

    eyeballs.forEach((eyeball) => {
        const rect = eyeball.getBoundingClientRect();
        const eyeballX = rect.left + rect.width / 2;
        const eyeballY = rect.top + rect.height / 2;

        const deltaX = event.clientX - eyeballX;
        const deltaY = event.clientY - eyeballY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(60, Math.sqrt(deltaX * deltaX + deltaY * deltaY)); // Increased movement range

        const pupil = eyeball.querySelector('.pupil');
        pupil.style.transform = `translate(-50%, -50%) translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
    });
});
document.getElementById("moreButton").addEventListener("click", function() {
  window.location.href = "articles.html";
});


document.getElementById("moreButton").addEventListener("click", function() {
    const storyboardSection = document.getElementById("storyboard-section");
    storyboardSection.scrollIntoView({ behavior: "smooth" });
});
