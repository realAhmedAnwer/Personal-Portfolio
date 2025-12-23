// START ACTIVATING NAV LINK
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
function activateNavLink() {
  let currentSectionId = null;
  sections.forEach((section) => {
    window.scrollY >= section.offsetTop - 100 &&
      (currentSectionId = section.getAttribute("id"));
  });
  navLinks.forEach((navLink) => {
    navLink.classList.remove("active");
    navLink.getAttribute("href") === `#${currentSectionId}` &&
      navLink.classList.add("active");
  });
}
window.addEventListener("scroll", activateNavLink);
// END   ACTIVATING NAV LINK

// START TOGGLING THEME
const html = document.documentElement;
const themeToggleButton = document.getElementById("theme-toggle-button");
function initiateTheme() {
  (localStorage.getItem("theme") || "dark") === "dark"
    ? html.classList.add("dark")
    : html.classList.remove("dark");
}
function toggleTheme() {
  localStorage.setItem(
    "theme",
    html.classList.toggle("dark") ? "dark" : "light"
  );
}
initiateTheme();
themeToggleButton.addEventListener("click", toggleTheme);
// END   TOGGLING THEME

// START FILTERING PORTFOLIO ITEMS
const portfolioNavLinks = document.querySelectorAll(
  "section#portfolio button[data-filter]"
);
const portfolioItems = document.querySelectorAll(
  "section#portfolio div[data-category]"
);
function filterPortfolioItems(currentPortfolioNavLink) {
  portfolioNavLinks.forEach((portfolioNavLink) => {
    portfolioNavLink.setAttribute("aria-pressed", "false");
    portfolioNavLink.classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50"
    );
    portfolioNavLink.classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700"
    );
  });
  currentPortfolioNavLink.setAttribute("aria-pressed", "true");
  currentPortfolioNavLink.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700"
  );
  currentPortfolioNavLink.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50"
  );
  const currentPortfolioCategory =
    currentPortfolioNavLink.getAttribute("data-filter");
  portfolioItems.forEach((portfolioItem) => {
    portfolioItem.style.opacity = "0";
    portfolioItem.style.transform = "scale(0.8)";
    setTimeout(() => {
      currentPortfolioCategory === "all" ||
      currentPortfolioCategory === portfolioItem.getAttribute("data-category")
        ? (portfolioItem.style.display = "block")
        : (portfolioItem.style.display = "none");
      setTimeout(() => {
        (currentPortfolioCategory === "all" ||
          currentPortfolioCategory ===
            portfolioItem.getAttribute("data-category")) &&
          ((portfolioItem.style.opacity = "1"),
          (portfolioItem.style.transform = "scale(1)"));
      }, 50);
    }, 300);
  });
}
portfolioNavLinks.forEach((portfolioNavLink) => {
  portfolioNavLink.addEventListener("click", (e) => {
    filterPortfolioItems(e.target);
  });
});
// END   FILTERING PORTFOLIO ITEMS

// START UPDATING TESTMONIALS
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const prevTestimonialButton = document.getElementById("prev-testimonial");
const nextTestimonialButton = document.getElementById("next-testimonial");
const carouselIndicators = document.querySelectorAll(
  "section#testimonials .carousel-indicator"
);
const testimonialCards = document.querySelectorAll(
  "section#testimonials .testimonial-card"
);
let currentTestimonialScreenIndex = 0;
function updateTestmonial() {
  const numberOfVisibleTestimonialCards =
    window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxNumberOfTestimonialScreens =
    testimonialCards.length - numberOfVisibleTestimonialCards + 1;
  currentTestimonialScreenIndex =
    ((currentTestimonialScreenIndex % maxNumberOfTestimonialScreens) +
      maxNumberOfTestimonialScreens) %
    maxNumberOfTestimonialScreens;
  const shiftValue =
    (currentTestimonialScreenIndex * 100) / numberOfVisibleTestimonialCards;
  testimonialsCarousel.style.transform = `translateX(${shiftValue}%)`;
  carouselIndicators.forEach((carouselIndicator) => {
    if (
      +carouselIndicator.getAttribute("data-index") ===
      currentTestimonialScreenIndex
    ) {
      carouselIndicator.classList.add("active", "bg-accent", "scale-125");
      carouselIndicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
    } else {
      carouselIndicator.classList.remove("active", "bg-accent", "scale-125");
      carouselIndicator.classList.add("bg-slate-400", "dark:bg-slate-600");
    }
  });
}
updateTestmonial();
function goToPrevTestimonial() {
  currentTestimonialScreenIndex -= 1;
  updateTestmonial();
}
prevTestimonialButton.addEventListener("click", goToPrevTestimonial);
function goToNextTestimonial() {
  currentTestimonialScreenIndex += 1;
  updateTestmonial();
}
nextTestimonialButton.addEventListener("click", goToNextTestimonial);
function goToTestimonial(index) {
  currentTestimonialScreenIndex = index;
  updateTestmonial();
}
carouselIndicators.forEach((carouselIndicator) => {
  carouselIndicator.addEventListener("click", (e) => {
    goToTestimonial(e.target.getAttribute("data-index"));
  });
});
// END   UPDATING TESTMONIALS

