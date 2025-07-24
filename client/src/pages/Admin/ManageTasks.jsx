import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';

const ManageTasks = () => {
	const [allTasks, setAllTasks] = useState([]);
	const [tabs, setTabs] = useState([]);
	const [filterStatus, setFilterStatus] = useState("All");
	const navigate = useNavigate();

	const getAllTasks = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
				params: {
					status: filterStatus === "All" ? "" : filterStatus,
				},
			});

			setAllTasks(response.data?.tasks || []);

			const statusSummary = response.data?.statusSummary || {};

			const statusArray = [
				{ label: "All", count: statusSummary.all || 0 },
				{ label: "Pending", count: statusSummary.pendingTasks || 0 },
				{ label: "In Progress", count: statusSummary.inProgressTasks || 0 },
				{ label: "Completed", count: statusSummary.completedTasks || 0 },
			];

			setTabs(statusArray);
		} catch (error) {
			console.error("Error fetching tasks:", error);
		}
	};

	const handleClick = (taskData) => {
		navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
	};

	const handleDownloadReport = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
				responseType: "blob",
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute("download", "task_details.xls");
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.log("error in reports", error);
		}
	};

	useEffect(() => {
		getAllTasks();
	}, [filterStatus]);

	return (
		<DashboardLayout activeMenu="Manage Tasks">
			<div className="p-6 bg-[#282828] min-h-screen text-[#ebdbb2]">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-[#fabd2f]">Manage Tasks</h2>
					<button
						className="flex items-center gap-2 bg-[#98971a] text-[#282828] px-4 py-2 rounded hover:bg-[#b8bb26] transition"
						onClick={handleDownloadReport}
					>
						<LuFileSpreadsheet />
						Download Report
					</button>
				</div>

				{tabs.length > 0 && (
					<div className="mb-6">
						<TaskStatusTabs
							tabs={tabs}
							activeTab={filterStatus}
							setActiveTab={setFilterStatus}
						/>
					</div>
				)}

				<div className="grid gap-6">
					{allTasks.length === 0 ? (
						<p className="text-[#a89984]">No tasks found.</p>
					) : (
						allTasks.map((task) => (
							<TaskCard
								key={task._id}
								title={task.title}
								description={task.description}
								priority={task.priority}
								status={task.status}
								progress={task.progress}
								createdAt={task.createdAt}
								dueDate={task.dueDate}
								assignedTo={task.assignedTo?.map((user) => user.profileImageUrl)}
								attachmentCount={task.attachments?.length || 0}
								completedTodoCount={task.completedTodoCount || 0}
								todoCheckList={task.todoCheckList || []}
								onClick={() => handleClick(task)}
							/>
						))
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default ManageTasks;
