import React, { useState, useEffect } from 'react';
import './Timer.css';
import PlayIcon from '../../assets/play-svgrepo-com.svg';
import PauseIcon from '../../assets/pauze-svgrepo-com.svg';
import RestartIcon from '../../assets/refresh-svgrepo-com.svg';

const CircleTimer = () => {
	const totalTime = 1500; // Total timer duration in seconds
	const [time, setTime] = useState(totalTime);
	const [isRunning, setIsRunning] = useState(false);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')} ${secs
			.toString()
			.padStart(2, '0')}`;
	};

	useEffect(() => {
		let timer;
		if (isRunning && time > 0) {
			timer = setInterval(() => {
				setTime(prevTime => prevTime - 1);
			}, 1000);
		} else if (time === 0) {
			setIsRunning(false);
		}

		return () => clearInterval(timer);
	}, [isRunning, time]);

	const resetTimer = () => {
		setIsRunning(false);
		setTime(totalTime);
	};

	const progress = (time / totalTime) * 565; // 314 is full circle circumference

	return (
		<div className='timer-container'>
			<div className='circle'>
				<svg width='200' height='200'>
					<circle
						cx='100'
						cy='100'
						r='90'
						stroke='#333'
						strokeWidth='10'
						fill='none'
					/>
					<circle
						cx='100'
						cy='100'
						r='90'
						stroke='var(--primary)'
						strokeWidth='10'
						fill='none'
						strokeDasharray='565' // 2 * π * 90
						strokeDashoffset={565 - progress}
						className='progress-ring'
					/>
				</svg>
				<span className='timer-text'>{formatTime(time)}</span>
			</div>
			<div className='buttons'>
				<button onClick={() => setIsRunning(!isRunning)}>
					{isRunning ? (
						<img className='icon' src={PauseIcon} alt='' />
					) : (
						<img className='icon' src={PlayIcon} alt='' />
					)}
				</button>
				<button onClick={resetTimer}>
					<img className='icon' src={RestartIcon} alt='' />
				</button>
			</div>
		</div>
	);
};

export default CircleTimer;
