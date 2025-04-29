const btns = document.querySelector(".invert");
const bar = document.querySelector(".bar");
const large = document.querySelector(".full");
const face = document.querySelector(".face");

var yess = true;

const menu = () =>{
    if (yess == true){
        bar.style.width = "345px"; 
		bar.style.position = "fixed";
		large.style.width = "1166px"; 
		large.style.marginLeft = "355px"; 
		face.style.overflow = "hidden";
        yess = false;
    }
    else if(yess == false) {
        bar.style.width = "61px";
		bar.style.position = "fixed";
		large.style.width = "1450px"; 
		large.style.marginLeft = "71px"; 
		face.style.overflow = "hidden";
        yess = true;
    }
}

btns.addEventListener("click",menu);
/*slider card*/

document.addEventListener("DOMContentLoaded", function() { 
	const carousel = document.querySelector(".carousel"); 
	const arrowBtns = document.querySelectorAll(".wrapper i"); 
	const wrapper = document.querySelector(".wrapper"); 

	const firstCard = carousel.querySelector(".card"); 
	const firstCardWidth = firstCard.offsetWidth; 

	let isDragging = false, 
		startX, 
		startScrollLeft, 
		timeoutId; 

	const dragStart = (e) => { 
		isDragging = true; 
		carousel.classList.add("dragging"); 
		startX = e.pageX; 
		startScrollLeft = carousel.scrollLeft; 
	}; 

	const dragging = (e) => { 
		if (!isDragging) return; 
	
		// Calculate the new scroll position 
		const newScrollLeft = startScrollLeft - (e.pageX - startX); 
	
		// Check if the new scroll position exceeds 
		// the carousel boundaries 
		if (newScrollLeft <= 0 || newScrollLeft >= 
			carousel.scrollWidth - carousel.offsetWidth) { 
			
			// If so, prevent further dragging 
			isDragging = false; 
			return; 
		} 
	
		// Otherwise, update the scroll position of the carousel 
		carousel.scrollLeft = newScrollLeft; 
	}; 

	const dragStop = () => { 
		isDragging = false; 
		carousel.classList.remove("dragging"); 
	}; 

	const autoPlay = () => { 
	
		// Return if window is smaller than 800 
		if (window.innerWidth < 800) return; 
		
		// Calculate the total width of all cards 
		const totalCardWidth = carousel.scrollWidth; 
		
		// Calculate the maximum scroll position 
		const maxScrollLeft = totalCardWidth - carousel.offsetWidth; 
		
		// If the carousel is at the end, stop autoplay 
		if (carousel.scrollLeft >= maxScrollLeft) return; 
		
		// Autoplay the carousel after every 2500ms 
		timeoutId = setTimeout(() => 
			carousel.scrollLeft += firstCardWidth, 2500); 
	}; 

	carousel.addEventListener("mousedown", dragStart); 
	carousel.addEventListener("mousemove", dragging); 
	document.addEventListener("mouseup", dragStop); 
	wrapper.addEventListener("mouseenter", () => 
		clearTimeout(timeoutId)); 
	wrapper.addEventListener("mouseleave", autoPlay); 

	// Add event listeners for the arrow buttons to 
	// scroll the carousel left and right 
	arrowBtns.forEach(btn => { 
		btn.addEventListener("click", () => { 
			carousel.scrollLeft += btn.id === "left" ? 
				-firstCardWidth : firstCardWidth; 
		}); 
	}); 
}); 


/* search bar*/

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    alert('Searching for: ' + query);
});


let like = document.querySelector(".like");

/*fetch songs name*/



const getName = async () => {
    let a = await fetch("http://127.0.0.1:5500/Songs/song/");
    let response = await a.text();
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let li = div.getElementsByTagName("li");
    let songs = [];

    for (let index = 0; index < li.length; index++) {
        const element = li[index];
        const name = element.querySelector(".name"); // get span.name
        if (name && name.innerText.trim().endsWith(".mp3")) {
            let cleanName = name.innerText.trim().slice(0, -4); // remove last 4 characters (.mp3)
            songs.push(cleanName);
        }
    }

    return(songs);
}

getName();


/*fetch song URL*/

const getSongs = async () => {
    let a = await fetch("http://127.0.0.1:5500/Songs/song/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];
	for (let index = 0; index < as.length; index++) {
		const element = as[index];
		if(element.href.endsWith(".mp3")){
			songs.push(element.href)
		}	
	}


	return songs;
}




const libLi = async () =>{
	let songs = await getName();
	for (let index = 0; index < songs.length; index++) {
		let playLists = document.querySelector(".play-lists");
		let li = document.createElement("li");
		li.innerHTML = `<img class=okp id=song${index+1} src="./icons/play-but.png "/> <p>${songs[index]}</p>`
		playLists.appendChild(li);
		
	}
}

libLi();


/*play bar*/
var playBtn1 = document.querySelector(".play");
var playNxtBtn = document.querySelector(".playNxt");
var playPrvBtn = document.querySelector(".play-prev");
var audio = document.getElementById('audio');
var playName = document.querySelector(".play-info");
var count = 0;
var index = 0;

const playPause = () =>{
	if(count ==0){
		count = 1;
		audio.play();
		playBtn1.src = "./icons/pause.png"
	}else{
		count = 0;
		audio.pause();
		playBtn1.src = "./icons/play (1).png"
	}
}
const playPrvSong = async () =>{
	let songs = await getSongs();
	let names = await getName();
	index = index-1;
	let songURL = songs[index]
	let name = names[index]
	console.log(songURL);
	audio.src = songURL;
	audio.load();
	audio.play();
	playName.innerText = name;
}

const playNxtSong = async () =>{
	let songs = await getSongs();
	let names = await getName();
	let songURL = songs[index]
	let name = names[index]
	console.log(songURL);
	audio.src = songURL;
	audio.load();
	audio.play();
	playName.innerText = name;
	index = index+1;
}

playBtn1.addEventListener("click", playPause);
playNxtBtn.addEventListener("click", playNxtSong);
playPrvBtn.addEventListener("click", playPrvSong);