let now_playing = document.querySelector(".now-playing");
//let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  
  {
    name: "Aankh Marey",
    artist: "T-Series",
    path: "songs/Aankh_Marey.flac"
  },
  {
    name: "Ab Chahe Maa Roothe",
    artist: "T-Series",
    path: "songs/Ab_Chahe_Maa_Roothe.wav"
  },
  {
    name: "Ankhiyon Se Goli Mare",
    artist: "T-Series",
    path: "songs/Ankhiyon_Se_Goli_Mare.flac"
  },
  {
    name: "Baatein Ye Kabhi Na",
    artist: "T-Series",
    path: "songs/Baatein_Ye_Kabhi_Na.flac"
  },
  {
    name: "Chalti Hai Kya 9 Se 12",
    artist: "T-Series",
    path: "songs/Chalti_Hai_Kya_9_Se_12.flac"
  },
  {
    name: "Dilbar",
    artist: "T-Series",
    path: "songs/Dilbar.flac"
  },
  {
    name: "Dus Bahane",
    artist: "T-Series",
    path: "songs/Dus_Bahane.flac"
  },
  {
    name: "Ek Do Teen",
    artist: "T-Series",
    path: "songs/Ek_Do_Teen.flac"
  },
  {
    name: "O Saki Saki",
    artist: "T-Series",
    path: "songs/O_Saki_Saki.flac"
  },
  {
    name: "Muqabla",
    artist: "T-Series",
    path: "songs/Muqabla.flac"
  },
  {
    name: "Samjhawan Ki",
    artist: "Arijit Singh",
    path: "songs/Samjhawan.flac"
  },
  
  {
    name: "Sheher Ki Ladki",
    artist: "T-Series",
    path: "songs/Sheher_Ki_Ladki.flac"
  },
  {
    name: "Tu Par Hum Hai Atke",
    artist: "T-Series",
    path: "songs/Tum_Par_Hum_Hai_Atke.flac"
  },

  
];

function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  //curr_track.controls = true
  curr_track.id = "abc"
  curr_track.volume = 0.5;
  curr_track.load();
  var src = document.getElementById("audio")
  src.appendChild(curr_track);
  //track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  //track_path.textContent = track_list[track_index].path;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();

}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


