import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from 'moment';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import AvatarGroup from '../../components/AvatarGroup';

const ViewTaskDetails = () => {
	const { id } = useParams();
	const [task, setTask] = useState(null);

	const getStatusTagColor = (status) => {
		switch (status) {
			case "In Progress":
				return "text-cyan-400";
			case "Completed":
				return "text-lime-400";
			default:
				return "text-purple-300";
		}
	};

	const getTaskDetailsById = async () => {
		try {
			const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));
			if (response.data) {
				setTask(response.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateTodoCheckList = async (index) => {
		const todoCheckList = [...task?.todoCheckList];
		const taskId = id;

		if (todoCheckList && todoCheckList[index]) {
			todoCheckList[index].completed = !todoCheckList[index].completed;
		}

		try {
			const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId), {
				todoCheckList
			});

			if (response.status === 200) {
				setTask(response.data?.task || task);
			} else {
				todoCheckList[index].completed = !todoCheckList[index].completed;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleLinkClick = (link) => {
		window.open(link, "_blank");
	};

	useEffect(() => {
		if (id) getTaskDetailsById();
	}, [id]);

	return (
		<DashboardLayout activeMenu="My Tasks">
			<div className="max-w-4xl mx-auto px-4 py-6 bg-[#282828] text-[#ebdbb2] min-h-screen">
				{task && (
					<div className="space-y-6 bg-[#3c3836] p-6 rounded-xl shadow-md">
						{/* Header */}
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold text-[#fabd2f]">{task.title}</h2>
							<span className={`font-semibold ${getStatusTagColor(task.status)}`}>
								{task.status}
							</span>
						</div>

						{/* Description */}
						<InfoBox label="Description" value={task.description} />

						{/* Priority, Due Date, Assigned */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<InfoBox label="Priority" value={task.priority} />
							<InfoBox
								label="Due Date"
								value={
									task.dueDate
										? moment(task.dueDate).format("Do MMM YYYY")
										: "N/A"
								}
							/>
							<div>
								<label className="text-sm font-medium text-[#bdae93]">Assigned To</label>
								<AvatarGroup
									avatars={task?.assignedTo?.map((u) => u?.profileImageUrl) || []}
									maxVisible={5}
								/>
							</div>
						</div>

						{/* Checklist */}
						<div>
							<label className="text-sm font-medium text-[#bdae93]">Todo Checklist</label>
							<div className="space-y-2 mt-2">
								{task?.todoCheckList?.map((item, index) => (
									<TodoCheckList
										key={`todo_${index}`}
										text={item.text}
										isChecked={item?.completed}
										onChange={() => updateTodoCheckList(index)}
									/>
								))}
							</div>
						</div>

						{/* Attachments */}
						{task?.attachments?.length > 0 && (
							<div>
								<label className="text-sm font-medium text-[#bdae93]">Attachments</label>
								<div className="space-y-2 mt-2">
									{task.attachments.map((link, index) => (
										<Attachment
											key={`link_${index}`}
											link={link}
											index={index}
											onClick={() => handleLinkClick(link)}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</DashboardLayout>
	);
};

export default ViewTaskDetails;

const InfoBox = ({ label, value }) => (
	<div>
		<label className="text-sm font-medium text-[#bdae93]">{label}</label>
		<p className="text-[#ebdbb2]">{value}</p>
	</div>
);

const TodoCheckList = ({ text, isChecked, onChange }) => (
	<div className="flex items-center gap-2">
		<input
			type="checkbox"
			checked={isChecked}
			onChange={onChange}
			className="accent-yellow-500"
		/>
		<p className={isChecked ? "line-through text-[#928374]" : ""}>{text}</p>
	</div>
);

const Attachment = ({ link, index, onClick }) => (
	<div
		onClick={onClick}
		className="flex items-center gap-3 cursor-pointer hover:underline"
	>
		<div className="flex items-center gap-2">
			<span className="font-semibold text-sm text-[#d79921]">
				{index < 9 ? `0${index + 1}` : index + 1}.
			</span>
			<p className="text-blue-400 text-sm">{link}</p>
		</div>
		<LuSquareArrowOutUpRight className="text-[#a89984]" />
	</div>
);
