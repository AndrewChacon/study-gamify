import React, { useState, useEffect } from 'react';
import PlayIcon from '../../assets/icons/play-svgrepo-com.svg';
import PauseIcon from '../../assets/icons/pauze-svgrepo-com.svg';
import RestartIcon from '../../assets/icons/refresh-svgrepo-com.svg';
import alarmSound from '../../assets/sounds/alarm_sound.wav';
import './style.timer.css';

const CircleTimer = ({ setCoins, setCompletedSessions }) => {
	const totalTime = 180;
	const [time, setTime] = useState(totalTime);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const [expectedEndTime, setExpectedEndTime] = useState(null);
	const alarm = new Audio(alarmSound);

	useEffect(() => {
		let timer;

		if (isRunning) {
			const now = Date.now();
			if (!startTime) {
				setStartTime(now);
				setExpectedEndTime(now + time * 1000);
			}

			timer = setTimeout(function updateTimer() {
				const remainingTime = Math.max(
					0,
					Math.round((expectedEndTime - Date.now()) / 1000)
				);
				setTime(remainingTime);

				if (remainingTime > 0) {
					timer = setTimeout(updateTimer, 1000);
				} else {
					// Timer completed
					setIsRunning(false);
					setTime(totalTime);
					setStartTime(null);
					setExpectedEndTime(null);

					setCoins(prevCoins => {
						const newCoins = prevCoins + 20;
						localStorage.setItem('coins', JSON.stringify(newCoins));
						return newCoins;
					});

					setCompletedSessions(prev => {
						const newSessions = prev + 1;
						localStorage.setItem(
							'completedSessions',
							JSON.stringify(newSessions)
						);
						return newSessions;
					});

					alarm.play();
				}
			}, 1000);
		}

		return () => clearTimeout(timer);
	}, [isRunning]);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')} ${secs
			.toString()
			.padStart(2, '0')}`;
	};

	const toggleTimer = () => {
		if (isRunning) {
			// Pause: Stop and calculate remaining time
			setTime(
				Math.max(0, Math.round((expectedEndTime - Date.now()) / 1000))
			);
			setStartTime(null);
			setExpectedEndTime(null);
		} else {
			// Resume: Recalculate expected end time
			const now = Date.now();
			setStartTime(now);
			setExpectedEndTime(now + time * 1000);
		}
		setIsRunning(!isRunning);
	};

	const resetTimer = () => {
		setIsRunning(false);
		setTime(totalTime);
		setStartTime(null);
		setExpectedEndTime(null);
	};

	const progress = (time / totalTime) * 565;

	return (
		<div className='timer-container'>
			<div className='circle'>
				<svg width='300' height='300'>
					<circle
						cx='150'
						cy='150'
						r='140'
						stroke='#333'
						strokeWidth='12'
						fill='none'
					/>
					<circle
						cx='150'
						cy='150'
						r='140'
						stroke='var(--primary)'
						strokeWidth='12'
						fill='none'
						strokeDasharray='880'
						strokeDashoffset={880 - (time / totalTime) * 880}
						className='progress-ring'
					/>
				</svg>
				<span className='timer-text'>{formatTime(time)}</span>
			</div>
			<div className='controls-container'>
				<button className='controls-button' onClick={toggleTimer}>
					{isRunning ? (
						<img className='icon' src={PauseIcon} alt='' />
					) : (
						<img className='icon' src={PlayIcon} alt='' />
					)}
				</button>
				<button className='controls-button' onClick={resetTimer}>
					<img className='icon' src={RestartIcon} alt='' />
				</button>
			</div>
		</div>
	);
};

export default CircleTimer;
