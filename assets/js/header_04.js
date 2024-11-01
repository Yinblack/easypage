document.querySelector('.hamburger').addEventListener('click', function() {
  	const header = document.querySelector('header');
  	this.classList.toggle('is-active');
  	header.classList.toggle('show_menu');
});