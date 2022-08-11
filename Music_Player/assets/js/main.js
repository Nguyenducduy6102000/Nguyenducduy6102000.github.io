/* 
    1. Render songs                 ok 
    2. Sroll top                    ok  
    3. Play / pause /  seek         ok
    4. CD rotate                    ok
    5. Next / prev                  ok  
    6. Random                       ok 
    7. Next / repeat when ended     ok 
    8. active song                  ok 
    9. Scroll active song into view ok
    10. Play song when click        ok 
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'

const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const repeatBtn = $('.btn-repeat');
const randomBtn = $('.btn-random');
const playlist = $('.playlist');
const currentTime = $('.currentTime');
const duration = $('.duration');



const app = {
    isPlaying: false,
    isReapeat: false,
    isRandom: false,
    currentIndex: 0,

    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    songs: [
        {
            name: 'Outside',
            artist: 'Fiji Blue',
            path: './assets/music/song1.mp3',
            image: './assets/images/song1.jpg'
        },
        {
            name: 'Wish we never happened',
            artist: 'BLÜ EYES',
            path: './assets/music/song2.mp3',
            image: './assets/images/song2.jpg'
        },
        {
            name: 'Why Not Me',
            artist: 'Enrique Iglesias',
            path: './assets/music/song3.mp3',
            image: './assets/images/song3.jpg'
        },
        {
            name: ' Until You',
            artist: 'Shayne Ward',
            path: './assets/music/song4.mp3',
            image: './assets/images/song4.jpg'
        },
        {
            name: 'Outside',
            artist: 'Fiji Blue',
            path: './assets/music/song1.mp3',
            image: './assets/images/song1.jpg'
        },
        {
            name: 'Wish we never happened',
            artist: 'BLÜ EYES',
            path: './assets/music/song2.mp3',
            image: './assets/images/song2.jpg'
        },
        {
            name: 'Why Not Me',
            artist: 'Enrique Iglesias',
            path: './assets/music/song3.mp3',
            image: './assets/images/song3.jpg'
        },
        {
            name: ' Until You',
            artist: 'Shayne Ward',
            path: './assets/music/song4.mp3',
            image: './assets/images/song4.jpg'
        }
    ],

    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.artist}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        playlist.innerHTML = htmls.join('')
    },

    /* defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    }, */

    currentSong: function () {
        return this.songs[this.currentIndex];

    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong().name;
        cdThumb.style.backgroundImage = `url('${this.currentSong().image}')`;
        audio.src = this.currentSong().path;
        this.setConfig('indexSong', this.currentIndex);
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isReapeat = this.config.isReapeat;
        this.currentIndex = this.config.indexSong;
    },

    handleEvents: function () {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // xử lý CD quay / dừng
        const cdAnimate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }], {
            duration: 60000, // 60s
            iterations: Infinity,
        })
        cdAnimate.pause();

        // xử lý phóng to / thu nhỏ
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop // lấy dữ liêu scroll to top
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // xử lý khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
                _this.loadTime();

            }
        }

        // xử lí khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdAnimate.play();
        };

        // xử lí khi bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdAnimate.pause();
        };

        // xử lý khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
                _this.loadTime();

            }

        };

        // xử lý khi tua bài hát 
        progress.onchange = function () {
            const seekTime = progress.value / 100 * audio.duration;
            audio.currentTime = seekTime;
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    _this.loadTime();

                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                    progress.value = progressPercent;
                }
            };

        };

        progress.addEventListener('mousedown', function (e) {
            audio.ontimeupdate = function () {
            };
        })

        // xử lý khi nhấn next button
        nextBtn.onclick = function () {
            cdAnimate.cancel()
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong()
            }
            _this.render();
            _this.scrollToActiveSong();
        };

        // xử lý khi nhấn prev button
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            }
            else {
                _this.prevSong()
            }
            cdAnimate.cancel()
            _this.render();
            _this.scrollToActiveSong();

        };

        // xử lý khi hết bài hát
        audio.onended = function () {
            if (_this.isReapeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
            cdAnimate.cancel()

        };


        // xử lý khi repeat song
        repeatBtn.onclick = function () {
            _this.isReapeat = !_this.isReapeat;
            _this.setConfig('isReapeat', _this.isReapeat)
            repeatBtn.classList.toggle('active', _this.isReapeat);

        };

        // xử lý khi bật tắt random button 
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom);
        };

        // lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            // console.log(e.target);
            if (songNode || e.target.closest('.option')) {
                // xử lý khi click vào song 
                if (songNode) {
                    // lấy data-index ra
                    // c1 songNode.getAttribute('data-index')
                    // c2 SongNode.dataset.index
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        };
    },


    loadTime: function () {
        duration.innerHTML = Math.floor(audio.duration / 60) + ':' + (Math.floor(audio.duration % 60) < 10 ? '0' + Math.floor(audio.duration % 60) : Math.floor(audio.duration % 60));
        currentTime.innerHTML = Math.floor(audio.currentTime / 60) + ':' + (Math.floor(audio.currentTime % 60) < 10 ? '0' + Math.floor(audio.currentTime % 60) : Math.floor(audio.currentTime % 60));

    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length)
            this.currentIndex = 0;
        this.loadCurrentSong();
        audio.play();


    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        audio.play();


    },

    randomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
    },

    scrollToActiveSong: function () {
        _this = this;
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        }, 300);
    },

    start: function () {


        // gáng cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nhĩa các thuộc tính cho object
        // this.defineProperties();

        // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng 
        this.loadCurrentSong();

        // render playlist
        this.render();

        // lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()

        // hiển trị trạng thái ban đầu khi load trang
        repeatBtn.classList.toggle('active', this.isReapeat);
        randomBtn.classList.toggle('active', this.isRandom);

    }
}

app.start();



