import React from 'react';

const DEFAULT_AVATAR =
	'https://ui-avatars.com/api/?name=User&background=random';

const UserCard = ({ userInfo }) => {
	return (
		<div className="bg-[#282828] rounded-xl shadow p-6 space-y-6 max-w-xl mx-auto border border-[#3c3836]">
			{/* User Info */}
			<div className="flex items-center gap-4">
				<img
					src={userInfo?.profileImageUrl || DEFAULT_AVATAR}
					alt={userInfo?.name}
					className="w-16 h-16 rounded-full object-cover border border-[#665c54]"
				/>
				<div>
					<p className="text-lg font-semibold text-[#ebdbb2]">{userInfo?.name}</p>
					<p className="text-sm text-[#a89984]">{userInfo?.email}</p>
				</div>
			</div>

			{/* Task Stats */}
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<StatCard
					label="Pending"
					count={userInfo?.pendingTasks || 0}
					status="Pending"
				/>
				<StatCard
					label="In Progress"
					count={userInfo?.inProgressTasks || 0}
					status="In Progress"
				/>
				<StatCard
					label="Completed"
					count={userInfo?.completedTasks || 0}
					status="Completed"
				/>
			</div>
		</div>
	);
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
	const getStatusTagColor = () => {
		switch (status) {
			case 'In Progress':
				return 'text-[#83a598]'; // soft blue
			case 'Completed':
				return 'text-[#b8bb26]'; // bright green
			default:
				return 'text-[#d3869b]'; // pink-violet
		}
	};

	return (
		<div className="border border-[#3c3836] rounded-md p-4 shadow-sm bg-[#3c3836]">
			<p className="text-sm text-[#a89984]">{label}</p>
			<p className="text-2xl font-bold text-[#ebdbb2]">{count}</p>
			<p className={`mt-1 text-xs font-medium ${getStatusTagColor()}`}>{status}</p>
		</div>
	);
};
