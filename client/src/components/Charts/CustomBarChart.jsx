import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts';

// Gruvbox Colors
const GRUVBOX = {
	bg: '#282828',
	panel: '#3c3836',
	text: '#ebdbb2',
	textMuted: '#a89984',
	grid: '#504945',
	low: '#8ec07c',      // green
	medium: '#fabd2f',   // yellow
	high: '#fb4934',     // red
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
	if (active && payload && payload.length > 0) {
		const item = payload[0].payload;
		return (
			<div className="p-2 border rounded shadow text-sm" style={{
				backgroundColor: GRUVBOX.panel,
				color: GRUVBOX.text,
				borderColor: GRUVBOX.grid
			}}>
				<p className="font-medium">{item.status}</p>
				<p>Count: <strong>{item.count}</strong></p>
			</div>
		);
	}
	return null;
};

// Bar color by status
const getBarColor = (status) => {
	switch (status) {
		case 'Low':
			return GRUVBOX.low;
		case 'Medium':
			return GRUVBOX.medium;
		case 'High':
			return GRUVBOX.high;
		default:
			return GRUVBOX.textMuted;
	}
};

const CustomBarChart = ({ data }) => {
	return (
		<div className="w-full h-full bg-[#282828] p-4 rounded-xl">
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid stroke={GRUVBOX.grid} strokeDasharray="3 3" vertical={false} />

					<XAxis
						dataKey="status"
						tick={{ fontSize: 12, fill: GRUVBOX.textMuted }}
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						tick={{ fontSize: 12, fill: GRUVBOX.textMuted }}
						axisLine={false}
						tickLine={false}
					/>

					<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

					<Bar dataKey="count" radius={[8, 8, 0, 0]}>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={getBarColor(entry.status)} />
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomBarChart;
