import React from 'react';

const AvatarGroup = ({ avatars, maxVisible = 3 }) => {
	return (
		<div className="flex items-center space-x-[-10px]">
			{avatars.slice(0, maxVisible).map((avatar, index) => (
				<img
					key={index}
					src={avatar || "/default-avatar.png"}
					alt={`Avatar ${index}`}
					className="w-10 h-10 rounded-full border-2 border-[#282828] object-cover shadow"
				/>
			))}

			{avatars.length > maxVisible && (
				<div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3c3836] text-[#ebdbb2] text-sm font-medium border-2 border-[#282828] shadow">
					+{avatars.length - maxVisible}
				</div>
			)}
		</div>
	);
};

export default AvatarGroup;
