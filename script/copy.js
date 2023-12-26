// all references
const Play = document.querySelector('#play');
const music1 = document.querySelector('audio');
const image = document.querySelector('img');
const prevbtn = document.querySelector('#prev');
const nextbtn = document.querySelector('#next');
const songname = document.querySelector('#songname');
const artistname = document.querySelector('#artist');
const song_duration = document.querySelector('#duration');
const progress_div = document.querySelector('#progress_div');
const Loop_song = document.querySelector('#loop');
let progressline = document.querySelector('#progress');
let song_time = document.querySelector('#current_time');
const music_container = document.querySelector('.music_container');

// this variable will change on every click
let isActive = false;

// for play music
const playmusic = () => {
    isActive = true;
    music1.play();
    image.classList.add('anime');
    Play.classList.replace('fa-play', 'fa-pause');
    random_bg()
};

// for pause music
const pausemusic = () => {
    isActive = false;
    music1.pause();
    image.classList.remove('anime');
    Play.classList.replace('fa-pause', 'fa-play');
};

// when click on btn check condition 

Play.addEventListener('click', () => {
    isActive ? pausemusic() : playmusic();
});
// because by default isActive false hai toh click krne pr playmusic hi chlega pr  
// playmusic function isActive ki value ko hange krra hai true mai toh agli baar   
// isActive ki value true hogi and pausemusic function call hoga playmusic nhi.

// array of objects for data
const songs = [
    {
        songname: "Bad liar",
        artistname: "Imagine Dragons",
        Name: "Bad-liar",
    },
    {
        songname: "Carol bells",
        artistname: "Mykola Leontovych",
        Name: "Carol-bells",
    },
    {
        songname: "Experience",
        artistname: "Ludovico Einaudi",
        Name: "Experience",
    },
    {
        songname: "Genius",
        artistname: "ft. Sia, Diplo, Labrinth",
        Name: "Genius",
    },
    {
        songname: "Heat waves",
        artistname: "Dave Bayley",
        Name: "Heat-waves",
    },
    {
        songname: "House memories",
        artistname: "Panic! At The Disco",
        Name: "House-memories",
    },
    {
        songname: "Hymn weekend",
        artistname: "Coldplay",
        Name: "Hymn-weekend",

    },
    {
        songname: "Here",
        artistname: "Coldplay",
        Name: "Here",

    },
    {
        songname: "Lovely",
        artistname: "Coldplay",
        Name: "Lovely",

    },
    {
        songname: "Rockabye",
        artistname: "Coldplay",
        Name: "rockabye",

    },
    {
        songname: "Middle of night",
        artistname: "Coldplay",
        Name: "Middle-night",

    }
]

// to change a data
const change = (songs) => {
    songname.textContent = songs.songname;
    artistname.textContent = songs.artistname;
    image.src = `image/${songs.Name}.jpg`;
    music1.src = `music/${songs.Name}.mp3`;
}

let counternext = 0;
const nextsong = () => {
    /* counternext = counternext + 1;  
    if(counternext > songs.length){     // This code can also do the job.
        counternext = 0;
    } 
    */
    progressline.style.width = '0%'       // so width fastly width 0% se start ho
    counternext = (counternext + 1) % songs.length;
    change(songs[counternext]);
    random_bg();
    playmusic();

}

// let counterprev = songs.length;
const prevsong = () => {

    /*   counternext = counternext - 1;   // This code can also do the job..
    if(counternext < 0){
        counternext = songs.length;
    }
    */
    progressline.style.width = '0%'     // so width fastly width 0% se start ho
    counternext = (counternext - 1 + songs.length) % songs.length;
    change(songs[counternext]);
    random_bg();
    playmusic();
}

let isloop = false;

const Song_loop = () => {
    isloop = true;
    music1.loop = true;
    Loop_song.classList.replace('fa-shuffle', 'fa-repeat');
}
const Song_loop_remove = () => {
    isloop = false;
    music1.loop = false;
    Loop_song.classList.replace('fa-repeat', 'fa-shuffle');
}
// on loop song
Loop_song.addEventListener('click', () => {
    if (isloop) {
        Song_loop_remove();
    }
    else {
        Song_loop();
    }

});




// Progress works
music1.addEventListener('timeupdate', (event) => {        // music ke chlne pr timeupdate ho

    const { currentTime, duration } = event.srcElement;   // mtlb ki voh do objects ke elements ko event ke same elements ki value de doh

    let progressbar = (currentTime / duration) * 100;     // percentage nikalenge song ke currentime or total duration se and 
    progressline.style.width = `${progressbar}%`;          // voh result hi width hogi progressbar ki jo ki time ke acc. bdlegi.

    // music duration updating
    const d_m = Math.floor(duration / 60);
    let d_s = Math.floor(duration % 60);
    if (d_s < 10) {
        d_s = `0${d_s}`;  // mtlb agr mere seconds single ho toh unke aage 0 lga ho 
    }
    if (duration) {             //mtlb jbtk duration ready na ho jaaye screen pr dikhne ke liye jb tk kuch print na ho
        song_duration.textContent = `${d_m}:${d_s}`;    // kyunki voh Nan:Nan dikha rha tha for miliseconds  ke liye.
    }

    // song current time Update

    const c_m = Math.floor(currentTime / 60);           //same logic for current time ke except currenttime use kro.
    let c_s = Math.floor(currentTime % 60);
    if (c_s < 10) {
        c_s = `0${c_s}`;
    }
    if (duration) {
        song_time.textContent = `${c_m}:${c_s}`;
    }
});

// movable progressbar
progress_div.addEventListener('click', (e) => {
    const { duration } = music1;
    let Progress_move = (e.offsetX / e.srcElement.clientWidth) * duration;  // duration se multiply isiliye kiya taaki hum time mai convert kr ske.
    music1.currentTime = Progress_move;
    // currentTime use krne se hum new time ko currrentime mai convert kre hai toh vhi se hi song resume ho jaye & progress_move voh new time lekr ara hai. 

});
// 'offsetX' means kha pr click kra hai, 'clientwidth' means kitni width thi vha jha click huya tk 
// shuru se. so humme kisi trh iss iss %age(Not exactly %age) ko time mai convert krke upadte krna hai songtime.


music1.addEventListener('ended', nextsong);     //means when song ended next song should play. because we call the nwxt song.
nextbtn.addEventListener('click', nextsong);
prevbtn.addEventListener('click', prevsong);

function random_bg() {
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  function changing(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 15);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let color1 = changing('#');
  let color2 = changing('#');
  var angle = 'to right';
  let gradient = "linear-gradient(" + angle + ',' + color1 + ',' + color2 + ')';
  music_container.style.background = gradient;
}