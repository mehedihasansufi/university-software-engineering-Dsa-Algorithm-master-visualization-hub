const menu = document.getElementById("menu");
const cross = document.getElementById("cross");
const navList = document.querySelector(".nav-links"); 

menu.addEventListener("click", () => {
    navList.classList.add("show-menu"); 
    menu.style.display = "none";
    cross.style.display = "block";
});

cross.addEventListener("click", () => {
    navList.classList.remove("show-menu"); 
    menu.style.display = "block";
    cross.style.display = "none";
});



// click to next page


const sorting=document.getElementById("sorting-btn")




sorting.addEventListener("click", ()=>{
    window.location.href="../sorting/sorting.html"
})