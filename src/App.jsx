// import { useState } from 'react';
// import reactLogo from './assets/react.svg'
import React, { useState, useEffect } from 'react';

function App() {
	// items state and data
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
			item_price: 30,
			item_img: 'https://www.svgrepo.com/show/244697/coins-money.svg',
			cost_name: 'Min Episode',
			cost_price: 20,
			cost_img: 'https://www.svgrepo.com/show/477110/tv.svg',
		},
		{
			item_name: 'Coins',
			item_price: 75,
			item_img: 'https://www.svgrepo.com/show/244697/coins-money.svg',
			cost_name: 'Hour Gaming',
			cost_price: 1,
			cost_img:
				'https://www.svgrepo.com/show/288490/joystick-game-controller.svg',
		},
	]);
	// timer state
	const [time, setTime] = useState(1 * 60);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime(prevTime => {
					if (prevTime <= 1) {
						setIsRunning(false);
						setTime(1 * 60);
						setCoins(prevCoins => prevCoins + 20); // Reward 20 coins for each completed Pomodoro
						setCompletedSessions(prev => prev + 1);
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

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	// shop state
	const [coins, setCoins] = useState(0); // Starting coins
	const [completedSessions, setCompletedSessions] = useState(0);

	const handlePurchase = cost => {
		if (coins >= cost) {
			setCoins(prevCoins => prevCoins - cost);
		} else {
			alert('Not enough coins!');
		}
	};

	return (
		<>
			<h1 className='text-center'>Drew's Study Shop</h1>
			<div className='text-center'>
				<h3>Coin Balance: {coins} 🪙</h3>
				<p>Completed Pomodoro Sessions: {completedSessions} ✅</p>
			</div>

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
							setTime(1 * 60);
						}}>
						Reset
					</button>
				</div>
			</div>

			<div className='container text-center'>
				<div className='col p-4'>
					{items.map((item, index) => (
						<div key={index} className='row mb-3'>
							<div className='col'>
								<img
									className='icon'
									src={item.item_img}
									alt=''
								/>
								<p>{item.item_name}</p>
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
									{item.cost_price} {item.cost_name}
								</p>
								<button
									className='btn btn-success'
									onClick={() =>
										handlePurchase(item.cost_price)
									}
									disabled={coins < item.cost_price}>
									{coins < item.cost_price
										? 'Not Enough Coins'
										: 'Buy'}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
