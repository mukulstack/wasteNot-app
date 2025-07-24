import React, { useState, useEffect } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
	const [openSideMenu, setOpenSideMenu] = useState(false);

	useEffect(() => {
		document.body.style.overflow = openSideMenu ? 'hidden' : 'auto';
	}, [openSideMenu]);

	const handleBackdropClick = () => setOpenSideMenu(false);

	return (
		<>
			{/* Top Navbar */}
			<div className="flex items-center justify-between bg-[#282828] text-[#ebdbb2] px-4 py-3 shadow-md relative z-50">
				{/* Toggle button for mobile */}
				<button
					onClick={() => setOpenSideMenu(!openSideMenu)}
					className="text-2xl md:hidden focus:outline-none"
				>
					{openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
				</button>

				{/* App title */}
				<h2 className="text-xl font-semibold">Waste Not</h2>

				{/* Spacer */}
				<div className="w-6 md:hidden" />
			</div>

			{/* Mobile Side Menu Drawer */}
			{openSideMenu && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 bg-black bg-opacity-50 z-30"
						onClick={handleBackdropClick}
					/>

					{/* Drawer */}
					<div className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-[#3c3836] text-[#ebdbb2] shadow-lg z-40 overflow-y-auto transform transition-transform duration-300">
						<SideMenu activeMenu={activeMenu} />
					</div>
				</>
			)}
		</>
	);
};

export default Navbar;
