import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Next, Previous } from './IconButtons';
import RangeSlider from './RangeSlider';
import TRACKS from '../data/tracks';

const MusicPlayer = () => {
	const [currentTrack, setCurrentTrack] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const audioRef = useRef(null);

	useEffect(() => {
		isPlaying ? audioRef.current.play() : audioRef.current.pause();
	}, [currentTrack, isPlaying]);

	const handlePlayPause = () => {
		setIsPlaying(!isPlaying);
	};

	const handleNext = () => {
		setCurrentTrack((currentTrack + 1) % TRACKS.length);
	};

	const handlePrev = () => {
		setCurrentTrack(
			currentTrack === 0 ? TRACKS.length - 1 : currentTrack - 1
		);
	};

	const handleSeek = (e) => {
		audioRef.current.currentTime = e.target.value;
		setCurrentTime(e.target.value);
	};

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60)
			.toString()
			.padStart(2, '0');
		const seconds = Math.floor(time % 60)
			.toString()
			.padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	const { title, artist, cover, src } = TRACKS[currentTrack];

	return (
		<div className='music-player-container'>
			<h1>My Own Vocals🎶❤️</h1>
			<div className='music-player-wrapper'>
				<div className='music-player-content'>
					<img src={cover} alt='cover-img' className='music-cover' />
					<div className='title-wrapper'>
						<h2 className='track-title'>{title}</h2>
					</div>
					<p className='track-artist'>{artist}</p>

					<div className='timeline'>
						<p>{formatTime(currentTime)}</p>
						<RangeSlider
							max={duration}
							value={currentTime}
							onChange={handleSeek}
						/>
						<p>{formatTime(duration)}</p>
					</div>

					<div className='controls'>
						<Previous onClick={handlePrev} />
						{isPlaying ? (
							<Pause onClick={handlePlayPause} />
						) : (
							<Play onClick={handlePlayPause} />
						)}

						<Next onClick={handleNext} />
					</div>

					<audio
						ref={audioRef}
						src={src}
						preload='metadata'
						onLoadedMetadata={(e) => setDuration(e.target.duration)}
						onTimeUpdate={(e) =>
							setCurrentTime(e.target.currentTime)
						}
					></audio>
				</div>
			</div>
		</div>
	);
};

export default MusicPlayer;
