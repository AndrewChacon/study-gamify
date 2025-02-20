import React, { useState } from 'react';
import './style.shop.css';
import ShopItem from '../ShopItem/component.shopitem';

function Shop({ coins, setCoins }) {
	const [items, setItems] = useState([
		{
			item_name: 'Coins',
			item_price: 10,
			item_img: '🪙',
			cost_name: 'Chapter',
			cost_price: 1,
			cost_img: '📖',
		},
		{
			item_name: 'Coins',
			item_price: 30,
			item_img: '🪙',
			cost_name: 'Episode',
			cost_price: 1,
			cost_img: '📺',
		},
		{
			item_name: 'Coins',
			item_price: 40,
			item_img: '🪙',
			cost_name: 'Min Gaming',
			cost_price: 30,
			cost_img: '🕹️',
		},
		{
			item_name: 'Coins',
			item_price: 70,
			item_img: '🪙',
			cost_name: 'Hour Gaming',
			cost_price: 1,
			cost_img: '🎮',
		},
	]);
	return (
		<section className='shop'>
			<p className='shop-title'>Shop</p>
			<div className='shop-items'>
				{items.map((item, index) => (
					<ShopItem
						key={index}
						item={item}
						coins={coins}
						setCoins={setCoins}
					/>
				))}
			</div>
		</section>
	);
}

export default Shop;
