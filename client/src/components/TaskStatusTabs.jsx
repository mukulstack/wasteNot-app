import React from 'react';

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
	return (
		<div className="flex gap-4 border-b border-[#3c3836]">
			{tabs.map((tab) => (
				<button
					key={tab.label}
					onClick={() => setActiveTab(tab.label)}
					className={`relative px-4 py-2 text-sm font-medium focus:outline-none transition-colors ${
						activeTab === tab.label
							? "text-[#fabd2f]" // Gruvbox yellow
							: "text-[#a89984] hover:text-[#ebdbb2]" // faded gray to light
					}`}
				>
					<div className="flex items-center gap-2">
						<span>{tab.label}</span>
						<span className="bg-[#504945] text-[#d5c4a1] text-xs rounded-full px-2 py-0.5">
							{tab.count}
						</span>
					</div>

					{/* Active underline */}
					{activeTab === tab.label && (
						<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fabd2f] rounded-full"></div>
					)}
				</button>
			))}
		</div>
	);
};

export default TaskStatusTabs;
