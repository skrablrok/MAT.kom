let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
}


window.onscroll = function() { stickyNavbar() };

var navbar = document.querySelector(".nav_bar"); // Select the navbar element
var sticky = navbar.offsetTop; // Get the initial offset position of the navbar

function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky"); // Add the sticky class when scroll past the navbar
    } else {
        navbar.classList.remove("sticky"); // Remove the sticky class when at the top
    }
}









//COUNTING NUMBERS//

const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");


let activated = false;

window.addEventListener("scroll", () => {
    if(
        pageYOffset > container.offsetTop - container.offsetHeight - 200
        && activated === false
    ){
       counters.forEach(counter => {
        counter.innerText = 0;
        let count = 0;
        function updateCount(){
            const target = parseInt(counter.dataset.count);
            if(count < target){
                count++;
                counter.innerText = count;
                setTimeout(updateCount, 20);
            }
            else{
                counter.innerText = target;
            }
        }
        updateCount();
        activated = true;
       }); 
    }
    else if(pageYOffset < container.offsetTop - container.offsetHeight - 500 || pageYOffset === 0 && activated === true){
        counters.forEach(counter => {
            counter.innerText = 0;
        });
        activated = false;
    }
})

















const gumb = ScrollReveal({
    distance: '200px',
    duration: 2600,
    delay: 450,
    reset: true
});

gumb.reveal('.gumb', { origin: 'left', delay: 100 });


const gumb1 = ScrollReveal({
    distance: '200px',
    duration: 2600,
    delay: 450,
    reset: true
});

gumb1.reveal('.gumb1', { origin: 'right', delay: 100 });






const glava = ScrollReveal({
    distance: '300px',
    duration: 2600,
    delay: 450,
    reset: true
});

glava.reveal('.glava_h1', { origin: 'top', delay: 100 });




const slika = ScrollReveal({
    distance: '100px',
    duration: 2600,
    delay: 450,
    reset: true
});

glava.reveal('.slika', { origin: 'bottom', delay: 0 });
const naslov = ScrollReveal({
    distance: '100px',
    duration: 2600,
    delay: 450,
    reset: true
});




glava.reveal('.besedilo', { origin: 'bottom', delay: 0 });
const besedilo = ScrollReveal({
    distance: '100px',
    duration: 2600,
    delay: 450,
    reset: true
});

glava.reveal('.naslov_storitev', { origin: 'bottom', delay: 300 });
const text = ScrollReveal({
    distance: '100px',
    duration: 2600,
    delay: 450,
    reset: true
});

glava.reveal('.text_storitev', { origin: 'bottom', delay: 500 });
const gumb_storitev = ScrollReveal({
    distance: '100px',
    duration: 2600,
    delay: 450,
    reset: true
});

glava.reveal('.gumb_storitev', { origin: 'bottom', delay: 700 });












































function redirectLanguage(select) {
    const language = select.value;
    if (language === "sl") {
        window.location.href = "index.html";
    } else if (language === "it") {
        window.location.href = "index_IT.html";
    } else if (language === "en") {
        window.location.href = "index_EN.html";
    }
}































































