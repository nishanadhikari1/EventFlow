/* eslint-disable no-unused-vars */
import { Plus } from "lucide-react";
import { FIELD_TYPES } from "./constants";

export default function FieldPalette({ onAdd }) {
	return (
		<div className="w-1/4 p-6 bg-gray-50 border-r border-gray-200">
			<h2 className="text-xl font-bold mb-6 text-gray-800">Add Fields</h2>
			<div className="space-y-3">
				{FIELD_TYPES.map(({ type, label, icon: Icon }) => (
					<button
						key={type}
						onClick={() => onAdd(type)}
						className="flex justify-center items-center w-full bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-4 py-3 transition-all duration-200 group"
					>
						<Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 sm:mr-3" />
						<span className="text-gray-700 group-hover:text-blue-700 font-medium hidden md:block ">
							{label}
						</span>
						<Plus className="w-4 h-4 text-gray-400 group-hover:text-blue-500 ml-auto hidden sm:block " />
					</button>
				))}
			</div>
		</div>
	);
}
