const timeline = gsap.timeline();

// Section 1 animation (letters loading with exotic effect)
const letters = document.querySelectorAll("#letters span");
letters.forEach((letter) => {
  letter.style.opacity = 0;
  letter.style.display = "block";
});
timeline
  .to("#section1", {
    backgroundColor: "#000",
    duration: 0.5,
    ease: "power2.out",
    opacity: 1,
  })
  .to(
    letters,
    {
      opacity: 1,
      stagger: {
        each: 0.4,
        from: "start",
      },
      y: -10,
      duration: 0.75,
      ease: "power2.out",
    },
    "+=0.3"
  )
  .to(letters, {
    opacity: 0,
    y: 5,
    stagger: {
      each: 0.2,
      from: "end",
    },
    duration: 0.25,
    ease: "power2.in",
  })
  .to("#section1", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.inOut",
  });

// Section 2 animation (parallax transition)
timeline
  .fromTo(
    "#section2",
    {
      scale: 0,
      opacity: 0,
      y: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
    }
  )
  .to("#section2", {
    scale: 1,
    duration: 1,
  })
  .to("#section2", {
    y: "-100%",
    duration: 0.5, // Faster opacity transition
    ease: "power2.inOut",
  });

// Section 3 animation (typing effect)
const typingText = document.querySelector("#typing-text");
const textContent = typingText.textContent;
typingText.textContent = "";
timeline
  .to("#section3", {
    opacity: 1,
    duration: 0.25,
  })
  .call(
    () => {
      let index = 0;
      const typingInterval = setInterval(() => {
        typingText.textContent += textContent[index];
        index++;
        if (index === textContent.length) clearInterval(typingInterval);
      }, 50);
    },
    null,
    "+=0.5"
  )
  .to("#section3", {
    opacity: 0,
    duration: 2.5,
    delay: textContent.length * 0.05, // Add delay based on typing duration
  });

// Section 4 animation (Who we are?)
// timeline
//   .to("#section4", {
//     opacity: 1,
//     duration: 1.5,
//   })
//   .to("#section4", {
//     opacity: 0,
//     duration: 1.5,
//   });

// Enable scrolling after preload
// timeline.call(() => {
//   document.body.style.overflow = "auto";
//   gsap.utils.toArray(".section").forEach((section) => {
//     section.style.display = "none";
//   });
// });

// // Scroll animations for main sections
gsap.utils.toArray(".main-section").forEach((section, index) => {
  gsap.fromTo(
    section,
    {
      x: "100%",
    },
    {
      x: "0%",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    section,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});
