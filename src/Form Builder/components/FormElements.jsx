import { ImageIcon } from "lucide-react";
function TextElement({ field }) {
	return (
		<textarea
			name={field.id}
			id={field.id}
			placeholder={field.placeholder || "Enter text..."}
			className={
				field.multiLine
					? "w-full border border-gray-300 rounded px-3 py-2 text-sm "
					: "w-full border-0 border-b-2 border-gray-300 px-3 py-2 text-sm resize-none !h-10"
			}
			rows={field.multiLine ? 3 : 1}
			disabled
		/>
	);
}

function DefaultElement({ field }) {
	return (
		<input
			type={field.type}
			name={field.id}
			id={field.id}
			placeholder={field.placeholder || "Enter number..."}
			className="w-full border-0 border-b-2 border-gray-300 px-3 py-2 text-sm"
			disabled
		/>
	);
}

function CheckBoxElement({ field }) {
	return (
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
	);
}

function RadioElement({ field }) {
	return (
		<div className="flex justify-center flex-col gap-1">
			{field.options &&
				field.options.length > 0 &&
				field.options.map((option, idx) => (
					<div key={idx} className="flex items-center mr-4">
						<input
							type="radio"
							className="mr-2 h-4 w-4"
							name={`radio-option-for-${field.id}`}
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
	);
}

function ImageElement({ field }) {
	return (
		<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
			<ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
			<span className="text-sm text-gray-500">{field.placeholder}</span>
		</div>
	);
}

export { TextElement, DefaultElement, CheckBoxElement, RadioElement, ImageElement };
