import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { LuArrowRight } from 'react-icons/lu';

import { UserContext } from '../../context/userContext';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import InfoCard from '../../components/Cards/InfoCard';
import { addThousandSeperator } from '../../utils/helper';
import TaskListTable from '../../components/layouts/TaskListTable';
import CustomPieChart from '../../components/Charts/CustomPieChart';
import CustomBarChart from '../../components/Charts/CustomBarChart';

const COLORS = ["#cc241d", "#d79921", "#98971a"]; // Gruvbox pie chart colors

const Dashboard = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	useUserAuth();

	const [dashboardData, setDashboardData] = useState(null);
	const [pieChartData, setPieChartData] = useState([]);
	const [barChartData, setBarChartData] = useState([]);

	const prepareChartData = (charts) => {
		if (!charts) return;

		const taskDistributionData = [
			{ status: "Pending", count: charts?.taskDistribution?.Pending || 0 },
			{ status: "In Progress", count: charts?.taskDistribution?.InProgress || 0 },
			{ status: "Completed", count: charts?.taskDistribution?.Completed || 0 },
		];

		const taskPriorityLevels = [
			{ status: "Low", count: charts?.taskPriorityLevels?.Low || 0 },
			{ status: "Medium", count: charts?.taskPriorityLevels?.Medium || 0 },
			{ status: "High", count: charts?.taskPriorityLevels?.High || 0 },
		];

		setPieChartData(taskDistributionData);
		setBarChartData(taskPriorityLevels);
	};

	const getDashboardData = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
			if (response.data) {
				setDashboardData(response.data);
				prepareChartData(response.data?.charts);
			}
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
		}
	};

	const onSeeMore = () => {
		navigate('/admin/tasks');
	};

	useEffect(() => {
		getDashboardData();
	}, []);

	return (
		<DashboardLayout activeMenu="Dashboard">
			<div className="p-6 space-y-10 bg-[#282828] text-[#ebdbb2] min-h-screen">
				{/* Greeting Header */}
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-bold text-[#fabd2f]">Hello, {user?.name}</h2>
						<p className="text-[#a89984]">{moment().format('dddd, Do MMM YYYY')}</p>
					</div>
				</div>

				{/* Info Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<InfoCard
						label="Total Tasks"
						value={addThousandSeperator(dashboardData?.charts?.taskDistribution?.All || 0)}
						color="bg-[#458588]"
					/>
					<InfoCard
						label="Pending Tasks"
						value={addThousandSeperator(dashboardData?.charts?.taskDistribution?.Pending || 0)}
						color="bg-[#b16286]"
					/>
					<InfoCard
						label="In Progress Tasks"
						value={addThousandSeperator(dashboardData?.charts?.taskDistribution?.InProgress || 0)}
						color="bg-[#fe8019]"
					/>
					<InfoCard
						label="Completed Tasks"
						value={addThousandSeperator(dashboardData?.charts?.taskDistribution?.Completed || 0)}
						color="bg-[#689d6a]"
					/>
				</div>

				{/* Charts */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-[#3c3836] rounded-xl shadow-md p-6">
						<h5 className="text-lg font-semibold text-[#fbf1c7] mb-4">Task Distribution</h5>
						<CustomPieChart data={pieChartData} colors={COLORS} />
					</div>

					<div className="bg-[#3c3836] rounded-xl shadow-md p-6">
						<h5 className="text-lg font-semibold text-[#fbf1c7] mb-4">Task Priority Levels</h5>
						<CustomBarChart data={barChartData} />
					</div>
				</div>

				{/* Recent Tasks Table */}
				<div className="bg-[#3c3836] rounded-xl shadow-md p-6">
					<div className="flex justify-between items-center mb-4">
						<h5 className="text-lg font-semibold text-[#fbf1c7]">Recent Tasks</h5>
						<button
							onClick={onSeeMore}
							className="flex items-center gap-2 text-[#83a598] hover:underline font-medium"
						>
							See All <LuArrowRight />
						</button>
					</div>

					<TaskListTable tableData={dashboardData?.recentTasks || []} />
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
