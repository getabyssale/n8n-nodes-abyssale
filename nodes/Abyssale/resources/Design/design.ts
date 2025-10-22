import { INodeProperties } from 'n8n-workflow';

export const designProperties: INodeProperties[] = [
	// Design Selection
	{
		displayName: 'Design Name or ID',
		name: 'designId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDesigns',
		},
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		required: true,
		default: '',
		description: 'Select the design to use for generation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// Design single Format Selection
	{
		displayName: 'Design Format Name or ID',
		name: 'designFormat',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDesignFormats',
			loadOptionsDependsOn: ['designId'],
		},
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle'],
			},
		},
		required: true,
		default: '',
		description: 'Select the design format to use for generation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},

	// Design multi format selection
	{
		displayName: 'Design Formats Name or ID',
		name: 'designFormats',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getDesignFormats',
			loadOptionsDependsOn: ['designId'],
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		required: true,
		default: '',
		description: 'Select design formats to use for generation. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
	},
]

export const getDesignAndDesignFormat: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['design'],
			},
		},
		options: [
			{
				name: 'Get a Design',
				value: 'getDesign',
				description: 'Retrieves the details about a design you created on Abyssale',
				action: 'Get a design',
			},
			{
				name: 'Get a Design Format',
				value: 'getDesignFormat',
				description: 'Retrieves the details about a format added to a design you created on Abyssale',
				action: 'Get a design format',
			},
		],
		default: 'getDesign',
	},
	// For Get design and get Design format
	{
		displayName: 'Design ID',
		name: 'designId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['design'],
				operation: ['getDesign', 'getDesignFormat'],
			},
		},
		required: true,
	},
	// Only for get Design format
	{
		displayName: 'Design Format',
		name: 'designFormat',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['design'],
				operation: ['getDesignFormat'],
			},
		},
		required: true,
	},
]