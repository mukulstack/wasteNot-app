import React, { useEffect, useState } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from '../../utils/data';
import { API_PATHS } from '../../utils/apiPaths';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from 'react-router-dom';
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from '../../components/inputs/SelectDropdown';
import SelectUsers from '../../components/inputs/SelectUsers';
import TodoListInput from '../../components/inputs/TodoListInput';
import AddAttachmentsInput from '../../components/inputs/AddAttachmentsInput';
import axiosInstance from '../../utils/axiosInstance';
import moment from "moment";
import DeleteAlert from '../../components/DeleteAlert';
import Modal from '../../components/Modal';

const CreateTask = () => {
	const location = useLocation();
	const { taskId } = location.state || {};
	const navigate = useNavigate();

	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		priority: "Low",
		dueDate: "",
		assignedTo: [],
		todoCheckList: [],
		attachments: [],
	});

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
	const [currentTask, setCurrentTask] = useState(null);

	const handleValueChange = (key, value) => {
		setTaskData((prevData) => ({ ...prevData, [key]: value }));
	};

	const clearData = () => {
		setTaskData({
			title: "",
			description: "",
			priority: "Low",
			dueDate: "",
			assignedTo: [],
			todoCheckList: [],
			attachments: [],
		});
	};


	 const createTask = async () => {
		setLoading(true);
		
		try {
			const todolist = taskData.todoCheckList?.map((item) => ({
				text: item,
				completed: false,
			}));

			const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
				...taskData,
				dueDate: new Date(taskData.dueDate).toISOString(),
				todoCheckList: todolist,
			});

			toast.success("Task Created Successfully");

			clearData();
		} catch (error) {
			console.error("Error creating Task", error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	 };

	const handleSubmit = async () => {
		setError(null);

		// input validation
		if (!taskData.title.trim()) {
			setError("Title is required");
			return;
		}

		if (!taskData.description.trim()) {
			setError("Description is required");
			return;
		}

		if (!taskData.dueDate) {
			setError("Due Date is required");
			return;
		}

		if (!taskData.assignedTo?.length) {
			setError("Task not assigned to any member");
			return;
		}

		if (!taskData.todoCheckList?.length) {
			setError("Add atleast one todo task");
			return;
		}

		if (taskId) {
			updateTask();
			return;
		}

		createTask();


	};


	// update task
	const updateTask = async () => {
		setLoading(true);
		
		try {
			const todolist = taskData.todoCheckList?.map((item) => {
				const prevTodoCheckList = currentTask?.todoCheckList || [];
				const matchedTask = prevTodoCheckList.find((task) => task.text == item);
				
				return {
					
					text: item,
					completed: matchedTask ? matchedTask.completed : false,
				};
			});

			const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
				...taskData,
				dueDate: new Date(taskData.dueDate).toISOString(),
				todoCheckList: todolist,
			});

			toast.success("Task Updated Successfully");

			clearData();
		} catch (error) {
			console.error("Error creating Task", error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};



	// get task by id
	const getTaskDetailsByID = async () => {
		try {
			const response = await axiosInstance.get(
				API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
			);

			if (response.data) {
				const taskInfo = response.data;
				
				setCurrentTask(taskInfo);
				setTaskData ((prevState) => ({
					title: taskInfo.title,
					description: taskInfo.description,
					priority: taskInfo.priority,
					dueDate: taskInfo.dueDate 
						? moment(taskInfo.dueDate).format("YYYY-MM-DD")
						: null,
						assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
					todoCheckList:
						taskInfo?.todoCheckList?.map((item) => item?.text) || [],
					attachments: taskInfo?.attachments || [],

				}))
			}

		} catch (error) {
			console.error("Error fetchin users", error);
		}
	};

	// delete task
	const deleteTask = async () => {
		try{
			await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

			setOpenDeleteAlert(false);
			toast.success("Task deleted successfully");
			navigate('/admin/tasks')
		} catch (error) {
			console.error("Error deleting task", error);
		}
	};


	// download task repost
	const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_TASKS, {
        responseType: "blob",
      });
  
      // create a url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setattribute("download", "task_details.xls");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("error in reports", error);
      toast.error("failed to download the tasks report");
    }
  };



	useEffect(() => {

		if (taskId) {
			getTaskDetailsByID(taskId);
		}

		return () => {

		}
	}, [taskId])



	return (
		<DashboardLayout activeMenu="Create Task">
			<div className="max-w-3xl mx-auto px-4 py-8 text-[#ebdbb2] bg-[#282828] min-h-screen">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-semibold text-[#fabd2f]">
						{taskId ? "Update Task" : "Create Task"}
					</h2>
					{taskId && (
						<button
							className="text-[#fb4934] flex items-center gap-2 hover:underline"
							onClick={() => setOpenDeleteAlert(true)}
						>
							<LuTrash2 /> Delete
						</button>
					)}
				</div>

				<div className="space-y-6">
					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-[#d5c4a1]">Task Title</label>
						<input
							type="text"
							className="mt-1 w-full bg-[#3c3836] text-[#ebdbb2] border border-[#504945] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#83a598]"
							placeholder="Create App UI"
							value={taskData.title}
							onChange={({ target }) => handleValueChange("title", target.value)}
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-[#d5c4a1]">Description</label>
						<textarea
							rows={4}
							className="mt-1 w-full bg-[#3c3836] text-[#ebdbb2] border border-[#504945] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#83a598]"
							placeholder="Describe Task"
							value={taskData.description}
							onChange={({ target }) => handleValueChange("description", target.value)}
						/>
					</div>

					{/* Priority and Due Date */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-[#d5c4a1]">Priority</label>
							<SelectDropdown
								options={PRIORITY_DATA}
								value={taskData.priority}
								onChange={(value) => handleValueChange("priority", value)}
								placeholder="Select Priority"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-[#d5c4a1]">Due Date</label>
							<input
								type="date"
								className="mt-1 w-full bg-[#3c3836] text-[#ebdbb2] border border-[#504945] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#83a598]"
								value={taskData.dueDate}
								onChange={({ target }) => handleValueChange("dueDate", target.value)}
							/>
						</div>
					</div>

					{/* Assigned Users */}
					<div>
						<label className="block text-sm font-medium text-[#d5c4a1]">Assign To</label>
						<SelectUsers
							selectedUsers={taskData.assignedTo}
							setSelectedUsers={(value) => handleValueChange("assignedTo", value)}
						/>
					</div>

					{/* Todo List */}
					<div>
						<label className="block text-sm font-medium text-[#d5c4a1]">Todo Checklist</label>
						<TodoListInput
							todoList={taskData.todoCheckList}
							setTodoList={(value) => handleValueChange("todoCheckList", value)}
						/>
					</div>

					{/* Attachments */}
					<div>
						<label className="block text-sm font-medium text-[#d5c4a1]">Attachments</label>
						<AddAttachmentsInput
							attachments={taskData.attachments}
							setAttachments={(value) => handleValueChange("attachments", value)}
						/>
					</div>

					{/* Error */}
					{error && <p className="text-[#fb4934]">{error}</p>}

					{/* Actions */}
					<div className="flex gap-4">
						<button
							className="bg-[#458588] text-white px-6 py-2 rounded-md hover:bg-[#689d6a] transition"
							onClick={handleSubmit}
							disabled={loading}
						>
							{taskId ? "Update Task" : "Create Task"}
						</button>
						<button
							className="bg-[#504945] text-[#ebdbb2] px-6 py-2 rounded-md hover:bg-[#665c54] transition"
							onClick={clearData}
						>
							Clear
						</button>
					</div>
				</div>
			</div>

			<Modal isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)} title="Delete Task">
				<DeleteAlert content="Are you sure you want to delete?" onDelete={deleteTask} />
			</Modal>
		</DashboardLayout>
	);
};

export default CreateTask;
