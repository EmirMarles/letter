const envelope = document.querySelector(".envelope-wrapper");
const stamp = document.querySelector(".stamp");

stamp.addEventListener("click", ()=>{
    envelope.classList.toggle("flap")
})