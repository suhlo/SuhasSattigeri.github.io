// ------------------------------------------------------------------
// SMOOTH SCROLL (Top Nav logic removed)
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
// SKILL BARS ANIMATION
// ------------------------------------------------------------------
const skillBars = document.querySelectorAll(".skill-progress");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(
    (entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute("style").split(":")[1].trim();
        entry.target.style.width = width;
      }
    },
    { threshold: 0.5 }
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
// EMAIL JS (Improved UX)
// ------------------------------------------------------------------
const SERVICE_ID = "service_bsffqy3";
const TEMPLATE_ID = "template_90p6wy8";
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.textContent;

    // 1. Loading State
    formMessage.textContent = "Sending message...";
    formMessage.style.color = "#e0e6ed";
    btn.disabled = true; // Prevent double clicks
    btn.textContent = "Sending...";
    btn.style.opacity = "0.7";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
      function (response) {
        // 2. Success State
        formMessage.textContent = "Message sent successfully! Thank you.";
        formMessage.style.color = "#00ffff";
        form.reset();

        // Reset button
        btn.disabled = false;
        btn.textContent = originalBtnText;
        btn.style.opacity = "1";

        // Clear success message after 5 seconds
        setTimeout(() => {
          formMessage.textContent = "";
        }, 5000);
      },
      function (error) {
        // 3. Error State
        console.error("FAILED...", error);
        formMessage.textContent = "Failed to send. Please try again.";
        formMessage.style.color = "#ff00ff";

        // Reset button
        btn.disabled = false;
        btn.textContent = originalBtnText;
        btn.style.opacity = "1";
      }
    );
  });
}
