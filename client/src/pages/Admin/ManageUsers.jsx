import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import { toast } from "react-hot-toast";

const ManageUsers = () => {
	const [allUsers, setAllUsers] = useState([]);

	const getAllUsers = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
			if (response.data?.length > 0) {
				setAllUsers(response.data);
			}
		} catch (error) {
			console.error("Error fetching all users", error);
		}
	};

	const handleDownloadReport = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
				responseType: "blob",
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute("download", "user_details.xls");
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.log("Error downloading report", error);
			toast.error("Failed to download the users report");
		}
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<DashboardLayout activeMenu="Team Members">
			<div className="max-w-6xl mx-auto px-4 py-6 bg-[#282828] min-h-screen text-[#ebdbb2]">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-[#fabd2f]">Team Members</h2>
					<button
						onClick={handleDownloadReport}
						className="flex items-center gap-2 bg-[#98971a] text-[#282828] px-4 py-2 rounded-md hover:bg-[#b8bb26] transition"
					>
						<LuFileSpreadsheet className="text-lg" />
						<span>Download Report</span>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{allUsers?.map((user) => (
						<UserCard key={user._id} userInfo={user} />
					))}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ManageUsers;
