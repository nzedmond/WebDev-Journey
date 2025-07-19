window.onload = function(){
  const menuBar = document.querySelector('.fa-bars');
  const menuClose = document.querySelector('.fa-window-close');
  menuClose.onclick = hideMenu;

  menuBar.onclick = showMenu;
}

const navLInks = document.getElementById('navLinks');

function showMenu(){
  navLInks.style.right = "0";
  const menuBar = document.querySelector('.fa-bars');
}

function hideMenu(){
  navLInks.style.right = "-200px";
}