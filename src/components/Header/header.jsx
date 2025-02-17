const Header = ({ coins, completedSessions }) => {
	return (
		<header>
			<p>🪙: {coins}</p>
			<p>⏲️: {completedSessions} ✅</p>
		</header>
	);
};

export default Header;
