//----------------TaskBar Hover Effect----------------
const apps = document.querySelectorAll('.app');
document.querySelector('.taskbar').addEventListener('mousemove', e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    apps.forEach(app => {
        const appRect = app.getBoundingClientRect();
        const appCenter = appRect.left + appRect.width / 2 - rect.left;
        const distance = Math.abs(mouseX - appCenter);
        const maxScale = 1.5;
        const minScale = 1;
        const influence = 150;
        let scale = minScale + (maxScale - minScale) * Math.max(0, (influence - distance) / influence);
        app.style.transform = `scale(${scale}) translateY(${-(scale - 1) * 15}px)`;
        app.style.boxShadow = `2px  2px ${scale * 5}px rgba(0, 0, 0, ${scale - 1})`;
    });
});

document.querySelector('.taskbar').addEventListener('mouseleave', () => {
    apps.forEach(app => {
        app.style.transform = 'scale(1) translateY(0)';
        app.style.boxShadow = '2px 2px 0 rgba(0, 0, 0, 0)';
    });
});

apps.forEach(app => {
    app.addEventListener('click', () => {
        apps.forEach(a => a.classList.remove('clicked'));

        // Add 'clicked' to the one that was clicked
        app.classList.add('clicked');
        const appID = app.getAttribute('data-app');
        openApp(appID, app);
        // Remove it after 3 seconds
        setTimeout(() => {
            app.classList.remove('clicked');
        }, 1500);
    });
});


//----------------Open Appps----------------
function openApp(appID, app) {
    if(window.innerWidth < 700){
        if(appID === 'weather' || appID === 'calculator' || appID === 'music'){
            alert('This app is only available in desktop version!');
            return;
        }
    }
    const appWindow = document.getElementById(appID);
    if(appWindow.classList.contains('active')){
        appWindow.classList.remove('active');
        app.classList.remove('clicked');
        return;
    }
    if (appWindow) {
        appWindow.classList.add('active');
    }   
    if(appID === 'settings'){
        homeTab();
    }
}

//----------------Close Apps----------------
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', () => {    
        const appWindow = button.closest('.apk');
        appWindow.classList.remove('active');
        const appID = appWindow.getAttribute('id');
        const taskbarApp = document.querySelector(`.gridApp[data-app="${appID}"]`);
        if (taskbarApp) {
            taskbarApp.classList.remove('clicked');
        }
    });
});
//----------------Minimize Apps----------------
const minimizeButtons = document.querySelectorAll('.minimize');
minimizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const appWindow = button.closest('.apk');
        appWindow.classList.remove('active');
        const appID = appWindow.getAttribute('id');
        const taskbarApp = document.querySelector(`.gridApp[data-app="${appID}"]`);
        if (taskbarApp) {
            taskbarApp.classList.remove('clicked');
        }
    });
});
//----------------Draggable Apps----------------
const apkWindows = document.querySelectorAll('.apk');

apkWindows.forEach(win => {
    let isDragging = false;
    let offsetX, offsetY;

    // Only drag from a handle (like .drag)
    const dragHandle = win.querySelector('.drag');

    dragHandle.addEventListener("mousedown", e => {
        isDragging = true;

        // Calculate offset between mouse and window position
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;

        win.style.cursor = "grabbing";
        e.preventDefault(); // prevent text selection
    });

    document.addEventListener("mousemove", e => {
        if (!isDragging) return;

        // Apply offset so window follows pointer naturally
        win.style.left = (e.clientX - offsetX) + "px";
        win.style.top = (e.clientY - offsetY) + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        win.style.cursor = "default";
    });
});

//-----------------app focus-----------------
apkWindows.forEach(window => {
    window.addEventListener('mousedown', () => {
        apkWindows.forEach(w => w.style.zIndex = '0');
        window.style.zIndex = '1';
    }); 
});
//-----------------close app------------------
const powerButton = document.querySelector('.power');
powerButton.addEventListener('click', () => {
    const ask = confirm('Are you sure you want to shut down?');
    if(ask){
        alert('Shutting down...');
        setTimeout(() => {
            window.close();
        }, 2000);
    }
});

//------------------zIsland-----------------
const zIsland = document.querySelector(".zIsland");

