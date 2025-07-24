import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
	const [allUsers, setAllUsers] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

	const getAllUsers = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
			if (response.data?.length > 0) {
				setAllUsers(response.data);
			}
		} catch (error) {
			console.error('Error fetching users', error);
		}
	};

	const toggleUserSelection = (userId) => {
		setTempSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((id) => id !== userId)
				: [...prev, userId]
		);
	};

	const handleAssign = () => {
		setSelectedUsers(tempSelectedUsers);
		setIsModalOpen(false);
	};

	const selectedUserAvatars = allUsers
		.filter((user) => selectedUsers.includes(user._id))
		.map((user) => user.profileImageUrl || "/default-avatar.png");

	useEffect(() => {
		getAllUsers();
	}, []);

	useEffect(() => {
		if (selectedUsers.length === 0) {
			setTempSelectedUsers([]);
		}
	}, [selectedUsers]);

	return (
		<div>
			{selectedUserAvatars.length === 0 ? (
				<button
					onClick={() => setIsModalOpen(true)}
					className="flex items-center gap-2 text-sm px-4 py-2 bg-[#458588] text-[#ebdbb2] rounded-lg hover:bg-[#689d6a] transition"
				>
					<LuUsers className="text-lg" /> Add Members
				</button>
			) : (
				<div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
					<AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
				</div>
			)}

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Select Users"
			>
				<div className="space-y-4 max-h-[400px] overflow-y-auto px-2">
					{allUsers.map((user) => (
						<div
							key={user._id}
							className="flex items-center justify-between border border-[#665c54] rounded-md px-4 py-2 hover:bg-[#504945] transition"
						>
							<div className="flex items-center gap-3">
								<img
									src={user.profileImageUrl || "/default-avatar.png"}
									alt={user.name}
									className="w-10 h-10 rounded-full object-cover border border-[#928374]"
								/>
								<div>
									<p className="font-medium text-[#ebdbb2]">{user.name}</p>
									<p className="text-sm text-[#a89984]">{user.email}</p>
								</div>
							</div>
							<input
								type="checkbox"
								checked={tempSelectedUsers.includes(user._id)}
								onChange={() => toggleUserSelection(user._id)}
								className="w-5 h-5 text-[#b8bb26] bg-[#3c3836] border-[#665c54] focus:ring-[#b8bb26]"
							/>
						</div>
					))}
				</div>

				<div className="flex justify-end mt-6 gap-4">
					<button
						onClick={() => setIsModalOpen(false)}
						className="px-4 py-2 bg-[#3c3836] text-[#ebdbb2] border border-[#7c6f64] rounded-md hover:bg-[#504945]"
					>
						Cancel
					</button>
					<button
						onClick={handleAssign}
						className="px-4 py-2 bg-[#689d6a] text-[#1d2021] font-semibold rounded-md hover:bg-[#8ec07c]"
					>
						Done
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default SelectUsers;
