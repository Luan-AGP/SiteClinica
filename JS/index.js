const header = document.getElementById('header')
const menuItems = document.querySelectorAll('.nav ul li a[href^="#"]')
const links = document.querySelectorAll('header .nav a')

window.addEventListener('scroll', () => {
  if ( window.scrollY > 905) {
      header.style.setProperty('background-color', '#ffffff')
      header.style.setProperty('box-shadow', '0 3px 10px -1px #A9A9A9')
      header.style.setProperty('z-index', '1')
      links.forEach((element)=>{
        element.classList.remove('colorWhite')
        element.classList.add('colorBlack')
      })
  } else {
      header.style.setProperty('background-color', '')
      header.style.setProperty('box-shadow', 'none')
      links.forEach((element)=>{
        element.classList.remove('colorBlack')
        element.classList.add('colorWhite')
      })
  }
})

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget)- 100;
	scrollToPosition(to);
}

menuItems.forEach(item => {
	item.addEventListener('click', scrollToIdOnClick);
});
 
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 1000;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
};
