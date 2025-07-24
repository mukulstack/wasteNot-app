import React from 'react';

const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length > 0) {
		const { name, value } = payload[0];
		return (
			<div
				className="p-2 rounded text-sm shadow"
				style={{
					backgroundColor: '#1d2021',  // Gruvbox bg
					border: '1px solid #3c3836', // Gruvbox border
					color: '#ebdbb2',            // Gruvbox fg
				}}
			>
				<p style={{ fontWeight: 'bold', color: '#fabd2f' }}>{name}</p>
				<p>
					Count: <span style={{ color: '#b8bb26' }}>{value}</span>
				</p>
			</div>
		);
	}
	return null;
};

export default CustomTooltip;
