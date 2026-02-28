//JS written by Mequila Murarik
"use strict";

document.addEventListener("DOMContentLoaded", () => {
// dark/light theme toggle
const toggleButton = document.getElementById("theme-toggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
    }

// product display section
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
// guessing game 
const gameForm = document.getElementById("gameForm");
const guessInput = document.getElementById("numGuess");
const gameOutput = document.getElementById("gameOutput");
const gameMessage = document.getElementById("gameMessage");

gameForm.addEventListener("submit", (e) => {
    e.preventDefault();

const guess = Number(guessInput.value);
    if (guess < 1 || guess > 10 || Number.isNaN(guess)) {
        gameMessage.style.display = "inline";
        gameOutput.textContent = "";
        return;
    }

gameMessage.style.display = "none";

const randomNum = Math.floor(Math.random() * 10) + 1;
    if (guess === randomNum) {
        gameOutput.textContent = `You guessed ${guess}. The random number was ${randomNum}. You win!`;
    } else {
        gameOutput.textContent = `You guessed ${guess}. The random number was ${randomNum}. Try again.`;
     }
guessInput.value = "";
guessInput.focus();
});

buttons.forEach((button, index) => {
    button.addEventListener("click", () => showItem(index));
});

showItem(0);
});

//contact form w error messages + obj adding
(function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  const fullName = document.getElementById("fullName");
  const phoneNumber = document.getElementById("phoneNumber");
  const emailAddress = document.getElementById("emailAddress");
  const comments = document.getElementById("comments");

  const contactPrefError = document.getElementById("contactPrefError");
  const contactSuccess = document.getElementById("contactSuccess");

  function getErrorEl(inputId) {
    return document.getElementById(inputId + "Error");
  }

  function showError(inputEl, message) {
    const err = getErrorEl(inputEl.id);
    if (!err) return;

    err.textContent = message;
    err.classList.add("show");
    inputEl.classList.add("input-error");
  }

  function clearError(inputEl) {
    const err = getErrorEl(inputEl.id);
    if (!err) return;

    err.textContent = "";
    err.classList.remove("show");
    inputEl.classList.remove("input-error");
  }

  function showPrefError(message) {
    contactPrefError.textContent = message;
    contactPrefError.classList.add("show");
  }

  function clearPrefError() {
    contactPrefError.textContent = "";
    contactPrefError.classList.remove("show");
  }

  function getContactPreference() {
    const checked = contactForm.querySelector('input[name="contact-pref"]:checked');
    return checked ? checked.value : "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

  function validateContactForm() {
    let isValid = true;
    contactSuccess.textContent = "";

    [fullName, phoneNumber, emailAddress, comments].forEach(clearError);
    clearPrefError();

    if (fullName.value.trim().length === 0) {
      showError(fullName, "Please enter your name.");
      isValid = false;
    }

    if (comments.value.trim().length === 0) {
      showError(comments, "Please enter a comment/message.");
      isValid = false;
    }

    const pref = getContactPreference();
    if (!pref) {
      showPrefError("Please choose Email or Text.");
      isValid = false;
    }

    if (pref === "email") {
      const emailVal = emailAddress.value.trim();
      if (emailVal.length === 0) {
        showError(emailAddress, "Email is required when you choose Email.");
        isValid = false;
      } else if (!emailRegex.test(emailVal)) {
        showError(emailAddress, "Please enter a valid email (example: name@email.com).");
        isValid = false;
      }
    }

    if (pref === "phone") {
      const phoneVal = phoneNumber.value.trim();
      if (phoneVal.length === 0) {
        showError(phoneNumber, "Mobile number is required when you choose Text.");
        isValid = false;
      } else if (!phoneRegex.test(phoneVal)) {
        showError(phoneNumber, "Please enter a valid 10-digit phone number.");
        isValid = false;
      }
    }

    return isValid;
  }

  [fullName, phoneNumber, emailAddress, comments].forEach((el) => {
    el.addEventListener("input", () => clearError(el));
  });

  contactForm.addEventListener("change", (e) => {
    if (e.target && e.target.name === "contact-pref") {
      clearPrefError();
      clearError(phoneNumber);
      clearError(emailAddress);
    }
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    const customer = {
      fullName: fullName.value.trim(),
      contactPreference: getContactPreference(),
      emailAddress: emailAddress.value.trim(),
      phoneNumber: phoneNumber.value.trim(),
      comments: comments.value.trim(),
      submittedAt: new Date().toLocaleString()
    };

    const contactLine =
      customer.contactPreference === "email"
        ? `Email: ${customer.emailAddress}`
        : `Mobile: ${customer.phoneNumber}`;

    contactSuccess.textContent =
      `Thanks, ${customer.fullName}! We received your message. Preferred contact: ${customer.contactPreference.toUpperCase()} (${contactLine}).`;

    // Reset form
    contactForm.reset();
  });
})();