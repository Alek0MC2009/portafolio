// Lista de canciones con nombre y autor
const playlist = [
    { src: "music/finale_aleko.mp3", name: "Finale Alek0 Version", author: "Alek0MC2009, Toby Fox" },
    { src: "music/sida_beatz.mp3", name: "SadStarz", author: "Alek0MC2009" },
    { src: "music/until_next_time_aleko.mp3", name: "Until Next Time Alek0 Version", author: "Alek0, Toby Fox, Laura Shigihara" }
];

let currentIndex = 0;
const audio = new Audio();
const currentSongLabel = document.getElementById("current-song");
const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const listElement = document.getElementById("playlist");

// Crear lista visual mostrando nombre y autor
playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.author}`; // Mostrar nombre y autor
    li.addEventListener("click", () => {
        currentIndex = index;
        playSong();
        updatePlaylistUI();
    });
    listElement.appendChild(li);
});

// Función para reproducir canción
function playSong() {
    audio.src = playlist[currentIndex].src;
    audio.play();
    currentSongLabel.textContent = `${playlist[currentIndex].name} - ${playlist[currentIndex].author}`;
    updatePlaylistUI();
}

// Funciones básicas
function pauseSong() { audio.pause(); }
function nextSong() { currentIndex = (currentIndex + 1) % playlist.length; playSong(); }
function prevSong() { currentIndex = (currentIndex - 1 + playlist.length) % playlist.length; playSong(); }

// Botones
document.getElementById("play").addEventListener("click", playSong);
document.getElementById("pause").addEventListener("click", pauseSong);
document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("prev").addEventListener("click", prevSong);

// Barra de progreso
audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progressPercent + "%";

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
    currentTimeEl.textContent = `${minutes}:${seconds}`;

    const dMinutes = Math.floor(audio.duration / 60);
    const dSeconds = Math.floor(audio.duration % 60).toString().padStart(2, "0");
    durationEl.textContent = `${dMinutes}:${dSeconds}`;
});

// Click en barra para saltar
document.querySelector(".progress-container").addEventListener("click", (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// Reproducir siguiente automáticamente
audio.addEventListener("ended", nextSong);

// Resaltar canción activa
function updatePlaylistUI() {
    document.querySelectorAll("#playlist li").forEach((li, idx) => {
        li.classList.toggle("active", idx === currentIndex);
    });
}
