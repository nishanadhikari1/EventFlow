import {
	Type,
	Mail,
	Hash,
	CheckSquare,
	Circle,
	Calendar,
	ImageIcon,
} from "lucide-react";

const FIELD_TYPES = [
	{ type: "text", label: "Text", icon: Type },
	{ type: "email", label: "Email", icon: Mail },
	{ type: "number", label: "Number", icon: Hash },
	{ type: "checkbox", label: "Checkbox", icon: CheckSquare },
	{ type: "radio", label: "Radio", icon: Circle },
	{ type: "date", label: "Date", icon: Calendar },
	{ type: "image", label: "Image", icon: ImageIcon },
];

const FIELD_ATTRIBUTES = {
	text: {
		label: { type: "string" },
		placeholder: { type: "string" },
		minChars: { type: "number", label: "Minimum characters" },
		maxChars: { type: "number", label: "Maximum characters" },
		multiLine: { type: "boolean", label: "Multi line" },
		required: { type: "boolean", label: "Required" },
	},
    email: {
        label: { type: "string" },
        placeholder: { type: "string" },
        required: { type: "boolean", label: "Required" },
    },
    number:{
        label: { type: "string" },
        placeholder: { type: "string" },
        minValue: { type: "number", label: "Minimum value" },
        maxValue: { type: "number", label: "Maximum value" },
        required: { type: "boolean", label: "Required" },
    },
	date: {
		label: { type: "string" },
		minDate: { type: "date", label: "Minimum date" },
		maxDate: { type: "date", label: "Maximum date" },
		required: { type: "boolean", label: "Required" },
	},
	radio: {
		label: { type: "string" },
		options: { type: "options", label: "Options" },
		required: { type: "boolean" },
	},
	checkbox: {
		label: { type: "string" },
		options: { type: "options", label: "Options" },
		required: { type: "boolean" },
	},
    image:{
        label: { type: "string" },
    }
};

export { FIELD_TYPES, FIELD_ATTRIBUTES };