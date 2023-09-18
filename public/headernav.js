//find what page we're viewing
const viewPage = window.location.pathname;

//get all our nav link and see which link includes the current pathname
const navlinks = document.querySelectorAll(".nav-link").
forEach(link => {
    if(link.href.includes(`${viewPage}`)){
        link.classList.add("clicked");
    }
})