// START CHANGING SETTINGS
const settingsSidebar = document.getElementById("settings-sidebar");
const settingsButton = document.getElementById("settings-toggle");
const closeSettingsButton = document.getElementById("close-settings");
const fontOptions = document.querySelectorAll(".font-option");
const colorOptions = document.getElementById("theme-colors-grid");
const resetSettingsButton = document.getElementById("reset-settings");
const openSettingsSidebar = () => {
  settingsSidebar.classList.remove("translate-x-full");
  settingsButton.style.right = "20rem";
};
settingsButton.addEventListener("click", openSettingsSidebar);
const closeSettingsSidebar = () => {
  settingsSidebar.classList.add("translate-x-full");
  settingsButton.style.right = "0";
};
closeSettingsButton.addEventListener("click", closeSettingsSidebar);
document.addEventListener("click", (e) => {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsButton.contains(e.target) &&
    !settingsSidebar.classList.contains("translate-x-full")
  ) {
    closeSettingsSidebar();
  }
});
function updateFont(font = localStorage.getItem("font")) {
  font = font ? font : "tajawal";
  localStorage.setItem("font", font);
  document.body.classList.remove(
    "font-alexandria",
    "font-tajawal",
    "font-cairo"
  );
  document.body.classList.add(`font-${font}`);
  fontOptions.forEach((fontOption) => {
    if (fontOption.getAttribute("data-font") === font) {
      fontOption.classList.add(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800"
      );
      fontOption.classList.remove("border-slate-200", "dark:border-slate-700");
    } else {
      fontOption.classList.remove(
        "active",
        "border-primary",
        "bg-slate-50",
        "dark:bg-slate-800"
      );
      fontOption.classList.add("border-slate-200", "dark:border-slate-700");
    }
  });
}
updateFont();
fontOptions.forEach((fontOption) => {
  fontOption.addEventListener("click", () => {
    updateFont(fontOption.getAttribute("data-font"));
  });
});
const colorsPalette = [
  {
    title: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    title: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    title: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    title: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    title: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    title: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];
colorsPalette.forEach((color) => {
  const colorButton = document.createElement("button");
  colorButton.classList.add(
    "w-12",
    "h-12",
    "rounded-full",
    "cursor-pointer",
    "transition-transform",
    "hover:scale-110",
    "border-2",
    "border-slate-200",
    "dark:border-slate-700",
    "hover:border-primary",
    "shadow-sm"
  );
  colorButton.style.background = `linear-gradient(135deg, ${color.primary}, ${color.secondary})`;
  colorButton.setAttribute("title", color.title);
  colorButton.setAttribute("data-primary", color.primary);
  colorButton.setAttribute("data-secondary", color.secondary);
  colorButton.addEventListener("click", () => {
    updateColor(color);
  });
  colorOptions.appendChild(colorButton);
});
function updateColor(color = JSON.parse(localStorage.getItem("color"))) {
  color = color ? color : colorsPalette[0];
  document.documentElement.style.setProperty("--color-primary", color.primary);
  document.documentElement.style.setProperty(
    "--color-secondary",
    color.secondary
  );
  document.documentElement.style.setProperty("--color-accent", color.accent);
  colorOptions.querySelectorAll("button").forEach((colorOption) => {
    colorOption.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900"
    );
    if (colorOption.getAttribute("title") === color.title) {
      colorOption.classList.add(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900"
      );
    }
  });
  localStorage.setItem("color", JSON.stringify(color));
}
updateColor();
function resetSettings() {
  localStorage.removeItem("font");
  updateFont();
  localStorage.removeItem("color");
  updateColor();
  closeSettingsSidebar();
}
resetSettingsButton.addEventListener("click", resetSettings);
// END   CHANGING SETTINGS

// START SCROLLING TO TOP
const scrollToTopButton = document.getElementById("scroll-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    scrollToTopButton.classList.replace("opacity-0", "opacity-100");
    scrollToTopButton.classList.replace("invisible", "visible");
  } else {
    scrollToTopButton.classList.replace("opacity-100", "opacity-0");
    scrollToTopButton.classList.replace("visible", "invisible");
  }
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
scrollToTopButton.addEventListener("click", scrollToTop);
// END   SCROLLING TO TOP
