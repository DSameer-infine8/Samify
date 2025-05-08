const btns = document.querySelector(".invert");
const bar = document.querySelector(".bar");
const large = document.querySelector(".full");
const face = document.querySelector(".face");
var audio = document.getElementById('audio');
let link = "http://127.0.0.1:5500/Songs/song/";
var yess = true;

const menu = () =>{
    if (yess == true){
		bar.style.width = "61px";
		large.style.width = "1450px"; 
		large.style.marginLeft = "71px"; 
        yess = false;
    }
    else if(yess == false) {
		bar.style.width = "345px"; 
		large.style.width = "1166px"; 
		large.style.marginLeft = "355px"; 
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


/* search bar

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    alert('Searching for: ' + query);
});

*/
let like = document.querySelector(".like");

/*fetch songs name*/



const getName = async () => {
    let a = await fetch(link);
    let response = await a.text();

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
    let a = await fetch(link);
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



//Library Playlist play

const libLi = async () =>{
	let songs = await getName();
	let songsURL = await getSongs();
	for (let index = 0; index < songs.length; index++) {
		let playLists = document.querySelector(".play-lists");
		let li = document.createElement("li");
		li.classList.add('now')
		li.id = index
		li.innerHTML = `<img class="okp" id=${songsURL[index]} src="./icons/play-but.png "/><p class="LiNames">${songs[index]}</p>`
		playLists.appendChild(li);
		
	}

var libSongs = document.querySelectorAll(".okp");
libSongs.forEach(function(libSong) {
	libSong.addEventListener("click", function() {
		audio.pause();
	  songNow = this.id; // "this" refers to the clicked button
	  audio.src = songNow;
	  audio.load();
	  audio.play();
	  playBtn1.src = "./icons/pause.png"
	  count = 1;

	});
});

var libNames = document.querySelectorAll(".now");
libNames.forEach(function(libName) {
	libName.addEventListener("click", function() {
		playName.innerText = songs[libName.id];

	});
});


}

libLi();


/*play bar*/
var playBtn1 = document.querySelector(".play");
var playNxtBtn = document.querySelector(".playNxt");
var playPrvBtn = document.querySelector(".play-prev");
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
	let songs = await getAlbumSongs();
	let names = await NameforAlbum();
	index = index-1;
	let songURL = songs[index]
	let name = names[index]
	audio.src = songURL;
	audio.load();
	audio.play();
	playName.innerText = name;
}

const playNxtSong = async () =>{
	let songs = await getAlbumSongs();
	let names = await NameforAlbum();
	let songURL = songs[index]
	let name = names[index]
	audio.src = songURL;
	audio.load();
	audio.play();
	playName.innerText = name;
	index = index+1;
}

playBtn1.addEventListener("click", playPause);
playNxtBtn.addEventListener("click", playNxtSong);
playPrvBtn.addEventListener("click", playPrvSong);


libLi();


//for album 
let albumName = document.querySelector(".display-ablumName");
let albumImg = document.querySelector(".albumimg");
let mainLink = "http://127.0.0.1:5500/Songs/Albums/";
let playLink = "";
let cardNames = document.querySelectorAll(".cards");

cardNames.forEach(function(cardName){
	cardName.addEventListener("click", function(){
		playLink = `http://127.0.0.1:5500/Songs/Albums/${this.id}/`
		NameforAlbum();
		getAlbumSongs();
		albumLi();
		albumName.innerText = this.id;
		albumImg.src = `./song_img/${this.id}.jpg`;
	})
})

const NameforAlbum = async () => {
	console.log(playLink);
    let a = await fetch(playLink);
    let response = await a.text();

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



const getAlbumSongs = async () => {
    let a = await fetch(playLink);
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


//Album Playlist play

const albumLi = async () =>{
	let songs = await NameforAlbum();
	let songsURL = await getAlbumSongs();
	let playLists = document.querySelector(".track");
	playLists.innerHTML = ''; 

	for (let index = 0; index < songs.length; index++) {
		let li = document.createElement("li");
		li.classList.add('songtrack')
		li.id = index
		li.innerHTML = `<img class="trackLi" id=${songsURL[index]} src="./icons/play-but.png "/><p class="trackLiNames">${songs[index]}</p>`
		playLists.appendChild(li);
		
}

var libSongs = document.querySelectorAll(".trackLi");
libSongs.forEach(function(libSong) {
	libSong.addEventListener("click", function() {
		audio.pause();
	  songNow = this.id; // "this" refers to the clicked button
	  audio.src = songNow;
	  audio.load();
	  audio.play();
	  playBtn1.src = "./icons/pause.png"
	  count = 1;

	});
});

var libNames = document.querySelectorAll(".songtrack");
libNames.forEach(function(libName) {
	libName.addEventListener("click", function() {
		playName.innerText = songs[libName.id];

	});
});


}

albumLi();

function showAlbum() {
	document.querySelector('.full').classList.remove('active');
	document.querySelector('.full-album').classList.add('active');
	window.scrollTo(0, 0);
  }

  function showHome() {
	document.querySelector('.full-album').classList.remove('active');
	document.querySelector('.full').classList.add('active');
  }