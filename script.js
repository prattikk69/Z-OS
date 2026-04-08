const settingsApp = document.querySelector(".settingsApp");
const home = document.getElementById("home");
const person = document.getElementById("person");
const acc = document.getElementById("acc");
const about = document.getElementById("about");
const cross = document.querySelector('.cross')
const barSetting = document.querySelector('.barSetting')
const homePlug = document.getElementById("homePlug");
const personPlug = document.getElementById("personPlug");
const timePlug = document.getElementById("timePlug");
const accPlug = document.getElementById("accPlug");
const aboutPlug = document.getElementById("aboutPlug");
const time = document.getElementById("time");


cross.addEventListener('click', ()=>{
    settingsApp.classList.remove("appShow");
})
barSetting.addEventListener('click', ()=>{
    settingsApp.classList.add("appShow");
    homeTab();
})
function homeTab(){
    homePlug.classList.remove("hideLi");
    personPlug.classList.add("hideLi");
    timePlug.classList.add("hideLi");
    accPlug.classList.add("hideLi");
    aboutPlug.classList.add("hideLi");
    about.classList.remove("selectedLi");
    home.classList.add("selectedLi");
    person.classList.remove("selectedLi");
    time.classList.remove("selectedLi");
    acc.classList.remove("selectedLi");
}
function personTab(){
    homePlug.classList.add("hideLi");
    personPlug.classList.remove("hideLi");
    accPlug.classList.add("hideLi");
    aboutPlug.classList.add("hideLi");
    about.classList.remove("selectedLi");
    home.classList.remove("selectedLi");
    person.classList.add("selectedLi");
    time.classList.remove("selectedLi");
    acc.classList.remove("selectedLi");
    timePlug.classList.add("hideLi");
}
function accTab(){
    homePlug.classList.add("hideLi");
    personPlug.classList.add("hideLi");
    accPlug.classList.remove("hideLi");
    aboutPlug.classList.add("hideLi");
    about.classList.remove("selectedLi");
    home.classList.remove("selectedLi");
    person.classList.remove("selectedLi");
    acc.classList.add("selectedLi");
    timePlug.classList.add("hideLi");
    time.classList.remove("selectedLi");
}
function aboutTab(){
    homePlug.classList.add("hideLi");
    personPlug.classList.add("hideLi");
    accPlug.classList.add("hideLi");
    aboutPlug.classList.remove("hideLi");
    about.classList.add("selectedLi");
    home.classList.remove("selectedLi");
    person.classList.remove("selectedLi");
    acc.classList.remove("selectedLi");
    timePlug.classList.add("hideLi");
    time.classList.remove("selectedLi");
}
function timeTab(){
    timePlug.classList.remove("hideLi");
    time.classList.add("selectedLi");
    homePlug.classList.add("hideLi");
    personPlug.classList.add("hideLi");
    accPlug.classList.add("hideLi");
    aboutPlug.classList.add("hideLi");
    about.classList.remove("selectedLi");
    home.classList.remove("selectedLi");
    person.classList.remove("selectedLi");
    acc.classList.remove("selectedLi");
}



//------------------Clock-------------------------
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')
const clockBox = document.querySelector('.clock')
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();
let isDragging = false;

function clock(){
    const now = new Date();
        let getHour = now.getHours();
    if (document.getElementById('12hr').checked) {
        getHour = getHour % 12 || 12; // convert to 12-hour format
    }
    hour.textContent = String(getHour).padStart(2, '0');
    let getMinute = String(now.getMinutes()).padStart(2, '0');
    let getSec = String(now.getSeconds()).padStart(2, '0');
    minute.textContent = getMinute;
    second.textContent = getSec;
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    setTimeout(clock, msUntilNextSecond);
}
clock();

let offsetX, offsetY;

clockBox.addEventListener("mousedown", (e) => {
    isDragging = true;

    offsetX = e.clientX - clockBox.offsetLeft;
    offsetY = e.clientY - clockBox.offsetTop;

    clockBox.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    clockBox.style.left = (e.clientX - offsetX) + "px";
    clockBox.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    clockBox.style.cursor = "grab";
});




//----------------zIsland-----------------------
const zIsland = document.querySelector(".zIsland");

