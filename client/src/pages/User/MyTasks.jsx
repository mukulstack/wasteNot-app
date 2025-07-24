import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';

const MyTasks = () => {
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

	const handleClick = (taskId) => {
		navigate(`/user/task-details/${taskId}`);
	};

	useEffect(() => {
		getAllTasks();
	}, [filterStatus]);

	return (
		<DashboardLayout activeMenu="Manage Tasks">
			<div className="p-6 min-h-screen bg-[#282828] text-[#ebdbb2]">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-[#fabd2f]">My Tasks</h2>
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
								onClick={() => handleClick(task._id)}
							/>
						))
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default MyTasks;
