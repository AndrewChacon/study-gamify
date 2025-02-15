import React, { useState, useEffect, useRef } from 'react';
import alarmSound from './assets/alarm_sound.wav';
import coinSound from './assets/coin_sound.wav';

function App() {
	const alarm = new Audio(alarmSound);
	const coin = new Audio(coinSound);
	const effectRun = useRef(false);
	const getStoredData = key => JSON.parse(localStorage.getItem(key)) || 0;
	const [items, setItems] = useState([
		{
			item_name: 'Coins',
			item_price: 30,
			item_img: '🪙',
			cost_name: 'Min',
			cost_price: 20,
			cost_img: '📺',
		},
		{
			item_name: 'Coins',
			item_price: 40,
			item_img: '🪙',
			cost_name: 'Min',
			cost_price: 30,
			cost_img: '🕹️',
		},
		{
			item_name: 'Coins',
			item_price: 75,
			item_img: '🪙',
			cost_name: 'Hour',
			cost_price: 1,
			cost_img: '🎮',
		},
	]);
	const [time, setTime] = useState(30 * 60);
	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (!effectRun.current) {
			effectRun.current = true;
			return;
		}

		let timer;
		if (isRunning) {
			timer = setInterval(() => {
				setTime(prevTime => {
					if (prevTime <= 1) {
						setIsRunning(false);
						setTime(30 * 60);
						setCoins(prevCoins => {
							const newCoins = prevCoins + 20;
							localStorage.setItem(
								'coins',
								JSON.stringify(newCoins)
							); // Save to local storage
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

	const formatTime = seconds => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${secs
			.toString()
			.padStart(2, '0')}`;
	};

	const [coins, setCoins] = useState(getStoredData('coins') || 50);
	const [completedSessions, setCompletedSessions] = useState(
		getStoredData('completedSessions') || 0
	);

	const handlePurchase = cost => {
		if (coins >= cost) {
			const newCoins = coins - cost;
			setCoins(newCoins);
			localStorage.setItem('coins', JSON.stringify(newCoins)); // Save to local storage
			coin.play();
		} else {
			alert('Not enough coins!');
		}
	};

	return (
		<div className='app-container'>
			<header>
				<h3>Zen Tokens: {coins} 🥟</h3>
				<p>Pomodoro Sessions: {completedSessions} ✅</p>
				<p>1 Session = 20 Tokens</p>
			</header>

			<section className='pomodoro-timer'>
				<h1>Pomodoro Timer ⏲️</h1>
				<div className='timer'>{formatTime(time)}</div>
				<div className='controls'>
					<button onClick={() => setIsRunning(!isRunning)}>
						{isRunning ? 'Pause' : 'Start'}
					</button>
					<button
						onClick={() => {
							setIsRunning(false);
							setTime(30 * 60);
						}}>
						Reset
					</button>
				</div>
			</section>

			<section className='shop'>
				<h2>Shop</h2>
				<div className='shop-items'>
					{items.map((item, index) => (
						<div key={index} className='shop-item'>
							<p className='mr'>
								{`${item.item_img} ${item.item_price} ${item.item_name}`}
							</p>
							{'='}
							<p className='mr ml'>
								{`${item.cost_img} ${item.cost_price} ${item.cost_name}`}
							</p>
							<button
								onClick={() => handlePurchase(item.item_price)}
								disabled={coins < item.item_price}>
								{coins < item.item_price ? 'Trade' : 'Trade'}
							</button>
						</div>
					))}
				</div>
			</section>

			{/* <div className='container text-center'>
				<div className='col p-4'>
					{items.map((item, index) => (
						<div key={index} className='row mb-3'>
							<div className='col'>
								<img
									className='icon'
									src={item.item_img}
									alt=''
								/>
								<p>
									{item.item_price} {item.item_name}
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
									{item.cost_price} {item.cost_name}
								</p>
							</div>
							<div className='col'>
								<button
									className='btn btn-success'
									onClick={() => {
										coin.play();
										handlePurchase(item.item_price);
									}}
									disabled={coins < item.item_price}>
									{coins < item.item_price
										? 'Not Enough Coins'
										: 'Buy'}
								</button>
							</div>
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default App;
