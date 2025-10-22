import { INodeProperties } from 'n8n-workflow';

export const videoAndAudioElements: INodeProperties[] = [
	// Video elements
	{
		displayName: 'Video Elements to Modify',
		name: 'videoElements',
		placeholder: 'Modify a video element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateHTML5BannerAds', 'generateMultiFormatVideos', "generateMultiFormatGIFs"],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Video Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByVideo',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The video element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Video URL',
						name: 'video_url',
						type: 'string',
						default: '',
						description: 'Public HTTP(s) URL of the video (i.e. https://example.com/video.mp4).',
						validateType: 'url',
					},
				],
			},
		],
	},

	// Audio elements
	{
		displayName: 'Audio Elements to Modify',
		name: 'audioElements',
		placeholder: 'Modify an audio element.',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		displayOptions: {
			show: {
				resource: ['banner'],
				operation: ['generateMultiFormatVideos'],
			},
		},
		default: {},
		options: [
			{
				name: 'element',
				displayName: 'Element',
				values: [
					{
						displayName: 'Audio Element Name or ID',
						name: 'elementId',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getDesignElementsFilteredByAudio',
							loadOptionsDependsOn: ['designId'],
						},
						default: '',
						description: 'The audio element to modify. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
					},
					{
						displayName: 'Audio URL',
						name: 'audio_url',
						type: 'string',
						default: '',
						description: 'Public HTTP(s) URL of the audio (i.e. https://example.com/audio.mp3).',
						validateType: 'url',
					},
				],
			},
		],
	},
]