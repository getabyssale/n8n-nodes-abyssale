import { INodeProperties } from 'n8n-workflow';

export const genericElements: INodeProperties[] = [
	// Output File Type
	{
		displayName: 'Output File Type',
		name: 'imageFileType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages'],
			},
		},
		options: [
			{
				name: 'Auto',
				value: 'auto',
				description: 'Automatically select JPEG or PNG based on transparency',
			},
			{
				name: 'AVIF',
				value: 'avif',
			},
			{
				name: 'JPEG',
				value: 'jpeg',
			},
			{
				name: 'PDF',
				value: 'pdf',
			},
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'WEBP',
				value: 'webp',
			},
		],
		default: 'auto',
		description: 'Choose the output file format',
	},
	{
		displayName: 'Webhook Url',
		name: 'webhookUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs', 'exportBanners'],
			},
		},
		required: true,
	},
	// Root element
	{
		displayName: 'Root: background_color',
		name: 'root',
		type: 'color',
		default: '',
		description: 'Use a 6 or 8-digit hexadecimal color (e.g., #EAEAEA) or a CMYK color (e.g., cmyk(0,10,0,50)) for the banner, if the design allows',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
	},
	// Text elements
	{
		displayName: 'Text Elements',
		name: 'textElements',
		placeholder: 'Modify a text element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		description: 'Text elements to modify',
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Text Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByText',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The text element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Text Content',
						name: 'payload',
						type: 'string',
						default: '',
						description: 'Text content (i.e. Lorem ipsum).',
					},
					{
						displayName: 'Text color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Use a 6 or 8-digit hexadecimal color (e.g., #EAEAEA) or a CMYK color (e.g., cmyk(0,10,0,50)) for the text, if the design allows',
					},
				],
			},
		],
	},
	// Image elements
	{
		displayName: 'Image Elements to Modify',
		name: 'imageElements',
		placeholder: 'Modify an image element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Image Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByImage',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The image element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Image URL',
						name: 'image_url',
						type: 'string',
						default: '',
						description: 'Public HTTP(s) URL of the image (i.e. https://example.com/image.png).',
						validateType: 'url',
					},
				],
			},
		],
	},
	// Button elements
	{
		displayName: 'Button Elements to Modify',
		name: 'buttonElements',
		placeholder: 'Modify an button element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Button Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByButton',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The button element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Text Content',
						name: 'payload',
						type: 'string',
						default: '',
						description: 'Text content (i.e. Click here).',
					},
					{
						displayName: 'Text color',
						name: 'color',
						type: 'color',
						default: '',
						description: 'Use a 6 or 8-digit hexadecimal color (e.g., #EAEAEA) or a CMYK color (e.g., cmyk(0,10,0,50)) for the text, if the design allows',
					},
					{
						displayName: 'Button background color',
						name: 'background_color',
						type: 'color',
						default: '',
						description: 'Use a 6 or 8-digit hexadecimal color (e.g., #EAEAEA) or a CMYK color (e.g., cmyk(0,10,0,50)) for the button background, if the design allows',
					},
				],
			},
		],
	},
	// Shape elements
	{
		displayName: 'Shape Elements to Modify',
		name: 'shapeElements',
		placeholder: 'Modify an shape element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Shape Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByShape',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The shape element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Shape background color',
						name: 'background_color',
						type: 'color',
						default: '',
						description: 'Use a 6 or 8-digit hexadecimal color (e.g., #EAEAEA) or a CMYK color (e.g., cmyk(0,10,0,50)) for the shape, if the design allows',
					},
				],
			},
		],
	},
	// Logo elements
	{
		displayName: 'Logo Elements to Modify',
		name: 'logoElements',
		placeholder: 'Modify an logo element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Logo Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByLogo',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The logo element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Logo Image Url',
						name: 'image_url',
						type: 'string',
						default: '',
						description: 'Public HTTP(s) URL of the image (i.e. https://example.com/image.png).',
						validateType: 'url',
					},
				],
			},
		],
	},
	// QR code elements
	{
		displayName: 'QR Code Elements to Modify',
		name: 'qrcodeElements',
		placeholder: 'Modify a qr code element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'QR Code Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByQrCode',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The qr code element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'QR Code Image Url',
						name: 'image_url',
						type: 'string',
						default: '',
						description: 'Public HTTP(s) URL of the image (i.e. https://example.com/image.png).',
					},
					{
						displayName: 'QR Code Content',
						name: 'payload',
						type: 'string',
						default: '',
						description: 'QRCode content (i.e. https://www.abyssale.com).',
					},
				],
			},
		],
	},
	// Rating elements
	{
		displayName: 'Rating Elements to Modify',
		name: 'ratingElements',
		placeholder: 'Modify a rating element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Rating Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByRating',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The rating element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Rating Score',
						name: 'rating_score',
						type: 'number',
						default: '',
						description: 'Rating Score (between 0 to 100)',
					},
				],
			},
		],
	},
	// Illustration elements
	{
		displayName: 'Illustration Elements to Modify',
		name: 'illustrationElements',
		placeholder: 'Modify an illustration element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateSingle', 'generateMultiFormatImages', 'generateHTML5BannerAds', 'generateMultiFormatVideos', 'generateMultiFormatGIFs', 'generateMultiFormatPDFs'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Illustration Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByIllustration',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The illustration element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Illustration Name',
						name: 'illustration_file',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Illustration Type',
						name: 'illustration_type',
						type: 'string',
						default: '',
						description: 'The illustration library that will be used to retrieve the related illustration name',
					},
				],
			},
		],
	},
]