import { INodeProperties } from 'n8n-workflow';

export const generateHTML5BannerAds: INodeProperties[] = [
	// Click tag
	{
		displayName: 'Click Tag',
		name: 'clickTag',
		type: 'string',
		default: '',
		description: 'The user will be redirected to a specified URL upon clicking the visual',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateHTML5BannerAds'],
			},
		},
	},

	// Page title
	{
		displayName: 'Page Title',
		name: 'pageTitle',
		type: 'string',
		default: '',
		description: 'The page title of the html document',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateHTML5BannerAds'],
			},
		},
	},

	// Ad network
	{
		displayName: 'Ad Network',
		name: 'adNetwork',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateHTML5BannerAds'],
			},
		},
		options: [
			{
				name: 'AdForm',
				value: 'adform',
			},
			{
				name: 'AdRoll',
				value: 'adroll',
			},
			{
				name: 'Amazon Ads',
				value: 'amazon-ads',
			},
			{
				name: 'Custom',
				value: 'custom',
			},
			{
				name: 'Google Ads',
				value: 'google-ads',
			},
			{
				name: 'Google Marketing',
				value: 'google-marketing',
			},
			{
				name: 'IAB',
				value: 'iab',
			},
			{
				name: 'None',
				value: '',
			},
		],
		default: '',
		description: 'Ad network that will be used to dynamically compute the html5 file according to the related network constraints',
	},
]