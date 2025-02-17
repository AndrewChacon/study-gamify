import React, { useState, useEffect } from 'react';
import './Timer.css';
import PlayIcon from '../../assets/icons/play-svgrepo-com.svg';
import PauseIcon from '../../assets/icons/pauze-svgrepo-com.svg';
import RestartIcon from '../../assets/icons/refresh-svgrepo-com.svg';
import alarmSound from '../../assets/sounds/alarm_sound.wav';

const CircleTimer = ({ setCoins, setCompletedSessions }) => {
	const totalTime = 10; // Total timer duration in seconds
	const [time, setTime] = useState(totalTime);
	const [isRunning, setIsRunning] = useState(false);
	const alarm = new Audio(alarmSound);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')} ${secs
			.toString()
			.padStart(2, '0')}`;
	};

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime(prevTime => {
					if (prevTime <= 0) {
						setIsRunning(false);
						setTime(totalTime);
						setCoins(prevCoins => {
							const newCoins = prevCoins + 20;
							localStorage.setItem(
								'coins',
								JSON.stringify(newCoins)
							);
							return newCoins;
						});
						setCompletedSessions(prev => {
							const newSessions = prev + 1;
							localStorage.setItem(
								'completedSessions',
								JSON.stringify(newSessions)
							); // Save to local storage
							return newSessions;
						});
						alarm.play();
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		} else {
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	}, [isRunning]);

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
