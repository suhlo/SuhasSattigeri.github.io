// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) {
        // Get the width from the style attribute and apply it
        const width = entry.target.getAttribute("style").split(":")[1].trim();
        entry.target.style.width = width;
      } else {
        // Optional: Reset animation when out of view
        // entry.target.style.width = '0%';
      }
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );
});

skillBars.forEach((bar) => observer.observe(bar));

// ------------------------------------------------------------------
// FLOATING DOCK LOGIC
// ------------------------------------------------------------------
const sections = document.querySelectorAll("section");
const dockItems = document.querySelectorAll(".dock-item");

const dockObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        dockItems.forEach((item) => item.classList.remove("active"));
        const activeLink = document.querySelector(`.dock-item[href="#${id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((section) => dockObserver.observe(section));

// ------------------------------------------------------------------
// UPDATED: EmailJS Form submission script with your IDs
// ------------------------------------------------------------------

// Your EmailJS IDs
const SERVICE_ID = "service_bsffqy3";
const TEMPLATE_ID = "template_90p6wy8";

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop page reload

    formMessage.textContent = "Sending message...";
    formMessage.style.color = "#e0e6ed"; // Use light text for sending

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
      function (response) {
        // Success
        console.log("SUCCESS!", response.status, response.text);
        formMessage.textContent = "Message sent successfully! Thank you.";
        formMessage.style.color = "#00ffff"; // Use accent color for success
        form.reset(); // Clear the form fields
      },
      function (error) {
        // Failure
        console.error("FAILED...", error);
        formMessage.textContent = "Failed to send. Please try again.";
        formMessage.style.color = "#ff00ff"; // Use other accent for error
      }
    );
  });
}
