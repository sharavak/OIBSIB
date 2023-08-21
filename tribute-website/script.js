const nextButton = document.querySelector('.nextBut');
const prevButton = document.querySelector('.preBut');
const image = document.querySelector('.slider');
let start = document.querySelector('#start');
let finish=document.querySelector('#finish')
let display=document.querySelector('.display');
prevButton.disabled = true;
let c = 0;
let images=['https://www.digitaltrichy.com/wp-content/uploads/2023/01/bhelwork.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Mettur_dam.jpg/800px-Mettur_dam.jpg', 'https://i.pinimg.com/originals/60/90/83/609083d9ec5bd5b571901576050b1573.jpg', 'https://th.bing.com/th/id/OIP.Ar2lChpsH--Ktb_MGq-EcAHaEK?pid=ImgDet&rs=1', 'https://cdn.thewire.in/wp-content/uploads/2021/12/28141653/2021-12-21T134529Z_1_LYNXMPEHBK0K6_RTROPTP_4_INDIA-TRAFIGURA-800x400.jpg', 'https://cdn.thewire.in/wp-content/uploads/2020/12/14164827/EmRGSSuVMAUFofB.jpeg']
let displayLinks=['https://trichy.bhel.com/', 'https://en.wikipedia.org/wiki/Mettur_Dam', 'https://en.wikipedia.org/wiki/Sathanur_Dam', 'https://en.wikipedia.org/wiki/Neyveli_Thermal_Power_Station', 'https://en.wikipedia.org/wiki/Manali_Refinery', 'https://en.wikipedia.org/wiki/IIT_Madras']
let displayNames=['BHEL Trichy','Mettur Dam','Sathanur Dam','NLC Neyveli','Manali Refinery','IIT Madras']
let n = images.length;
nextButton.addEventListener('click', function () {
    animation();
    nextButton.disabled = false;
    c = c + 1;
    if (c === n - 1) {
        nextButton.disabled = true;
        prevButton.disabled = false;
    }
    start.textContent = c + 1;
    image.src=images[c];
    display.href=displayLinks[c];
    display.textContent=displayNames[c];
    prevButton.disabled = false;
    animationOff();
})

prevButton.addEventListener('click', function () {
    animationOff();
    nextButton.disabled = false;
    c = c - 1
    if (c === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;

    }
    start.textContent = c + 1;
    image.src=images[c];
    display.href=displayLinks[c];
    display.textContent=displayNames[c];
    animation();
})

function animation() {
    image.style.animation = 'fade 3s ease backwards';
}
function animationOff() {
    image.style.animation = 'fades 3s ease backwards';
}
