gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
document.addEventListener('DOMContentLoaded', function () {
  const scrollerSmoother = ScrollSmoother.create({
    content: '#content',
    wrapper: '#wrapper',
    smooth: 2,
    effects: true
  });
});

function handleScroll() {
  const htmlElement = document.documentElement; // Selecciona el elemento <html>
  if (window.scrollY > 0) {
    htmlElement.classList.add('scrolled'); // Agrega la clase si el scroll es mayor a cero
  } else {
    htmlElement.classList.remove('scrolled'); // Remueve la clase si el scroll vuelve a cero
  }
}
window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll);
