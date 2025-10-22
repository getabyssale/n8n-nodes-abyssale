import { INodeProperties } from 'n8n-workflow';

export const sharedProperties: INodeProperties[] = [
	// Simplify
	{
		displayName: 'Simplify',
		name: 'simplify',
		description: 'Whether to return a simplified version of the response instead of the raw data',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['design', 'banner'],
				operation: ['getDesign', 'getDesignFormat', "getBanner", "generateSingle"],
			},
		},
	}
]