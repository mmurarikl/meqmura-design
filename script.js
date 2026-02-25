//JS written by Mequila Murarik
"use strict";



document.addEventListener("DOMContentLoaded", () => {
  // ---------- THEME TOGGLE ----------
  const toggleButton = document.getElementById("theme-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  // ---------- PRODUCT DISPLAY ----------
  const buttons = document.querySelectorAll(".display-controls button");
  const titleEl = document.getElementById("itemTitle");
  const imgEl = document.getElementById("itemImage");
  const descEl = document.getElementById("itemDescription");
  const videoEl = document.getElementById("itemVideo");
  const videoSource = document.getElementById("videoSource");

  const items = [
    {
      type: "image",
      title: 'Art - Portrait Study 1',
      src: 'images/portrait-brandon.jpg',
      alt: 'Charcoal portrait of a man laying in a blanket',
      desc: 'A charcoal portrait study focused on value control, proportion, and edge softness.'
    },
    {
      type: "image",
      title: 'Art - Portrait Study 2',
      src: 'images/portrait-mequila.jpg',
      alt: 'Charcoal portrait of a woman laying in a blanket',
      desc: 'A second portrait study focused on value control, proportion, and edge softness.'
    },
    {
      type: "image",
      title: 'Art - Self Portrait',
      src: 'images/portrait-self.jpg',
      alt: 'Realistic self portrait artwork',
      desc: 'An abstracted self portrait depicting my relationship with my spirituality.'
    },
    {
      type: "image",
      title: 'Art - "Grief"',
      src: 'images/drawing-grief.jpg',
      alt: 'Artwork titled Grief',
      desc: 'An abstract self-portrait based piece exploring emotion through lighting, form, and restraint.'
    },
    {
      type: "image",
      title: 'Art - "God"',
      src: 'images/drawing-hand.jpg',
      alt: 'Realistic artwork titled God',
      desc: 'A realism study emphasizing composition, symbolism, and tonal range.'
    },
    {
      type: "image",
      title: 'Design - Cover Mockup',
      src: 'images/dmb_frontcover.png',
      alt: 'Design cover mockup',
      desc: 'A cover concept focused on typographic hierarchy, spacing, and brand consistency.'
    },
    {
      type: "image",
      title: 'Design - Open Book Mockup',
      src: 'images/dmb_center.png',
      alt: 'Open book design mockup',
      desc: 'A layout mockup exploring page rhythm, grid structure, and readability.'
    },
    {
      type: "video",
      title: 'Motion - Title Animation',
      src: 'images/Glossier_Stinger_Vertical.mp4',
      alt: 'Thumbnail preview of a title animation',
      desc: 'A short motion piece exploring timing, rhythm, and typographic movement.'
    }
  ];

  function showItem(index) {
    const item = items[index];
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;

    if (item.type === "video") {
        imgEl.style.display = "none";
        videoEl.style.display = "block";
        videoSource.src = item.src;
        videoEl.load();
    } else {
        videoEl.style.display = "none";
        imgEl.style.display = "block";
        imgEl.src = item.src;
        imgEl.alt = item.alt;
    }
}

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => showItem(index));
  });

  showItem(0);
});