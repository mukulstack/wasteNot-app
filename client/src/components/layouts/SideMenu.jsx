import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
	const { user, clearUser } = useContext(UserContext);
	const [sideMenuData, setSideMenuData] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			setSideMenuData(user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
		}
	}, [user]);

	const handleLogout = () => {
		localStorage.clear();
		clearUser();
		navigate('/login');
	};

	const handleClick = (route) => {
		if (route === 'logout') {
			handleLogout();
		} else {
			navigate(route);
		}
	};

	return (
		<aside className="p-4 space-y-4 bg-[#282828] min-h-screen w-full sm:w-64 border-r border-[#3c3836]">
			{/* Profile */}
			<div className="text-center">
				<img
					src={user?.profileImageUrl || '/default-avatar.png'}
					alt="User Profile"
					className="w-20 h-20 rounded-full mx-auto object-cover border border-[#504945]"
				/>

				{user?.role === 'admin' && (
					<div className="text-xs text-[#282828] bg-[#fabd2f] rounded-full px-2 mt-2 inline-block font-medium">
						Admin
					</div>
				)}

				<h5 className="text-lg font-semibold mt-2 text-[#ebdbb2]">{user?.name || 'Guest'}</h5>
				<p className="text-sm text-[#a89984]">{user?.email || 'No email available'}</p>
			</div>

			<hr className="border-[#3c3836]" />

			{/* Menu Items */}
			<nav className="flex flex-col space-y-2" role="navigation" aria-label="Sidebar Menu">
				{sideMenuData.map((item, index) => (
					<button
						key={`menu_${index}`}
						onClick={() => handleClick(item.path)}
						className={`flex items-center px-4 py-2 rounded-md text-left transition font-medium ${
							activeMenu === item.label
								? 'bg-[#d65d0e] text-[#282828]'
								: 'text-[#ebdbb2] hover:bg-[#3c3836] hover:text-[#fabd2f]'
						}`}
						aria-label={item.label}
					>
						<item.icon className="mr-2 text-xl" />
						<span>{item.label}</span>
					</button>
				))}
			</nav>
		</aside>
	);
};

export default SideMenu;
