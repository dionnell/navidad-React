import { useState, useEffect, useRef } from 'react';


export const PlaylistMusic = () => {

  const [state, setState] = useState({
    index: 0,
    currentTime: '0:00',
    musicList: [
        {
            name: 'Jingle Bells',
            author: 'Drake Bell',
            img: '/drake_bell.jpeg',
            audio: '/songs/Drake Bell - Jingle Bells.MP3',
            duration: '2:25'
        },
        {
            name: 'All I Want For Christmas Is You',
            author: 'Mariah Carey',
            img: '/Mariah_Carey.jpg',
            audio: '/songs/Mariah Carey - All I Want For Christmas Is You.MP3',
            duration: '3:50'
        },
        {
            name: 'Todo Es Posible En Navidad',
            author: 'David Bisbal',
            img: '/David_Bisbal.jpg',
            audio: '/songs/David Bisbal - Todo Es Posible En Navidad.MP3',
            duration: '3:30'
        },
        {
            name: 'Holly Jolly Christmas',
            author: 'Michael Bublé',
            img: '/Michael_Buble.jpg',
            audio: '/songs/Michael Bublé - Holly Jolly Christmas.MP3',
            duration: '2:00'
        },
        {
            name: 'Christmas Tree Farm',
            author: 'Taylor Swift',
            img: '/Taylor_Swift.jpg',
            audio: '/songs/Taylor Swift - Christmas Tree Farm.MP3',
            duration: '3:45'
        },
        {
            name: 'Last Christmas',
            author: 'Ariana Grande',
            img: '/Ariana_Grande.jpg',
            audio: '/songs/Ariana Grande - Last Christmas.MP3',
            duration: '3:20'
        },
        {
            name: 'Man With The Bag',
            author: 'Jessie J',
            img: '/Jessie_J.jpg',
            audio: '/songs/Man With The Bag.MP3',
            duration: '2:40'
        },
        {
            name: 'Cozy Little Christmas',
            author: 'Katy Perry',
            img: '/Katy_Perry.jpg',
            audio: '/songs/Katy Perry - Cozy Little Christmas.MP3',
            duration: '2:40'
        }
    ],
    pause: false
  });

  const playerRef = useRef(null);
  const timelineRef = useRef(null);
  const playheadRef = useRef(null);
  const hoverPlayheadRef = useRef(null);

  useEffect(() => {
      const timeUpdateHandler = () => {
          const duration = playerRef.current.duration;
          const playPercent = 100 * (playerRef.current.currentTime / duration);
          playheadRef.current.style.width = playPercent + "%";
          const currentTime = formatTime(parseInt(playerRef.current.currentTime));
          setState((prevState) => ({ ...prevState, currentTime }));
      };

      const nextSongHandler = () => {
          const { musicList, index, pause } = state;
          setState((prevState) => ({
              ...prevState,
              index: (index + 1) % musicList.length
          }));
          updatePlayer();
          if (pause) {
              playerRef.current.play();
          }
      };

      const changeCurrentTimeHandler = (e) => {
          const duration = playerRef.current.duration;
          const playheadWidth = timelineRef.current.offsetWidth;
          const offsetWidth = timelineRef.current.offsetLeft;
          const userClickWidth = e.clientX - offsetWidth;
          const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

          playheadRef.current.style.width = userClickWidthInPercent + "%";
          playerRef.current.currentTime = (duration * userClickWidthInPercent) / 100;
      };

      const hoverTimeLineHandler = (e) => {
          const duration = playerRef.current.duration;
          const playheadWidth = timelineRef.current.offsetWidth;
          const offsetWidth = timelineRef.current.offsetLeft;
          const userClickWidth = e.clientX - offsetWidth;
          const userClickWidthInPercent = (userClickWidth * 100) / playheadWidth;

          if (userClickWidthInPercent <= 100) {
              hoverPlayheadRef.current.style.width = userClickWidthInPercent + "%";
          }

          const time = duration * userClickWidthInPercent / 100;

          if (time >= 0 && time <= duration) {
              hoverPlayheadRef.current.dataset.content = formatTime(time);
          }
      };

      const resetTimeLineHandler = () => {
          hoverPlayheadRef.current.style.width = 0;
      };

      playerRef.current.addEventListener("timeupdate", timeUpdateHandler, false);
      playerRef.current.addEventListener("ended", nextSongHandler, false);
      timelineRef.current.addEventListener("click", changeCurrentTimeHandler, false);
      timelineRef.current.addEventListener("mousemove", hoverTimeLineHandler, false);
      timelineRef.current.addEventListener("mouseout", resetTimeLineHandler, false);

      return () => {
          playerRef.current.removeEventListener("timeupdate", timeUpdateHandler);
          playerRef.current.removeEventListener("ended", nextSongHandler);
          timelineRef.current.removeEventListener("click", changeCurrentTimeHandler);
          timelineRef.current.removeEventListener("mousemove", hoverTimeLineHandler);
          timelineRef.current.removeEventListener("mouseout", resetTimeLineHandler);
      };
  }, [state]);

  const formatTime = (currentTime) => {
      const minutes = Math.floor(currentTime / 60);
      let seconds = Math.floor(currentTime % 60);
      seconds = seconds >= 10 ? seconds : "0" + seconds % 60;
      return `${minutes}:${seconds}`;
  };

  const updatePlayer = () => {
      const { musicList, index } = state;
      const currentSong = musicList[index];
      const audio = new Audio(currentSong.audio);
      playerRef.current.load();
  };

  const nextSong = () => {
      const { musicList, index, pause } = state;
      setState((prevState) => ({
          ...prevState,
          index: (index + 1) % musicList.length
      }));
      updatePlayer();
      playerRef.current.play();
      if (!pause) {
        setState((prevState) => ({ ...prevState, pause: !pause }));
    } else {
      setState((prevState) => ({ ...prevState, pause: pause }));
    }
  };

  const prevSong = () => {
      const { musicList, index, pause } = state;
      setState((prevState) => ({
          ...prevState,
          index: (index + musicList.length - 1) % musicList.length
      }));
      updatePlayer();
      playerRef.current.play();
      if (!pause) {
        setState((prevState) => ({ ...prevState, pause: !pause }));
    } else {
      setState((prevState) => ({ ...prevState, pause: pause }));
    }
  };

  const playOrPause = () => {
      const { pause } = state;
      if (!pause) {
          playerRef.current.play();
      } else {
          playerRef.current.pause();
      }
      setState((prevState) => ({ ...prevState, pause: !pause }));
  };

  const clickAudio = (key) => {
      const { pause } = state;
      setState((prevState) => ({ ...prevState, index: key }));
      updatePlayer();
      playerRef.current.play();
      if (!pause) {
        setState((prevState) => ({ ...prevState, pause: !pause }));
    } else {
      setState((prevState) => ({ ...prevState, pause: pause }));
    }
  };


  const { musicList, index, currentTime, pause } = state;
  const currentSong = musicList[index];
  
  
  

  return (
    <div className="grid grid-cols-2 justify-center items-center  p-1 mb-10 rounded-2xl overflow-hidden text-[#b3cde0] font-light bg-[#011f4b] shadow-[0px_0px_70px_0px_#274684] h-[440px] max-md:grid-cols-1 max-md:h-[700px] max-md:w-[300px]">
        <div  className="flex flex-col items-center w-[360px] py-5 mx-auto rounded-2xl text-[#011f4b] bg-[#b3cde0] max-md:h-[350px] max-md:w-[280px]">
            <audio  className='hidden' ref={playerRef}>
                <source src={currentSong.audio} type="audio/ogg" />
                <source src={currentSong.audio} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
            <div className="relative m-0 w-[200px] h-[200px] rounded-3xl  shadow-[0px_10px_40px_0px_rgba(39,70,132,0.7)] overflow-hidden hover:animate-[convertirEnCirculo_0.35s_forwards]">
                <img className='w-full h-full object-cover' src={currentSong.img} alt="Song cover" />
            </div>
            <span className="mt-7 text-4xl font-medium">{currentSong.name}</span>
            <span className="text-[#03396c]">{currentSong.author}</span>
            <div className="flex justify-between mt-2 w-[240px]">
                <div className="current-time font-normal text-2xl">{currentTime}</div>
                <div className="end-time font-normal text-2xl">{currentSong.duration}</div>
            </div>
            <div ref={timelineRef} id="timeline">
                <div ref={playheadRef} id="playhead" />
                <div ref={hoverPlayheadRef} className="hover-playhead" data-content="0:00" />
            </div>
            <div className="mt-2 controls">
                <button onClick={prevSong} className="prev prev-next current-btn hover:shadow-[0px_0px_15px_0px_rgba(39,70,132,0.7)]">
                    <ion-icon name="play-skip-back"></ion-icon>
                </button>
                <button onClick={playOrPause} className="play current-btn">
                    {!pause ? <ion-icon name="play"></ion-icon> : <ion-icon name="pause"></ion-icon>}
                </button>
                <button onClick={nextSong} className="next prev-next current-btn hover:shadow-[0px_0px_15px_0px_rgba(39,70,132,0.7)]">
                    <ion-icon name="play-skip-forward"></ion-icon>
                </button>
            </div>
        </div>
        <div className="play-list max-md:h-[300px] max-md:py-0 ">
            {musicList.map((music, key) => (
                <div
                    key={key}
                    onClick={() => clickAudio(key)}
                    className={`track  ${index === key && !pause ? 'current-audio' : ''} ${
                        index === key && pause ? 'play-now' : ''
                    }`}
                >
                    <img className="track-img object-cover hover:animate-[scaleImg_0.35s_forwards] " src={music.img} alt="Track cover" />
                    <div className="track-discr max-md:w-[150px]">
                        <span className="track-name w-[195px] max-md:w-[150px] truncate hover:text-clip">{music.name}</span>
                        <span className="track-author">{music.author}</span>
                    </div>
                    <span className="track-duration">
                        {index === key ? currentTime : music.duration}
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}