function msg(message) {
    storeMsg(message);
    displayMsg();
    if (message.length > 10) {
        const marq = document.createElement('div');
        marq.textContent = message;
        marq.style.whiteSpace = 'nowrap';   // prevent line breaks
        marq.style.overflow = 'hidden'; 
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

//-------------------settings app-----------------
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
const barHour = document.querySelector('.barHour')
const barMinute = document.querySelector('.barMinute')
const barMonth = document.querySelector('.barMonth')
const barDay = document.querySelector('.barDay')
const barDate = document.querySelector('.barDate')
const year = document.getElementById('year');
year.textContent = new Date().getFullYear();
let isDragging = false;
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


function clock(){
    const now = new Date();
        let getHour = now.getHours();
    if (document.getElementById('12hr').checked) {
        getHour = getHour % 12 || 12; // convert to 12-hour format
    }
    hour.textContent = String(getHour).padStart(2, '0');
    barHour.textContent = String(getHour).padStart(2, '0');
    let getMinute = String(now.getMinutes()).padStart(2, '0');
    let getSec = String(now.getSeconds()).padStart(2, '0');
    minute.textContent = getMinute;
    second.textContent = getSec;
    barMinute.textContent = getMinute;
    barMonth.textContent = monthNames[now.getMonth()];
    barDay.textContent = String(now.getDay()).padStart(2, '0');
    barDate.textContent = String(now.getDate()).padStart(2, '0');
    const msUntilNextSecond = 1000 - now.getMilliseconds();
    setTimeout(clock, msUntilNextSecond);
}

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




//-----------------Personalize----------------------
const images = document.querySelectorAll('img');
const backgroundPic = document.querySelector('.backgroundPic');
function changeBg(){
    const selectedImage = document.querySelector('.imgSelected');
    if(selectedImage){
        backgroundPic.style.backgroundImage = `url(${selectedImage.src})`;
        msg('Wallpaper changed successfully!');
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
        const msgCounter = document.querySelector('.msgCount');

        function updateMsgCount(){
            let msgs = JSON.parse(localStorage.getItem("messages")) || [];
            msgCounter.textContent = msgs.length;
        }

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


//-----------------Init----------------------
window.addEventListener('load', () => {
    const boot = document.getElementById('bootScreen');
    setTimeout(() => {
        boot.classList.add('hide');
        setTimeout(() => boot.remove(), 800);
    }, 3000); // 3 seconds then fade out
    clock();
    if(window.innerWidth < 700){
        alert('For better experience, please use desktop version to access this website!');
    }   
    loadName();
    displayMsg();
    updateMsgCount();

});


//-----------------Battery Status----------------------
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        const batteryLevel = document.querySelector('.batteryStatus');
        const batteryIcon = document.createElement('i');
        if (battery.level > 0.9) {
            batteryIcon.className = 'fas fa-battery-full';
        } else if (battery.level > 0.5) {
            batteryIcon.className = 'fas fa-battery-three-quarters';
        } else if (battery.level == 0.5) {
            batteryIcon.className = 'fas fa-battery-half';
        } else if (battery.level > 0.45) {
            batteryIcon.className = 'fas fa-battery-quarter';
        } else {
            batteryIcon.className = 'fas fa-battery-empty';
        }
        batteryLevel.appendChild(batteryIcon);

        const batteryPercentage = document.querySelector('.batteryPercentage');
        batteryLevel.addEventListener('mouseover', () => {
            batteryPercentage.textContent = battery.level * 100 + '%';
            batteryPercentage.classList.add('showBattery');
        }); 
        batteryLevel.addEventListener('mouseout', () => {
            batteryPercentage.classList.remove('showBattery');
        });
    });
}


//----------------------------Music App--------------------------
const API_KEY = "AIzaSyDlM_Zvf6USvNuMnn0Km7X7i37JN0X6H-Y";

let ytPlayer, ytReady = false;
let localAudio = new Audio();
let allTracks = [];
let currentIdx = -1;
let isPlaying = false;
let usingLocal = false;
let progressInterval;

function fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60), ss = Math.floor(s % 60);
    return m + ':' + (ss < 10 ? '0' : '') + ss;
}

function initYTPlayer() {
    ytPlayer = new YT.Player('ytframe', {
        height: '1', width: '1', videoId: '',
        events: {
            onReady: () => { ytReady = true; },
            onStateChange: e => {
                if (e.data === YT.PlayerState.PLAYING) { isPlaying = true; updateUI(); startProgress(); }
                else if (e.data === YT.PlayerState.PAUSED) { isPlaying = false; updateUI(); }
                else if (e.data === YT.PlayerState.ENDED) { nextTrack(); }
            }
        }
    });
}
if (window.YT && window.YT.Player) {
    initYTPlayer();
} else {
    window.onYouTubeIframeAPIReady = initYTPlayer;
}

