document.querySelector('.hamburger').addEventListener('click', function() {
	const htmlElement = document.documentElement;
  	htmlElement.classList.toggle('menu_active');
});