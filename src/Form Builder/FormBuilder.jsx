import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Type, GripVertical } from "lucide-react";
import FieldPalette from "./LeftSection";
import FieldEditor from "./RightSection";
import { FIELD_TYPES } from "./constants";
import {
	CheckBoxElement,
	RadioElement,
	TextElement,
	DefaultElement,
	ImageElement,
} from "./components/FormElements";

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
				<TextElement field={field} />
			) : field.type === "checkbox" ? (
				<CheckBoxElement field={field} />
			) : field.type === "radio" ? (
				<RadioElement field={field} />
			) : field.type === "image" ? (
				<ImageElement field={field} />
			) : (
				<DefaultElement field={field} />
			)}
		</div>
	);
};

const FormCanvas = ({
	fields,
	setFields,
	editIndex,
	setEditIndex,
	headers,
	setHeaders,
}) => {
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
				<div onClick={() => setEditIndex(null)} className="mb-3">
					<div className="h-3 w-full bg-red-500 rounded-t-2xl"></div>
					<div className="p-5 rounded-b-2xl bg-white border border-gray-200 shadow-xs flex flex-col mb-3">
						<input
							className="text-3xl font-semibold mb-1.5 outline-0"
							value={headers.title}
							onChange={(e) =>
								setHeaders({
									...headers,
									title: e.target.value,
								})
							}
						/>
						<input
							className=" text-lg font-semibold mb-3 outline-0"
							value={headers.subtitle}
							onChange={(e) =>
								setHeaders({
									...headers,
									subtitle: e.target.value,
								})
							}
						/>
						<p
							ref={function(e){if(e != null) e.contentEditable=true;}}
							spellCheck={false}
							className="text-gray-600 mb-3 outline-0"
							onInput={(e) =>
								setHeaders({
									...headers,
									description: e.target.innerText.trim(),
								})
							}
						>
							{headers.description}
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
	const [headers, setHeaders] = useState({
		title: "Form Title",
		subtitle: "Form Subtitle",
		description: "Form Description",
	});
	const [editIndex, setEditIndex] = useState(null);

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