const searchBox = document.getElementById('searchBox');
searchBox.addEventListener('keydown', async e => {
    if (e.key !== 'Enter') return;
    const q = searchBox.value.trim();
    if (!q) return;
    renderLoading();
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(q + ' music')}&key=${API_KEY}&maxResults=12`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.error) { renderEmpty('API error: ' + data.error.message); return; }
        const ytTracks = data.items.map(it => ({
            id: it.id.videoId,
            title: it.snippet.title,
            type: 'yt',
            videoId: it.id.videoId,
            thumb: it.snippet.thumbnails?.default?.url || ''
        }));
        allTracks = [...getLocalTracks(), ...ytTracks];
        renderList();
    } catch (err) {
        renderEmpty('Search failed — check API key');
    }
});

function getLocalTracks() {
    return allTracks.filter(t => t.type === 'local');
}

document.getElementById('localFiles').addEventListener('change', e => {
    const files = Array.from(e.target.files);
    const newLocal = files.map(f => ({
        id: 'local_' + Math.random(),
        title: f.name.replace(/\.[^.]+$/, ''),
        type: 'local',
        url: URL.createObjectURL(f),
        thumb: ''
    }));
    allTracks = [...getLocalTracks(), ...newLocal, ...allTracks.filter(t => t.type === 'yt')];
    renderList();
    e.target.value = '';
});

function renderList() {
    const ul = document.getElementById('musicLists');
    ul.innerHTML = '';
    document.getElementById('trackCount').textContent = allTracks.length + ' tracks';
    if (!allTracks.length) { renderEmpty('No tracks yet'); return; }
    allTracks.forEach((t, i) => {
        const li = document.createElement('li');
        li.className = i === currentIdx ? 'active' : '';
        li.innerHTML = `
            <span class="li-icon"><i class="fas ${t.type === 'local' ? 'fa-file-audio' : 'fa-brands fa-dezzers'}"></i></span>
            <span class="li-title">${escHtml(t.title)}</span>
            <span class="li-src">${t.type === 'yt' ? 'YT' : 'local'}</span>`;
        li.onclick = () => playTrack(i);
        ul.appendChild(li);
    });
}

function renderEmpty(message) {
    document.getElementById('musicLists').innerHTML =
        `<li class="empty-state" style="border:none;pointer-events:none;">${message}</li>`;
    document.getElementById('trackCount').textContent = '';
}

function renderLoading() {
    document.getElementById('musicLists').innerHTML =
        `<li class="empty-state loading" style="border:none;pointer-events:none;">Searching...</li>`;
}

function escHtml(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function playTrack(idx) {
    const t = allTracks[idx];
    if (!t) return;
    currentIdx = idx;
    stopAll();
    usingLocal = t.type === 'local';

    document.getElementById('currentTrack').textContent = t.title;
    document.getElementById('trackSource').textContent = usingLocal ? 'Local file' : 'YouTube';
    updateIcon(t.thumb);
    renderList();
    msg('♫ ' + t.title);

    if (usingLocal) {
        localAudio.src = t.url;
        localAudio.play();
        isPlaying = true;
        updateUI();
        startProgress();
    } else {
        if (!ytReady) {
            // Poll until ready then play
            const poll = setInterval(() => {
                if (ytReady) {
                    clearInterval(poll);
                    ytPlayer.loadVideoById(t.videoId);
                    isPlaying = true;
                    updateUI();
                    startProgress();
                }
            }, 200);
            return;
        }
        ytPlayer.loadVideoById(t.videoId);
        isPlaying = true;
        updateUI();
        startProgress();
    }
}

function stopAll() {
    clearInterval(progressInterval);
    localAudio.pause();
    if (ytReady) try { ytPlayer.stopVideo(); } catch(ex) {}
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('curTime').textContent = '0:00';
}

function togglePlay() {
    if (currentIdx < 0) return;
    if (usingLocal) {
        isPlaying ? localAudio.pause() : localAudio.play();
        isPlaying = !isPlaying;
        updateUI();
    } else {
        if (!ytReady) return;
        isPlaying ? ytPlayer.pauseVideo() : ytPlayer.playVideo();
    }
}

function nextTrack() {
    if (!allTracks.length) return;
    playTrack((currentIdx + 1) % allTracks.length);
}
function prevTrack() {
    if (!allTracks.length) return;
    playTrack((currentIdx - 1 + allTracks.length) % allTracks.length);
}

function startProgress() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        let cur = 0, dur = 0;
        if (usingLocal) { cur = localAudio.currentTime; dur = localAudio.duration || 0; }
        else if (ytReady && ytPlayer.getCurrentTime) {
            try { cur = ytPlayer.getCurrentTime(); dur = ytPlayer.getDuration(); } catch(ex) {}
        }
        const pct = dur > 0 ? Math.min(cur / dur * 100, 100) : 0;
        document.getElementById('progressFill').style.width = pct + '%';
        document.getElementById('curTime').textContent = fmt(cur);
        document.getElementById('durTime').textContent = fmt(dur);
    }, 600);
}

document.getElementById('progressBar').addEventListener('click', e => {
    const bar = document.getElementById('progressBar');
    const pct = e.offsetX / bar.offsetWidth;
    if (usingLocal) localAudio.currentTime = pct * (localAudio.duration || 0);
    else if (ytReady) try { ytPlayer.seekTo(pct * ytPlayer.getDuration(), true); } catch(ex) {}
});

function updateUI() {
    document.getElementById('playIcon').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

function updateIcon(thumb) {
    const el = document.getElementById('musicIcon');
    el.innerHTML = thumb ? `<img src="${thumb}" alt="">` : `<i class="fas fa-music"></i>`;
}

document.getElementById('pauseBtn').addEventListener('click', togglePlay);
document.getElementById('nextBtn').addEventListener('click', nextTrack);
document.getElementById('prevBtn').addEventListener('click', prevTrack);
localAudio.addEventListener('ended', nextTrack);
localAudio.addEventListener('play', () => { isPlaying = true; updateUI(); startProgress(); });
localAudio.addEventListener('pause', () => { isPlaying = false; updateUI(); });
