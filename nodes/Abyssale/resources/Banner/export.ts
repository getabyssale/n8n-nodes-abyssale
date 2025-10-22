import { INodeProperties } from 'n8n-workflow';

export const exportElements: INodeProperties[] = [
	{
		displayName: 'Banner IDs',
		name: 'bannerIds',
		placeholder: 'Add banner IDs',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		description: 'List of banner IDs',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['exportBanners'],
			},
		},
		options: [
			{
				name: 'values',
				displayName: 'Banner ID',
				values: [
					{
						displayName: 'Banner ID',
						name: 'bannerId',
						type: 'string',
						default: '',
						placeholder: 'Enter banner ID',
						required: true,
					},
				],
			},
		],
	},]