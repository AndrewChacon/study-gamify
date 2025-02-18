import React, { useState } from 'react';
import CircleTimer from './components/Timer/Timer';
import Header from './components/Header/header';
import Shop from './components/Shop/Shop';

function App() {
	const getStoredData = key => JSON.parse(localStorage.getItem(key)) || 0;
	const [coins, setCoins] = useState(getStoredData('coins') || 0);
	// const [coins, setCoins] = useState(100); // used for testing
	const [completedSessions, setCompletedSessions] = useState(
		getStoredData('completedSessions') || 0
	);

	return (
		<div className='content'>
			<Header coins={coins} completedSessions={completedSessions} />
			<CircleTimer
				setCoins={setCoins}
				setCompletedSessions={setCompletedSessions}
			/>
			<Shop coins={coins} setCoins={setCoins} />
		</div>
	);
}

export default App;
