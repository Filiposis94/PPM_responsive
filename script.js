const clock = document.getElementById('clock');

const comunicationList = document.getElementById('info-comunication-list');
const profileList = document.getElementById('info-profile-list');
const comunicationBtn = document.getElementById('info-comunication-btn');
const profileBtn = document.getElementById('info-profile-btn');

const informace = document.getElementById('main-nav-informace');
const komunita = document.getElementById('main-nav-komunita');
const informaceList = document.getElementById('nav-list-informace');
const komunitaList = document.getElementById('nav-list-komunita');
const secondNavFill = document.getElementById('secondary-nav-fill');

// CLOCK
const updateClock = ()=>{
    setInterval(()=>{
        const d = new Date();
        const h = d.getHours()<10 ? `0${d.getHours()}`: d.getHours();
        const m = d.getMinutes()<10 ? `0${d.getMinutes()}`: d.getMinutes();
        const s = d.getSeconds()<10 ? `0${d.getSeconds()}`: d.getSeconds();
        clock.innerText = `${h}:${m}:${s}`
    },1000)
}
updateClock();

// INFO LIST LOGIC
comunicationBtn.addEventListener('click',()=>{
    if(comunicationList.className === 'info-list'){
        comunicationList.classList.add('shown');
        comunicationBtn.classList.add('info-btn-active');
    } else{
        comunicationList.className = 'info-list';
        comunicationBtn.className = 'info-btn';
    };
});

profileBtn.addEventListener('click',()=>{
    if(profileList.className === 'info-list'){
        profileList.classList.add('shown');
        profileBtn.classList.add('info-btn-active');
    } else{
        profileList.className = 'info-list';
        profileBtn.className = 'info-btn';
    };
});
// NAV LOGIC
if(window.screen.width < 800){
    informace.addEventListener('click', ()=>{    
        if(informaceList.className === 'secondary-nav-list'){
            informaceList.classList.add('shown');
        } else{
            informaceList.className = 'secondary-nav-list';
        };
    });
    komunita.addEventListener('click', ()=>{    
        if(komunitaList.className === 'secondary-nav-list'){
            komunitaList.classList.add('shown');
        } else{
            komunitaList.className = 'secondary-nav-list';
        };
    });
}
if(window.screen.width >= 800){
    informace.addEventListener('mouseover', ()=>{
        informaceList.classList.add('shown-flex');
        secondNavFill.classList.add('none');               
    });
    informace.addEventListener('mouseout', ()=>{
        informaceList.classList.remove('shown-flex');
        secondNavFill.classList.remove('none');
    });
    komunita.addEventListener('mouseover', ()=>{
        komunitaList.classList.add('shown-flex');
        secondNavFill.classList.add('none');               
    });
    komunita.addEventListener('mouseout', ()=>{
        komunitaList.classList.remove('shown-flex');
        secondNavFill.classList.remove('none');
    });
}
