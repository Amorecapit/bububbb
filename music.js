const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'audio/i love you bubub.mp3',
        displayName: 'I Love Youu Bububb',
        cover: 'img/IMG_20241028_124705.jpg',
        artist: 'Apitt',
    },
    {
        path: 'audio/The Changcuters - Karunia Semesta (Official Video Lyric).mp3',
        displayName: 'Karunia Semesta',
        cover: 'img/IMG-20241023-WA0085.jpg',
        artist: 'The Changcuters',
    },
    {
        path: 'audio/Afgan - Bukan Cinta Biasa Lirik Lagu.mp3',
        displayName: 'Bukan Cinta Biasa',
        cover: 'img/IMG-20241110-WA0007.jpg',
        artist: 'Afgan',
    },
    {
        path: 'audio/Afgan - Terima Kasih Cinta Lirik Lagu.mp3',
        displayName: 'Terima kasih cinta',
        cover: 'img/IMG-20241106-WA0020.jpg',
        artist: 'Afgan',
    },
    {
        path: 'audio/Afgan - Untukmu Aku Bertahan Lirik Lagu Indonesia.mp3',
        displayName: 'Untukmu Aku Bertahan',
        cover: 'img/IMG_20241109_212901.jpg',
        artist: 'Afgan',
    },
    {
        path: 'audio/Ari Lasso - Arti Cinta Official Music Video.mp3',
        displayName: 'Arti Cinta',
        cover: 'img/IMG-20241023-WA0076.jpg',
        artist: 'Ari Lasso',
    },
    {
        path: 'audio/Rio Clappy - Bunga Abadi (Official Lyric Video).mp3',
        displayName: 'Bunga Abadi',
        cover: 'img/IMG-20241110-WA0008.jpg',
        artist: 'Rio Capply',
    },
    {
        path: 'audio/Rony Parulian - Tak Ada Ujungnya (Official Music Video).mp3',
        displayName: 'Tak Ada Ujungnya',
        cover: 'img/Screenshot_2024-05-10-13-29-46-368_com.google.android.apps.photos.jpg',
        artist: 'Rony Parulian',
    },
    {
        path: 'audio/Melamarmu - Badai Romantic Project (official lyrics).mp3',
        displayName: 'Melamarmu',
        cover: 'img/IMG-20231116-WA0036.jpg',
        artist: 'Badai Romantic Project',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);