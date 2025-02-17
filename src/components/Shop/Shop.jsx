import React, { useState } from 'react';

function Shop({ coins }) {
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
							className='btn-success'
							onClick={() => handlePurchase(item.item_price)}
							disabled={coins < item.item_price}>
							{coins < item.item_price ? 'Trade' : 'Trade'}
						</button>
					</div>
				))}
			</div>
		</section>
	);
}

export default Shop;
