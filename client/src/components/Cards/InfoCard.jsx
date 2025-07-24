import React from 'react';

function InfoCard({ icon: Icon, label, value, color = 'bg-[#458588]' }) {
	return (
		<div className="p-4 rounded-xl shadow-sm bg-[#3c3836] border border-[#504945] hover:shadow-md transition">
			<div className="flex items-center gap-4">
				<div className={`p-3 rounded-full text-[#282828] ${color}`}>
					{Icon && <Icon size={24} />}
				</div>
				<div>
					<p className="text-sm text-[#a89984]">{label}</p>
					<p className="text-xl font-bold text-[#ebdbb2]">{value}</p>
				</div>
			</div>
		</div>
	);
}

export default InfoCard;
