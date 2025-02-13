// import { useState } from 'react';
// import reactLogo from './assets/react.svg'
import React, { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([
		{
			item_name: 'Pomodoro Timer',
			item_price: 1,
			item_img: 'https://www.svgrepo.com/show/236616/timer-stopwatch.svg',
			cost_name: 'Coins',
			cost_price: 20,
			cost_img: 'https://www.svgrepo.com/show/244697/coins-money.svg',
		},
		{
			item_name: 'Coins',
			item_price: 40,
			item_img: 'https://www.svgrepo.com/show/244697/coins-money.svg',
			cost_name: 'Min Episode',
			cost_price: 20,
			cost_img: 'https://www.svgrepo.com/show/477110/tv.svg',
		},
		{
			item_name: 'Coins',
			item_price: 60,
			item_img: 'https://www.svgrepo.com/show/244697/coins-money.svg',
			cost_name: 'Hour Gaming',
			cost_price: 1,
			cost_img:
				'https://www.svgrepo.com/show/288490/joystick-game-controller.svg',
		},
	]);

	const [time, setTime] = useState(30 * 60);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
			}, 1000);
		} else {
			clearInterval(timer);
		}
		return () => clearInterval(timer);
	}, [isRunning]);

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	return (
		<>
			<h1 className='text-center'>Drew's Study Shop</h1>

			<div className='container pomodoro text-center'>
				<h1>Pomodoro Timer</h1>
				<div className='timer'>{formatTime(time)}</div>
				<div className='controls'>
					<button
						className='btn btn-primary'
						onClick={() => setIsRunning(!isRunning)}>
						{isRunning ? 'Pause' : 'Start'}
					</button>
					<button
						className='btn btn-danger'
						onClick={() => {
							setIsRunning(false);
							setTime(30 * 60);
						}}>
						Reset
					</button>
				</div>
			</div>

			<div className='container text-center mt-4'>
				<div className='row'>
					<div className='col p-4'>
						{items.map(item => (
							<div className='row'>
								<div className='col'>
									<img
										className='icon'
										src={item.item_img}
										alt=''
									/>
									<p>
										{item.item_price + ' ' + item.item_name}
									</p>
								</div>
								<div className='col'>
									<img
										className='icon'
										src={
											'https://www.svgrepo.com/show/535367/equals.svg'
										}
										alt=''
									/>
								</div>
								<div className='col'>
									<img
										className='icon'
										src={item.cost_img}
										alt=''
									/>
									<p>
										{item.cost_price + ' ' + item.cost_name}
									</p>
								</div>
							</div>
						))}
					</div>
					{/* <div className='col p-4'>Column 2</div> */}
				</div>
			</div>
		</>
	);
}

export default App;
