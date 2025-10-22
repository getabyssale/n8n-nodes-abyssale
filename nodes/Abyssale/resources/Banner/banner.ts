import { INodeProperties } from 'n8n-workflow';

export const bannerProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['banner'],
			},
		},
		options: [
			{
				name: 'Export Banners',
				value: 'exportBanners',
				description: 'Export one or multiple previously generated visuals in .zip format',
				action: 'Export banners',
			},
			{
				name: 'Generate HTML5 Banner Ads',
				value: 'generateHTML5BannerAds',
				description: 'Generate HTML5 banner ads from an animated design',
				action: 'Generate html5 banner ads',
			},
			{
				// Currently gif and video have the same form. Nothing different
				name: 'Generate Multi-Format Animated GIFs',
				value: 'generateMultiFormatGIFs',
				description: 'Generate multiple animated GIFs at once from a design created in Abyssale',
				action: 'Generate multi format animated gifs',
			},
			{
				name: 'Generate Multi-Format Images',
				value: 'generateMultiFormatImages',
				description: 'Generate a multiple images (JPEG, PNG, PDF,..) from a design',
				action: 'Generate multiple images',
			},
			{
				name: 'Generate Multi-Format PDFs for Printing',
				value: 'generateMultiFormatPDFs',
				description: 'Generate multiple printable PDFs at once from a design created in Abyssale',
				action: 'Generate multi format pdfs for printing',
			},
			{
				name: 'Generate Multi-Format Videos',
				value: 'generateMultiFormatVideos',
				description: 'Generate multiple videos at once from an animated design created in Abyssale',
				action: 'Generate multi format videos',
			},
			{
				name: 'Generate Single Image',
				value: 'generateSingle',
				description: 'Generate a single image (JPEG, PNG, PDF) from a design',
				action: 'Generate a single image',
			},
			{
				name: 'Get Banner',
				value: 'getBanner',
				description: 'Retrieves the details about a previously generated banner',
				action: 'Get banner',
			},
		],
		default: 'generateSingle',
	},
];

export const getBannerProperties: INodeProperties[] = [
	{
		displayName: 'Banner ID',
		name: 'bannerId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['getBanner'],
			},
		},
		required: true,
	},
]