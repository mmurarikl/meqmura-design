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

    // array of items to swap content without changing HTML
    const items = [
        {
            type: "image",
            title: "Art - Portrait Study 1",
            src: "images/portrait-brandon.jpg",
            alt: "Charcoal portrait of a man laying in a blanket",
            desc: "A charcoal portrait study focused on value control, proportion, and edge softness."
        },
        {
            type: "image",
            title: "Art - Portrait Study 2",
            src: "images/portrait-mequila.jpg",
            alt: "Charcoal portrait of a woman laying in a blanket",
            desc: "A second portrait study focused on value control, proportion, and edge softness."
        },
        {
            type: "image",
            title: 'Art - "Grief"',
            src: "images/drawing-grief.jpg",
            alt: "Artwork titled Grief",
            desc: "An abstract self-portrait based piece exploring emotion through lighting, form, and restraint."
        },
        {
            type: "image",
            title: 'Art - "God"',
            src: "images/drawing-hand.jpg",
            alt: "Realistic artwork titled God",
            desc: "A realism study emphasizing composition, symbolism, and tonal range."
        },
        {
            type: "image",
            title: "Design - Cover Mockup",
            src: "images/dmb_frontcover.png",
            alt: "Design cover mockup",
            desc: "A cover concept focused on typographic hierarchy, spacing, and brand consistency."
        },
        {
            type: "image",
            title: "Design - Open Book Mockup",
            src: "images/dmb_center.png",
            alt: "Open book design mockup",
            desc: "A layout mockup exploring page rhythm, grid structure, and readability."
        },
        {
            type: "video",
            title: "Motion - Title Animation",
            src: "images/Glossier_Stinger_Vertical.mp4",
            alt: "",
            desc: "A short motion piece exploring timing, rhythm, and typographic movement."
        }
    ];

    function showItem(index) {
        const item = items[index];
        titleEl.textContent = item.title;
        descEl.textContent = item.desc;
        // forces the video src to actually load, if item.type not video load img
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

    function handleGameSubmit(e) {
        // prevent default page refresh
        e.preventDefault();
        
        // form values come in as strings, so convert to a number
        const guess = Number(guessInput.value);

        // validation to only allow numbers 1-10
        if (Number.isNaN(guess) || guess < 1 || guess > 10) {
            gameMessage.style.display = "inline";
            gameOutput.textContent = "";
            return;
        }
        
        // hide the error message once the input is valid
        gameMessage.style.display = "none";

        // random num between 1 - 10
        const randomNum = Math.floor(Math.random() * 10) + 1;

        // compare guess to random number + show result
        if (guess === randomNum) {
            gameOutput.textContent = `You guessed ${guess}. The random number was ${randomNum}. You win!`;
        } else {
            gameOutput.textContent = `You guessed ${guess}. The random number was ${randomNum}. Try again.`;
        }

        // reset input for next round
        guessInput.value = "";
        guessInput.focus();
    }

    //contact form w error messages + obj adding
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        const fullName = document.getElementById("fullName");
        const phoneNumber = document.getElementById("phoneNumber");
        const emailAddress = document.getElementById("emailAddress");
        const comments = document.getElementById("comments");
        const contactPrefError = document.getElementById("contactPrefError");
        const contactSuccess = document.getElementById("contactSuccess");

        // regex for email + 10 digit phone num
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

        function getErrorEl(id) {
            return document.getElementById(id + "Error");
        }

        // show message for field that has error
        function showError(input, message) {
            const err = getErrorEl(input.id);
            if (!err) return;

            err.textContent = message;
            err.classList.add("show");
            input.classList.add("input-error");
        }

        function clearError(input) {
            const err = getErrorEl(input.id);
            if (!err) return;

            // clear errors
            err.textContent = "";
            err.classList.remove("show");
            input.classList.remove("input-error");
        }

        function getContactPreference() {
            // radio group is required, check which one is selected
            const checked = contactForm.querySelector('input[name="contact-pref"]:checked');
            return checked ? checked.value : "";
        }

        function validateContactForm() {
            let isValid = true;
            contactSuccess.textContent = "";

            // clear messages + errors 
            [fullName, phoneNumber, emailAddress, comments].forEach((el) => {
                if (el) clearError(el);
            });

            contactPrefError.textContent = "";
            contactPrefError.classList.remove("show");

            // name + comments + radio are always required
            if (!fullName.value.trim()) {
                showError(fullName, "Please enter your full name.");
                isValid = false;
            }

            if (!comments.value.trim()) {
                showError(comments, "Please enter a message.");
                isValid = false;
            }

            const pref = getContactPreference();
            // email/phone is only required if the user chooses email/phone
            if (!pref) {
                contactPrefError.textContent = "Please choose email or text.";
                contactPrefError.classList.add("show");
                isValid = false;
            }
            if (pref === "email") {
                const emailVal = emailAddress.value.trim();

                if (!emailVal) {
                    showError(emailAddress, "Email is required when you choose email.");
                    isValid = false;
                } else if (!emailRegex.test(emailVal)) {
                    showError(emailAddress, "Please enter a valid email.");
                    isValid = false;
                }
            }
            if (pref === "phone") {
                const phoneVal = phoneNumber.value.trim();

                if (!phoneVal) {
                    showError(phoneNumber, "Mobile number is required when you choose text.");
                    isValid = false;
                } else if (!phoneRegex.test(phoneVal)) {
                    showError(phoneNumber, "Please enter a valid 10-digit phone number.");
                    isValid = false;
                }
            }

            return isValid;
        }

        contactForm.addEventListener("submit", (e) => {
            // prevent default page refresh
            e.preventDefault();

            // submit only if all fields valid
            if (!validateContactForm()) return;

            // store user data as obj
            const customer = {
                fullName: fullName.value.trim(),
                contactPreference: getContactPreference(),
                emailAddress: emailAddress.value.trim(),
                phoneNumber: phoneNumber.value.trim(),
                comments: comments.value.trim(),
                submittedAt: new Date().toLocaleString()
            };

            // build message using obj data + return on success form submit
            const contactLine =
                customer.contactPreference === "email"
                    ? `Email: ${customer.emailAddress}`
                    : `Mobile: ${customer.phoneNumber}`;

            contactSuccess.textContent =
                `Thanks, ${customer.fullName}! We received your message. Preferred contact: ${customer.contactPreference.toUpperCase()} (${contactLine}).`;

            // reset form
            contactForm.reset();
        });
    }


    // event listeners 
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => showItem(index));
    });

    if (gameForm) {
        gameForm.addEventListener("submit", handleGameSubmit);
    }

    // default item for product page
    showItem(0);

});