gsap.registerPlugin(ScrollTrigger);
const timeline = gsap.timeline();
const letters = document.querySelectorAll("#letters span");
const typingText = document.querySelector("#typing-text");
const textContent = typingText.textContent;
typingText.textContent = "";

// Section 1 animation
timeline
  .to("#section1", {
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
    duration: 0.5,
    ease: "power2.inOut",
  });

// Section 3 animation (typing effect)
timeline
  .to("#section3", {
    opacity: 1,
    duration: 0.25,
    backgroundColor: "#000",
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
    opacity: 1,
    duration: 1,
  })
  .to("#section3", {
    opacity: 0,
    duration: 1,
    delay: textContent.length * 0.05,
  });

// Section 4 animation (Who we are?)
timeline
  .fromTo(
    "#section4",
    {
      y: "100%",
      opacity: 1,
      duration: 3,
    },
    {
      y: "0%",
      duration: 0.75,
      ease: "power2.inOut",
    }
  )
  .to("#section4", {
    opacity: 1,
    duration: 0.75,
    onStart: () => {
      ["#section1", "#section2", "#section3"].forEach((selector) => {
        document.querySelector(selector).style.display = "none";
      });
      const mainSection = document.querySelector(".main-section");
      const questionMark = document.querySelector(".question-mark");
      mainSection.style.zIndex = -1;
      mainSection.style.opacity = 1;
      questionMark.style.animation = "none";
      questionMark.style.transform = "rotate(0deg)";
      gsap.to(questionMark, {
        rotation: [-15, 15, 0],
        scale: [1.1, 0.9, 1],
        duration: 0.25,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      });
    },
  })
  .to("#section4", {
    y: "100%",
    duration: 0.75,
    ease: "power2.inOut",
    onComplete: () => {
      document.querySelector("#section4").style.display = "none";
      document.querySelector(".main-section").style.zIndex = 0;
      document.querySelector(".main-section").style.position = "relative";
      document.querySelector("body").style.overflow = "auto";
    },
  });

timeline.to("#about-us", {
  opacity: 1,
  duration: 0.5,
});

const seeMoreBtns = Array.from(document.querySelectorAll(".see-more"));
seeMoreBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // open sibling element which is dialog element
    // disable scrolling
    document.body.style.overflow = "hidden";
    const dialog = btn.nextElementSibling;
    dialog.showModal();
    const closeBtn = dialog.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
      dialog.close();
      document.body.style.overflow = "auto";
    });
  });
});

const swiper = new Swiper(".swiper", {
  direction: "vertical",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  speed: 700,
  mousewheel: true, // Enable mousewheel control
  on: {
    slideChange: function () {
      const activeSlide = this.slides[this.activeIndex];
      // position pagination inside the active slide
      const pagination = document.querySelector(".swiper-pagination");
      pagination.style.top = `${
        activeSlide.offsetTop + activeSlide.offsetHeight / 2
      }px`;
    },
  },
});

const titles = Array.from(document.querySelectorAll(".title"));
console.log(titles);
titles.forEach((title) => {
  console.log(title.classList);
  const transform = title.classList.contains("left")
    ? { x: -20 }
    : title.classList.contains("right")
    ? { x: 20 }
    : { y: 0 };

  gsap.from(title, {
    ...transform,
    opacity: 0,
    duration: 0.5,
    scrollTrigger: {
      trigger: title,
      start: "top 80%",
      end: "bottom 50%",
      toggleActions: "play none none none",
    },
  });
});

const cards = Array.from(document.querySelectorAll(".cards"));
console.log(cards);
cards.forEach((card) => {
  const images = Array.from(card.querySelectorAll(".image"));
  images.forEach((image, i) => {
    console.log(image);
    gsap.from(image, {
      y: 50,
      opacity: 0,
      duration: 0.25 + i * 0.1,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: image,
        start: "top 80%",
        end: "bottom 50%",
        toggleActions: "play none none none",
      },
    });
  });
});
