import { FIELD_TYPES, FIELD_ATTRIBUTES } from "./constants";
import { Type, Trash2 } from "lucide-react";

const FieldEditor = ({ fields, editIndex, updateField, deleteField }) => {

	const handleOptionAdd = () => {
			const updated = [...(field.options || []), "Option"];
			updateField("options", updated);
	};

	const handleOptionRemove = (index) => {
		const updated = [...field.options];
		updated.splice(index, 1);
		updateField("options", updated);
	};

	if (editIndex === null || !fields[editIndex]) {
		return (
			<div className="w-1/4 p-6 bg-gray-50 border-l border-gray-200">
				<h3 className="text-xl font-bold mb-6 text-gray-800">
					Field Properties
				</h3>
				<div className="text-center text-gray-500 mt-12">
					<div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
						<Type className="w-8 h-8 text-gray-400" />
					</div>
					<p className="text-lg font-medium mb-2">
						No field selected
					</p>
					<p className="text-sm">
						Click on a field to edit its properties
					</p>
				</div>
			</div>
		);
	}

	const field = fields[editIndex];

	const fieldType = FIELD_TYPES.find((f) => f.type === field.type);
	const Icon = fieldType ? fieldType.icon : Type;

	const attributes = FIELD_ATTRIBUTES[field.type] || {};

	return (
		<div className="w-1/4 p-6 bg-gray-50 border-l border-gray-200">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-bold text-gray-800">Properties</h3>
			</div>

			<div className="space-y-4">
				<div className="flex items-center p-3 bg-white rounded-lg border">
					<Icon className="w-5 h-5 text-gray-600 mr-3" />
					<span className="font-medium text-gray-800">
						{fieldType?.label || field.type}
					</span>
				</div>

				<div className="space-y-4">
					{Object.entries(attributes).map(([key, config]) => {
						const value =
							field[key] ||
							(config.type === "boolean" ? false : "");
						const label =
							config.label ||
							key.charAt(0).toUpperCase() + key.slice(1);

						if (
							config.type === "string" ||
							config.type === "number" ||
							config.type === "date"
						) {
							return (
								<div key={key}>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{label}
									</label>
									<input
										type={config.type}
										value={value}
										onChange={(e) =>
											updateField(key, e.target.value)
										}
										className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									/>
								</div>
							);
						}

						if (config.type === "boolean") {
							return (
								<div key={key} className="flex items-center">
									<input
										type="checkbox"
										checked={value}
										onChange={(e) =>
											updateField(key, e.target.checked)
										}
										className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
									/>
									<label className="ml-2 text-sm font-medium text-gray-700">
										{label}
									</label>
								</div>
							);
						}

						if (config.type === "options") {
							const options = Array.isArray(field.options)
								? field.options
								: [];
							return (
								<div key={key}>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										{config.label || key}
									</label>
									<ul className="space-y-2 mb-2">
										{options.map((opt, idx) => (
											<div
												key={idx}
												className="flex items-center justify-between bg-white p-2 py-1 border border-gray-300 rounded"
											>
												<input type="text" value={opt} onChange={(e) => {updateField("options", options.map((o, i) => i === idx ? e.target.value : o))}} className="w-full border-none outline-0 " minLength={1} placeholder={`Option ${idx + 1}`} />
												<button
													onClick={() =>
														handleOptionRemove(idx)
													}
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
										))}
									</ul>
									<button
										onClick={handleOptionAdd}
										className="px-3 py-1 text-sm bg-neutral-50 text-gray-600 rounded border border-gray-400"
									>
										+ Add Option
									</button>
								</div>
							);
						}

						return null;
					})}
				</div>
			</div>
			<button
				onClick={() => deleteField(editIndex)}
				className="p-2 mt-6 flex w-full text-center justify-center items-center text-lg gap-5 text-white bg-red-500 hover:bg-red-700 rounded-lg transition-colors duration-200"
				title="Delete field"
			>
				Delete
				<Trash2 className="w-5 h-5" />
			</button>
		</div>
	);
};

export default FieldEditor;
