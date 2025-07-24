import React from 'react';
import Progress from '../Progress';
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from 'react-icons/lu';
import moment from "moment";

const TaskCard = ({
	title,
	description,
	priority,
	status,
	progress,
	createdAt,
	dueDate,
	assignedTo,
	attachmentCount,
	completedTodoCount,
	todoCheckList,
	onClick,
}) => {
	const getStatusTagColor = () => {
		switch (status) {
			case "In Progress":
				return "text-[#83a598] bg-[#3c3836]";
			case "Completed":
				return "text-[#b8bb26] bg-[#3c3836]";
			default:
				return "text-[#d3869b] bg-[#3c3836]";
		}
	};

	const getPriorityTagColor = () => {
		switch (priority) {
			case "Low":
				return "text-[#8ec07c] bg-[#3c3836]";
			case "Medium":
				return "text-[#fabd2f] bg-[#3c3836]";
			default:
				return "text-[#fb4934] bg-[#3c3836]";
		}
	};

	return (
		<div
			onClick={onClick}
			className="bg-[#282828] rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md hover:bg-[#32302f] transition duration-200 space-y-4 border border-[#3c3836]"
		>
			{/* Top Tags */}
			<div className="flex justify-between">
				<span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusTagColor()}`}>
					{status}
				</span>
				<span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityTagColor()}`}>
					{priority} Priority
				</span>
			</div>

			{/* Title & Description */}
			<div>
				<h3 className="text-lg font-semibold text-[#ebdbb2]">{title}</h3>
				<p className="text-[#a89984] mt-1 text-sm">{description}</p>
			</div>

			{/* Checklist Info + Progress */}
			<div className="text-sm text-[#a89984]">
				<p className="mb-1">
					Task Done:{" "}
					<span className="font-semibold text-[#ebdbb2]">
						{completedTodoCount} / {todoCheckList.length || 0}
					</span>
				</p>
				<Progress progress={progress} status={status} />
			</div>

			{/* Dates & Footer */}
			<div className="flex justify-between items-center text-sm text-[#928374] mt-2">
				<div>
					<p>
						<label className="font-medium text-[#d5c4a1]">Start:</label>{" "}
						{moment(createdAt).format("Do MMM YYYY")}
					</p>
					<p>
						<label className="font-medium text-[#d5c4a1]">Due:</label>{" "}
						{moment(dueDate).format("Do MMM YYYY")}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<AvatarGroup avatars={assignedTo || []} />

					{attachmentCount > 0 && (
						<div className="flex items-center gap-1 text-[#a89984]">
							<LuPaperclip />
							<span>{attachmentCount}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskCard;
