const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const btn=document.getElementById("sendloc");

btn.addEventListener("click",(e)=>{
    navigator.geolocation.getCurrentPosition(async(a)=>{
        const result = latitude: ${a.coords.latitude}, longitude: ${a.coords.longitude};
        console.log(result)
        socket.emit('location',result);
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('location', input.value);
        input.value = '';
    }
});

socket.on('location', (msg) => {
    const item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});