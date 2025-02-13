// import { useState } from 'react';
// import reactLogo from './assets/react.svg'
import coinImage from './assets/coins-money-svgrepo-com.svg';
import gameImage from './assets/joystick-game-controller-svgrepo-com.svg';
import equalsImage from './assets/equal-sign-svgrepo-com.svg';

function App() {
	// const [count, setCount] = useState(0);

	return (
		<>
			{/* <div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img
						src={reactLogo}
						className='logo react'
						alt='React logo'
					/>
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className='card'>
				<button onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p> */}

			<div class='container text-center mt-4'>
				{/* <div className='row'>
					<div className='col'>
						<img
							src={coinImage}
							className='balance-icon'
							alt='balance icon'
						/>
					</div>
					<div className='col balance-amount'>50</div>
				</div> */}

				<div class='row g-4'>
					<div class='col-md-6 p-4'>
						<div className='row'>
							<div className='col'>
								{' '}
								<img
									src={coinImage}
									className='balance-icon icon'
									alt='balance icon'
								/>
								<p>40 coins</p>
							</div>
							<div className='col'>
								{' '}
								<img
									src={equalsImage}
									className='equals-icon icon '
									alt='equals icon'
								/>
							</div>
							<div className='col'>
								{' '}
								<img
									src={gameImage}
									className='game-icon icon'
									alt='game icon'
								/>
								<p>30 minutes game</p>
							</div>
						</div>
					</div>
					<div class='col-md-6 p-4'>Column 2</div>
				</div>
			</div>
		</>
	);
}

export default App;
