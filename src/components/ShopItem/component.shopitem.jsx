import './style.shopitem.css';
import coinSound from '../../assets/sounds/coin_sound.wav';

function ShopItem({ item, coins, setCoins }) {
	const coin = new Audio(coinSound);
	const handlePurchase = cost => {
		if (coins >= cost) {
			const newCoins = coins - cost;
			setCoins(newCoins);
			localStorage.setItem('coins', JSON.stringify(newCoins));
			coin.play();
		} else {
			alert('Not enough coins!');
		}
	};
	return (
		<div className='shop-card'>
			<p className='shop-spacer'></p>
			<div className='item-info'>
				<h3 className='item-name'>
					{item.cost_price} {item.cost_name}
				</h3>
				<p className='item-price'>
					{item.item_price} 🪙 | {item.cost_price} {item.cost_img}
				</p>
			</div>
			<button
				className='shop-button'
				onClick={() => handlePurchase(item.item_price)}
				disabled={coins < item.item_price}>
				{coins < item.item_price ? 'Buy' : 'Buy'}
			</button>
		</div>
	);
}

export default ShopItem;
