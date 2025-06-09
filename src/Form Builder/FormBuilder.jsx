import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Type, ImageIcon, GripVertical } from "lucide-react";
import FieldPalette from "./LeftSection";
import FieldEditor from "./RightSection";
import { FIELD_TYPES } from "./constants";

const SortableField = ({ field, index, onClick, isSelected }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: field.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const getFieldIcon = (type) => {
		const fieldType = FIELD_TYPES.find((f) => f.type === type);
		return fieldType ? fieldType.icon : Type;
	};

	const Icon = getFieldIcon(field.type);

	return (
		<div
			ref={setNodeRef}
			style={style}
			onClick={() => onClick(index)}
			className={`border-2 rounded-lg p-4 mb-3 bg-white hover:shadow-md select-none ${
				isSelected
					? "border-blue-500 shadow-lg"
					: "border-gray-200 hover:border-gray-300"
			}`}
		>
			<div className="flex items-center justify-between mb-2">
				<div className="flex items-center">
					<Icon className="w-4 h-4 text-gray-600 mr-2" />
					<label className="font-semibold text-gray-800">
						{field.label}
					</label>
					{field.required && (
						<span className="text-red-500 ml-1">*</span>
					)}
				</div>
				<div
					{...attributes}
					{...listeners}
					className="cursor-grab hover:cursor-grabbing"
				>
					<GripVertical className="w-4 h-4 text-gray-400" />
				</div>
			</div>

			{field.type === "text" ? (
				<textarea
					name={field.id}
					id={field.id}
					placeholder={field.placeholder || "Enter text..."}
					className={field.multiLine?"w-full border border-gray-300 rounded px-3 py-2 text-sm ":"w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none !h-10"}
					rows={field.multiLine?3:1}
					disabled
				/>
			) : field.type === "checkbox" ? (
				<div className="flex justify-center flex-col gap-1">
					{field.options &&
						field.options.length > 0 &&
						field.options.map((option, idx) => (
							<div key={idx} className="flex items-center mr-4">
								<input
									type="checkbox"
									className="mr-2 h-4 w-4"
									id={`checkbox-option-${idx}`}
									disabled
								/>
								<label
									className="text-sm text-gray-600"
									htmlFor={`checkbox-option-${idx}`}
								>
									{option}
								</label>
							</div>
						))}
				</div>
			) : field.type === "radio" ? (
				<div className="flex justify-center flex-col gap-1">
					{field.options &&
						field.options.length > 0 &&
						field.options.map((option, idx) => (
							<div key={idx} className="flex items-center mr-4">
								<input
									type="radio"
									className="mr-2 h-4 w-4"
									name={`radio-option-for-${index}`}
									value={option}
									disabled
								/>
								<label
									className="text-sm text-gray-600"
									htmlFor={`checkbox-option-${idx}`}
								>
									{option}
								</label>
							</div>
						))}
				</div>
			) : field.type === "image" ? (
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
					<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
					<span className="text-sm text-gray-500">
						Click to upload image
					</span>
				</div>
			) : (
				<input
					type={field.type}
					placeholder={field.placeholder || "Enter value..."}
					className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
					disabled
				/>
			)}
		</div>
	);
};

const FormCanvas = ({ fields, setFields, editIndex, setEditIndex, headers, setHeaders }) => {
	const handleDragEnd = (event) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const oldIndex = fields.findIndex((f) => f.id === active.id);
			const newIndex = fields.findIndex((f) => f.id === over.id);
			setFields(arrayMove(fields, oldIndex, newIndex));
		}
	};

	return (
		<div className="w-1/2 p-6 overflow-y-auto bg-gray-50">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-xl font-bold text-gray-800">
					Form Builder
				</h2>
				<span className="text-sm text-gray-500">
					{fields.length} fields
				</span>
			</div>
			<div>
				<div onClick={()=>setEditIndex(null)} className="mb-3">
					<div className="h-3 w-full bg-red-500 rounded-t-2xl"></div>
					<div className="p-5 rounded-b-2xl bg-white border border-gray-200 shadow-xs flex flex-col mb-3"> 
						<input className="text-3xl font-semibold mb-1.5 outline-0" value={headers.title} onChange={(e)=>setHeaders({...headers,title:e.target.value})}/>
						<input className=" text-lg font-semibold mb-3 outline-0" value={headers.subtitle} onChange={(e)=>setHeaders({...headers,subtitle:e.target.value})}/>
						<p contenteditable="true" spellCheck={false} className="text-gray-600 mb-3 outline-0" value={headers.description} onChange={(e)=>setHeaders({...headers,description:e.target.value})}>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt vero sequi aspernatur, expedita doloribus porro vitae qui similique quaerat, repellendus cumque autem mollitia quidem rem error a maiores. Nostrum id soluta omnis veniam harum quos quisquam ipsa mollitia quia doloribus corporis sed vero inventore quo, quis earum dolores nihil voluptatem.
						</p>
					</div>
				</div>
			</div>
			{fields.length === 0 ? (
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
					<div className="text-gray-400 mb-2">
						<Type className="w-12 h-12 mx-auto mb-4" />
						<p className="text-lg font-medium">No fields yet</p>
						<p className="text-sm">
							Add fields from the left panel to get started
						</p>
					</div>
				</div>
			) : (
				<DndContext
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={fields.map((f) => f.id)}
						strategy={verticalListSortingStrategy}
					>
						{fields.map((field, index) => (
							<SortableField
								key={field.id}
								field={field}
								index={index}
								onClick={setEditIndex}
								isSelected={editIndex === index}
							/>
						))}
					</SortableContext>
				</DndContext>
			)}
		</div>
	);
};

export default function FormBuilder() {
	const [fields, setFields] = useState([]);
	const [headers, setHeaders] = useState({ title: "Form Title", subtitle: "Form Subtitle", description: "Form Description" });
	const [editIndex, setEditIndex] = useState(null);
	console.log(fields);
	const addField = (type) => {
		const newField = {
			id: crypto.randomUUID(),
			type,
			label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
			placeholder: "",
			required: false,
		};

		setFields((prev) => [...prev, newField]);
		setEditIndex(fields.length); // Select the newly added field
	};

	const updateField = (key, value) => {
		setFields((prev) => {
			const updated = [...prev];
			updated[editIndex][key] = value;
			return updated;
		});
	};

	const deleteField = (index) => {
		setFields((prev) => prev.filter((_, i) => i !== index));
		setEditIndex(null);
	};

	return (
		<div className="flex h-screen bg-white overflow-y-hidden">
			<FieldPalette onAdd={addField} />
			<FormCanvas
				fields={fields}
				setFields={setFields}
				editIndex={editIndex}
				setEditIndex={setEditIndex}
				headers={headers}
				setHeaders={setHeaders}
			/>
			<FieldEditor
				fields={fields}
				editIndex={editIndex}
				updateField={updateField}
				deleteField={deleteField}
			/>
		</div>
	);
}
