// import React from 'react'

// const CustomLegend = ({payload}) => {
//   return (
//     <div>
//         {payload.map((entry, index) => {
//             <div key={`legend=${index}`}>
//                 <div>

//                 </div>
//                 <span>{entry.value}</span>
//             </div>
//         })}
//     </div>
//   )
// }

// export default CustomLegend



import React from 'react';

const GRUVBOX = {
	bg: '#282828',
	panel: '#3c3836',
	text: '#ebdbb2',
	muted: '#a89984',
	border: '#504945',
};

const CustomLegend = ({ payload }) => {
	if (!payload || !payload.length) return null;

	return (
		<div className="flex flex-wrap gap-4 p-2" style={{ backgroundColor: GRUVBOX.panel }}>
			{payload.map((entry, index) => (
				<div key={`legend-${index}`} className="flex items-center gap-2">
					<div
						className="w-4 h-4 rounded-sm"
						style={{ backgroundColor: entry.color }}
					></div>
					<span style={{ color: GRUVBOX.text, fontSize: '0.875rem' }}>
						{entry.value}
					</span>
				</div>
			))}
		</div>
	);
};

export default CustomLegend;
