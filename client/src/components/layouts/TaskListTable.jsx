import moment from "moment";
import React from "react";

const TaskListTable = ({ tableData }) => {
	const getStatusBadgeColor = (status) => {
		switch (status) {
			case "Completed":
				return "bg-[#689d6a] text-[#282828]";
			case "Pending":
				return "bg-[#b16286] text-[#282828]";
			case "In Progress":
				return "bg-[#458588] text-[#282828]";
			default:
				return "bg-[#a89984] text-[#282828]";
		}
	};

	const getPriorityBadgeColor = (priority) => {
		switch (priority) {
			case "High":
				return "bg-[#cc241d] text-[#fbf1c7]";
			case "Medium":
				return "bg-[#d79921] text-[#282828]";
			case "Low":
				return "bg-[#98971a] text-[#282828]";
			default:
				return "bg-[#a89984] text-[#282828]";
		}
	};

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-[#282828] shadow-md rounded-md text-[#ebdbb2]">
				<thead>
					<tr className="bg-[#3c3836] text-left text-sm font-semibold text-[#fabd2f]">
						<th className="px-6 py-3">Task</th>
						<th className="px-6 py-3">Status</th>
						<th className="px-6 py-3">Priority</th>
						<th className="px-6 py-3">Created On</th>
					</tr>
				</thead>

				<tbody className="text-sm">
					{tableData?.length > 0 ? (
						tableData.map((task) => (
							<tr key={task._id} className="border-t border-[#504945] hover:bg-[#3c3836] transition">
								<td className="px-6 py-4">{task.title}</td>
								<td className="px-6 py-4">
									<span
										className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeColor(
											task.status
										)}`}
									>
										{task.status}
									</span>
								</td>
								<td className="px-6 py-4">
									<span
										className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityBadgeColor(
											task.priority
										)}`}
									>
										{task.priority}
									</span>
								</td>
								<td className="px-6 py-4 text-[#d5c4a1]">
									{task.createdAt
										? moment(task.createdAt).format("Do MMM YYYY")
										: "N/A"}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td className="px-6 py-4 text-center text-[#a89984]" colSpan="4">
								No tasks found.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default TaskListTable;
