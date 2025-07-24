import React from "react";
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const GRUVBOX_COLORS = [
	"#cc241d", // red
	"#98971a", // green
	"#d79921", // yellow
	"#458588", // blue
	"#b16286", // purple
	"#689d6a", // aqua
	"#d65d0e", // orange
	"#928374", // gray
];

const CustomPieChart = ({ data = [], label = true, colors = GRUVBOX_COLORS }) => {
	if (!Array.isArray(data) || data.length === 0) {
		return (
			<div
				className="text-center text-sm py-8"
				style={{ color: "#a89984", backgroundColor: "#282828" }}
			>
				No data available for chart
			</div>
		);
	}

	return (
		<ResponsiveContainer width="100%" height={325}>
			<PieChart>
				<Pie
					data={data}
					dataKey="count"
					nameKey="status"
					cx="50%"
					cy="50%"
					outerRadius={130}
					innerRadius={100}
					labelLine={false}
					label={label}
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={colors[index % colors.length]}
						/>
					))}
				</Pie>

				<Tooltip content={<CustomTooltip />} />
				<Legend content={<CustomLegend />} />
			</PieChart>
		</ResponsiveContainer>
	);
};

export default CustomPieChart;
