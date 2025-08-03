const IconButton = ({ src, onClick }) => {
	return (
		<button onClick={onClick}>
			<img src={src} alt='icon-btn' width={24} height={24} />
		</button>
	);
};

const Play = ({ onClick }) => {
	return <IconButton src='./icons/play.svg' onClick={onClick} />;
};

const Pause = ({ onClick }) => {
	return <IconButton src='./icons/pause.svg' onClick={onClick} />;
};

const Next = ({ onClick }) => {
	return <IconButton src='./icons/next.svg' onClick={onClick} />;
};

const Previous = ({ onClick }) => {
	return <IconButton src='./icons/previous.svg' onClick={onClick} />;
};

export { Play, Pause, Next, Previous };
