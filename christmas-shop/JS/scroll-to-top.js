const scrollToTopBtn = document.querySelector(".scroll-to-top");
 
window.addEventListener("scroll", () => {
  if (window.scrollY >= 300) {
    scrollToTopBtn.classList.remove("hidden-btn");
  } else {
    scrollToTopBtn.classList.add("hidden-btn");
  }
});
 
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});