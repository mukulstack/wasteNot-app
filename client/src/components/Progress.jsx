import React from 'react';

const Progress = ({ progress = 0, status }) => {
	const getColor = () => {
		switch (status) {
			case "In Progress":
				return "bg-[#689d6a]"; // Gruvbox green
			case "Completed":
				return "bg-[#458588]"; // Gruvbox blue
			default:
				return "bg-[#b16286]"; // Gruvbox purple
		}
	};

	return (
		<div className="w-full bg-[#3c3836] rounded-full h-2 overflow-hidden">
			<div
				className={`h-full ${getColor()} transition-all duration-300`}
				style={{ width: `${progress}%` }}
			></div>
		</div>
	);
};

export default Progress;
