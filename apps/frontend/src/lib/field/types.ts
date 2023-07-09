export const FIELD_SELECT_ITEMS = [
	{ value: 'string', name: 'String', group: 'Base' },
	{ value: 'email', name: 'Email', group: 'Base' },
	{ value: 'url', name: 'Url', group: 'Base' },
	{ value: 'attachment', name: 'Attachment', group: 'Base' },
	{ value: 'color', name: 'Color', group: 'Base' },
	{ value: 'bool', name: 'Bool', group: 'Base' },
	{ value: 'number', name: 'Number', group: 'Base' },
	{ value: 'rating', name: 'Rating', group: 'Base' },
	{ value: 'currency', name: 'Currency', group: 'Base' },
	{ value: 'date', name: 'Date', group: 'Base' },
	{ value: 'date-range', name: 'DateRange', group: 'Base' },
	{ value: 'json', name: 'Json', group: 'Base' },
	{ value: 'auto-increment', name: 'AutoIncrement', group: 'System' },
	{ value: 'collaborator', name: 'Collaborator', group: 'System' },
	{ value: 'select', name: 'Select', group: 'Base' },
	{ value: 'multi-select', name: 'MultiSelect', group: 'Base' },
	{ value: 'reference', name: 'Reference', group: 'Reference' },
	{ value: 'tree', name: 'Tree', group: 'Reference' },
	{ value: 'lookup', name: 'Lookup', group: 'Lookup' },
	{ value: 'count', name: 'Count', group: 'Lookup' },
	{ value: 'sum', name: 'Sum', group: 'Lookup' },
	{ value: 'average', name: 'Average', group: 'Lookup' },
	{ value: 'min', name: 'Min', group: 'Lookup' },
] as const
