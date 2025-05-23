// === Button Interaction ===
const changeBtn = document.getElementById("changeBtn");
changeBtn.addEventListener("click", () => {
  changeBtn.textContent = "You clicked me!";
  changeBtn.style.background = "#f39c12";
  changeBtn.classList.add("bounce");
  setTimeout(() => changeBtn.classList.remove("bounce"), 400);
  localStorage.setItem("buttonClicked", "true");
});

// Restore button state
if (localStorage.getItem("buttonClicked") === "true") {
  changeBtn.textContent = "You clicked me!";
  changeBtn.style.background = "#f39c12";
}

// Long press
let longPressTimer;
changeBtn.addEventListener("mousedown", () => {
  longPressTimer = setTimeout(() => {
    alert("🤫 Secret long press action triggered!");
  }, 1000);
});
changeBtn.addEventListener("mouseup", () => clearTimeout(longPressTimer));
changeBtn.addEventListener("mouseleave", () => clearTimeout(longPressTimer));

// === Tab System ===
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// Load saved tab from localStorage
const savedTab = localStorage.getItem("activeTab");
if (savedTab) {
  activateTab(savedTab);
}

// Activate a tab
function activateTab(tabName) {
  tabButtons.forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  tabContents.forEach(c => {
    c.classList.remove("active", "fade-in");
    if (c.id === tabName) {
      c.classList.add("active", "fade-in");
    }
  });
  localStorage.setItem("activeTab", tabName);
}

// Tab button events
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activateTab(btn.dataset.tab);
  });
});

// === Slideshow ===
const slides = [
  "https://images.pexels.com/photos/212236/pexels-photo-212236.jpeg",
  "https://images.pexels.com/photos/8468019/pexels-photo-8468019.jpeg",
  "https://images.pexels.com/photos/30981935/pexels-photo-30981935.jpeg"
];
let currentSlide = 0;
const slideImage = document.getElementById("slideImage");

function showSlide(index) {
  slideImage.src = slides[index];
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});
document.getElementById("prevBtn").addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// === Form Validation ===
const form = document.getElementById("joinForm");
form.addEventListener("submit", (e) => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (name.length === 0 || password.length < 8 || !email.includes("@")) {
    alert("❌ Please ensure all fields are correctly filled.");
    e.preventDefault();
  } else {
    alert("✅ Form submitted successfully!");
    // Optional: clear preferences on success
    // localStorage.clear();
  }
});

// === Real-time Name Feedback ===
document.getElementById("name").addEventListener("input", (e) => {
  const feedback = document.getElementById("nameFeedback");
  feedback.textContent = e.target.value.length > 0 ? "Looks good ✅" : "";
});