import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ({ children, activeMenu }) => {
	const { user } = useContext(UserContext);

	return (
		<div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			{/* Top Navbar */}
			<Navbar activeMenu={activeMenu} />

			{user && (
				<div className="flex flex-1 overflow-hidden">
					{/* Sidebar */}
					<aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
						<SideMenu activeMenu={activeMenu} />
					</aside>

					{/* Main content */}
					<main className="flex-1 p-4 overflow-y-auto">
						{children}
					</main>
				</div>
			)}
		</div>
	);
};

export default DashboardLayout;