function msg(message) {
    storeMsg(message);
    if (message.length > 10) {
        const marq = document.createElement('div');
        marq.textContent = message;
        marq.style.display = 'block';
        marq.classList.add('slide');
        zIsland.classList.add('active');
        zIsland.textContent = "";
        zIsland.appendChild(marq);

        marq.addEventListener('animationend', () => {
            zIsland.classList.remove('active');
            zIsland.textContent = "";
        });

    } else {
        zIsland.textContent = message;

        setTimeout(() => {
            zIsland.classList.remove('active');
            zIsland.textContent = "";
        }, 3000);
    }
}




//---------------Initialize-----------------------
window.addEventListener('load', ()=>{
    const welcome = document.createElement('p');
    welcome.textContent = "welcome to Z-OS!";
    welcome.style.fontFamily = "'Cedarville Cursive', cursive";
    welcome.style.fontSize = "2em";
    msg(welcome.textContent);
    loadName();
    if(window.innerWidth < 500){
        alert("For better experience, use on desktop!");
    }
});


//-----------------Personalize----------------------
const images = document.querySelectorAll('img');
const backgroundPic = document.querySelector('.backgroundPic');
function changeBg(){
    const selectedImage = document.querySelector('.imgSelected');
    if(selectedImage){
        backgroundPic.style.backgroundImage = `url(${selectedImage.src})`;
        msg('BG changed successfully!');
    } else {
        alert('Please select a wallpaper first!');
    }
}
images.forEach(image => {
    image.addEventListener('click', () => {
        images.forEach(img => img.classList.remove('imgSelected'));
        image.classList.add('imgSelected');
    });
});

//-----------------Account----------------------

const name = document.getElementById('name');
const userName = document.querySelector('.userName');
const infoBox = document.querySelector('.infoBox');
function editInfo(){
    infoBox.classList.add("infoShow");
    name.focus();
}
function saveInfo(){
    let getName = name.value;
    if (getName === '') {
        getName = 'Unknown';
    }
    localStorage.setItem("accountUser", getName);
    userName.textContent = localStorage.getItem("accountUser");
    hideInfo();
}
function hideInfo(){
    infoBox.classList.remove('infoShow');
}
function loadName(){
    const storedName = localStorage.getItem("accountUser"); 
    if (storedName) {
        userName.textContent = storedName;
    } else {
        userName.textContent = "Unknown";
    }
}

//-----------------Message App----------------------
        const msgApp = document.querySelector('.messageApp');
        const msgContainer = document.querySelector('.msgContainer ul');
        const deleteBtn = document.querySelector('.msgContainer i');
        const barMessagge = document.querySelector('.barMessagge');
        const msgCross = document.querySelector('.msgCross');
        const msgCounter = document.querySelector('.msgCount');

        function updateMsgCount(){
            let msgs = JSON.parse(localStorage.getItem("messages")) || [];
            msgCounter.textContent = msgs.length;
        }

        msgCross.addEventListener('click', () => {
            msgApp.classList.remove('active');
        });

        barMessagge.addEventListener('click', () => {
            msgApp.classList.add('active');
            displayMsg();
        });

        function storeMsg(msg){
            let msgs = JSON.parse(localStorage.getItem("messages")) || [];
            msgs.push(msg);
            localStorage.setItem("messages", JSON.stringify(msgs));
            updateMsgCount();
        }
        function displayMsg(){
            let msgs = JSON.parse(localStorage.getItem("messages")) || [];
            msgContainer.innerHTML = "";
            msgs.forEach(msg => {
                const li = document.createElement('li');
                li.textContent = msg;
                msgContainer.appendChild(li);
            });
        }
        function clearMsg(){
            localStorage.removeItem("messages");
            displayMsg();
                updateMsgCount();
        }


//-----------------Browser App----------------------
const browserApp = document.querySelector('.browserApp');
const browserIcon = document.querySelector('.barBrowser');
const browserCross = document.querySelector('.browserCross'
);
browserIcon.addEventListener('click', () => {
    browserApp.classList.add('appShow');
});
browserCross.addEventListener('click', () => {
    browserApp.classList.remove('appShow');
});

//-----------------Weather App----------------------
const weatherApp = document.querySelector('.weatherApp');
const weatherIcon = document.querySelector('.barWeather');
const weatherCross = document.querySelector('.weatherCross');   
weatherIcon.addEventListener('click', () => {
    weatherApp.classList.add('appShow');
});
weatherCross.addEventListener('click', () => {
    weatherApp.classList.remove('appShow');
});
