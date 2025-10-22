import {
	NodeConnectionTypes,
	type INodeType,
	type INodeTypeDescription,
	IExecuteFunctions,
	INodeExecutionData, IDataObject, ILoadOptionsFunctions, INodePropertyOptions,
} from 'n8n-workflow';
import { abyssaleApiRequest, fetchDesign } from './shared/transport';
import { genericElements } from './resources/Banner/genericElements';
import { bannerProperties, getBannerProperties } from './resources/Banner/banner';
import { designProperties, getDesignAndDesignFormat } from './resources/Design/design';
import { generateHTML5BannerAds } from './resources/Banner/generateHTML5BannerAds';
import { videoAndAudioElements } from './resources/Banner/videoAndAudioElements';
import { exportElements } from './resources/Banner/export';
import { sharedProperties } from './resources/Shared/shared';

export class Abyssale implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Abyssale',
		name: 'abyssale',
		icon: { light: 'file:./icons/abyssale.svg', dark: 'file:./icons/abyssale-dark.svg' },
		group: ['input'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume Abyssale API',
		defaults: {
			name: 'Abyssale',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'AbyssaleApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.abyssale.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Banner',
						value: 'banner',
					},
					{
						name: 'Design',
						value: 'design',
					},
				],
				default: 'banner',
			},
			...bannerProperties,
			// Get banner
			...getBannerProperties,
			// Generate banner
			...designProperties,
			...genericElements,
			...videoAndAudioElements,
			...generateHTML5BannerAds,
			// Get Design
			...getDesignAndDesignFormat,
			// Export banners
			...exportElements,
			// Shared properties
			...sharedProperties,
	]
	};

	methods = {
		loadOptions: {
			// Load available designs
			async getDesigns(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let designsUrl = "/designs"
				let designType = ""
				const operation = this.getNodeParameter('operation', 0) as string;
				if (operation == "generateSingle" || operation == "generateMultiFormatImages") {
					designType = "static"
				}

				if (operation == "generateHTML5BannerAds" || operation == "generateMultiFormatVideos" || operation == "generateMultiFormatGIFs") {
					designType = "animated"
				}

				if (operation == "generateMultiFormatPDFs") {
					designType = "printer"
				}

				if (designType !== "" && ["static", "animated", "printer", "printer_multipage"].includes(designType)) {
					designsUrl += "?type=" + designType
				}

				const designs = await abyssaleApiRequest.call(
					this,
					'GET',
					designsUrl,
				);

				return designs.map((design: IDataObject) => ({
					name: design.name as string,
					value: design.id as string,
				}));
			},
			async getDesignFormats(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [,formats] = await fetchDesign.call(this);

				return formats.map(format => ({
					name: format.id as string,
					value: format.id as string,
				}));
			},
			async getDesignElementsFilteredByText(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const textElements = elements.filter(el => el.type === 'text');
				return textElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByImage(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'image');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByButton(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'button');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByShape(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'shape');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByLogo(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'logo');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByQrCode(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'qrcode');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByRating(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'rating');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByIllustration(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'illustration');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByVideo(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'video');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
			async getDesignElementsFilteredByAudio(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const [elements] = await fetchDesign.call(this);
				const imageElements = elements.filter(el => el.type === 'audio');
				return imageElements.map(el => ({
					name: el.name as string,
					value: el.name as string,
				}));
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const length = items.length;
		// let responseData;
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		for (let i = 0; i < length; i++) {
			if (resource === 'banner' && ["generateSingle", "generateMultiFormatImages", "generateHTML5BannerAds", "generateMultiFormatVideos", "generateMultiFormatGIFs", "generateMultiFormatPDFs"].includes(operation)) {
				const designId = this.getNodeParameter('designId', i) as string;
				const designFormat = this.getNodeParameter('designFormat', i, "") as string;
				const designFormats = this.getNodeParameter('designFormats', i, "") as string;
				const imageFileType = this.getNodeParameter('imageFileType', i, "") as string;
				const root = this.getNodeParameter('root', i, "") as string; // root background_color
				const textElements = this.getNodeParameter('textElements', i, []) as IDataObject;
				const imageElements = this.getNodeParameter('imageElements', i, []) as IDataObject;
				const buttonElements = this.getNodeParameter('buttonElements', i, []) as IDataObject;
				const shapeElements = this.getNodeParameter('shapeElements', i, []) as IDataObject;
				const logoElements = this.getNodeParameter('logoElements', i, []) as IDataObject;
				const qrcodeElements = this.getNodeParameter('qrcodeElements', i, []) as IDataObject;
				const ratingElements = this.getNodeParameter('ratingElements', i, []) as IDataObject;
				const illustrationElements = this.getNodeParameter('illustrationElements', i, []) as IDataObject;
				// Only for generateMultiFormatImages and generateHTML5BannerAds
				const webhookUrl = this.getNodeParameter('webhookUrl', i, "") as string;
				// Only for generateHTML5BannerAds
				const clickTag = this.getNodeParameter('clickTag', i, "") as string;
				const pageTitle = this.getNodeParameter('pageTitle', i, "") as string;
				const adNetwork = this.getNodeParameter('adNetwork', i, "") as string;
				// Only for generateHTML5BannerAds and generateMultiFormatVideos
				const videoElements = this.getNodeParameter('videoElements', i, "") as IDataObject;
				// Only for generateMultiFormatVideos
				const audioElements = this.getNodeParameter('audioElements', i, "") as IDataObject;
				// Simplify the response
				const simplify = this.getNodeParameter('simplify', i, false) as boolean;

				const body = {
					elements: {} as Record<string, Record<string, string>>,
				} as IDataObject;

				const elements = body.elements as Record<string, Record<string, string>>

				if (operation == "generateHTML5BannerAds") {
					body["image_file_type"] = "html5"
				}

				if (operation == "generateMultiFormatVideos") {
					body["image_file_type"] = "mp4"
				}

				if (operation == "generateMultiFormatGIFs") {
					body["image_file_type"] = "gif"
				}

				if (webhookUrl) {
					body["callback_url"] = webhookUrl
				}

				// Only for single banner generation
				if (designFormat) {
					body["template_format_name"] = designFormat
				}
				// Only for multiple banners generation
				if (designFormats) {
					body["template_format_names"] = designFormats
				}

				if (imageFileType && imageFileType !== 'auto') {
					body.image_file_type = imageFileType;
				}

				if (clickTag || pageTitle || adNetwork) {
					body["html5"] = {}
					if (clickTag) {
						(body.html5 as Record<string, string>)["click_tag"] = clickTag;
					}

					if (pageTitle) {
						(body.html5 as Record<string, string>)["page_title"] = pageTitle;
					}

					if (adNetwork) {
						(body.html5 as Record<string, string>)["ad_network"] = adNetwork;
					}
				}

				if (root) {
					(body.elements as Record<string, Record<string, string>>)["root"] = {"background_color": root}
				}

				if (textElements && textElements.element) {
					const elementsList = Array.isArray(textElements.element)
						? textElements.element
						: [textElements.element] as IDataObject[];

					for (const textElement  of elementsList) {
						const elementId = textElement.elementId as string;
						elements[elementId] = {};

						if (textElement.payload) {
							elements[elementId]["payload"] = textElement.payload;
						}
						if (textElement.color) {
							elements[elementId]["color"] = textElement.color;
						}
					}
				}

				if (imageElements && imageElements.element) {
					const elementsList = Array.isArray(imageElements.element)
						? imageElements.element
						: [imageElements.element] as IDataObject[];

					for (const imageElement of elementsList) {
						const elementId = imageElement.elementId as string;
						elements[elementId] = {};

						if (imageElement.image_url) {
							elements[elementId]["image_url"] = imageElement.image_url;
						}
					}
				}

				if (buttonElements && buttonElements.element) {
					const elementsList = Array.isArray(buttonElements.element)
						? buttonElements.element
						: [buttonElements.element] as IDataObject[];

					for (const buttonElement of elementsList) {
						const elementId = buttonElement.elementId as string;
						elements[elementId] = {};

						if (buttonElement.payload) {
							elements[elementId]["payload"] = buttonElement.payload;
						}

						if (buttonElement.color) {
							elements[elementId]["color"] = buttonElement.color;
						}

						if (buttonElement.background_color) {
							elements[elementId]["background_color"] = buttonElement.background_color;
						}
					}
				}

				if (shapeElements && shapeElements.element) {
					const elementsList = Array.isArray(shapeElements.element)
						? shapeElements.element
						: [shapeElements.element] as IDataObject[];

					for (const shapeElement of elementsList) {
						const elementId = shapeElement.elementId as string;
						elements[elementId] = {};

						if (shapeElement.background_color) {
							elements[elementId]["background_color"] = shapeElement.background_color;
						}
					}
				}

				if (logoElements && logoElements.element) {
					const elementsList = Array.isArray(logoElements.element)
						? logoElements.element
						: [logoElements.element] as IDataObject[];

					for (const logoElement of elementsList) {
						const elementId = logoElement.elementId as string;
						elements[elementId] = {};

						if (logoElement.image_url) {
							elements[elementId]["image_url"] = logoElement.image_url;
						}
					}
				}

				if (qrcodeElements && qrcodeElements.element) {
					const elementsList = Array.isArray(qrcodeElements.element)
						? qrcodeElements.element
						: [qrcodeElements.element] as IDataObject[];

					for (const qrcodeElement of elementsList) {
						const elementId = qrcodeElement.elementId as string;
						elements[elementId] = {};

						if (qrcodeElement.image_url) {
							elements[elementId]["image_url"] = qrcodeElement.image_url;
						}

						if (qrcodeElement.payload) {
							elements[elementId]["payload"] = qrcodeElement.payload;
						}
					}
				}

				if (ratingElements && ratingElements.element) {
					const elementsList = Array.isArray(ratingElements.element)
						? ratingElements.element
						: [ratingElements.element] as IDataObject[];

					for (const ratingElement of elementsList) {
						const elementId = ratingElement.elementId as string;
						elements[elementId] = {};

						if (ratingElement.rating_score) {
							elements[elementId]["rating_score"] = ratingElement.rating_score;
						}
					}
				}

				if (illustrationElements && illustrationElements.element) {
					const elementsList = Array.isArray(illustrationElements.element)
						? illustrationElements.element
						: [illustrationElements.element] as IDataObject[];

					for (const illustrationElement of elementsList) {
						const elementId = illustrationElement.elementId as string;
						elements[elementId] = {};

						if (illustrationElement.illustration_file) {
							elements[elementId]["illustration_file"] = illustrationElement.illustration_file;
						}

						if (illustrationElement.illustration_type) {
							elements[elementId]["illustration_type"] = illustrationElement.illustration_type;
						}
					}
				}

				if (videoElements && videoElements.element) {
					const elementsList = Array.isArray(videoElements.element)
						? videoElements.element
						: [videoElements.element] as IDataObject[];

					for (const videoElement of elementsList) {
						const elementId = videoElement.elementId as string;
						elements[elementId] = {};

						if (videoElement.video_url) {
							elements[elementId]["video_url"] = videoElement.video_url;
						}
					}
				}

				if (audioElements && audioElements.element) {
					const elementsList = Array.isArray(audioElements.element)
						? audioElements.element
						: [audioElements.element] as IDataObject[];

					for (const audioElement of elementsList) {
						const elementId = audioElement.elementId as string;
						elements[elementId] = {};

						if (audioElement.audio_url) {
							elements[elementId]["audio_url"] = audioElement.audio_url;
						}
					}
				}

				let url = `/banner-builder/${designId}/generate`
				if (["generateMultiFormatImages", "generateHTML5BannerAds", "generateMultiFormatVideos", "generateMultiFormatGIFs", "generateMultiFormatPDFs"].includes(operation)) {
					url = `/async/banner-builder/${designId}/generate`;
				}

				let responseData = await abyssaleApiRequest.call(this, 'POST', url, body);
				if (operation === "generateSingle" && simplify) {
					responseData = {
						"id": responseData["id"],
						"url": responseData["file"]["url"],
						"cdn_url": responseData["file"]["cdn_url"],
						"design_id": responseData["template"]["id"],
						"format_id": responseData["format"]["id"],
					}
				}

				returnData.push(responseData as IDataObject);
			} else if (resource === 'banner' && operation === "getBanner") {
				const bannerId = this.getNodeParameter('bannerId', i) as string;
				// Simplify the response
				const simplify = this.getNodeParameter('simplify', i, false) as boolean;

				let responseData = await abyssaleApiRequest.call(this, 'GET', `/banners/${bannerId}`);
				if (simplify) {
					responseData  = {
						"id": responseData["id"],
						"url": responseData["file"]["url"],
						"cdn_url": responseData["file"]["cdn_url"],
						"design_id": responseData["template"]["id"],
						"format_id": responseData["format"]["id"],
					}
				}

				returnData.push(responseData as IDataObject);
			} else if (resource === 'design' && operation === "getDesign") {
				const designId = this.getNodeParameter('designId', i) as string;
				// Simplify the response
				const simplify = this.getNodeParameter('simplify', i, false) as boolean;

				let responseData = await abyssaleApiRequest.call(this, 'GET', `/designs/${designId}`);
				if (simplify) {
					const simplifiedFormats = [] as IDataObject[];
					for (const format of responseData["formats"]) {
						simplifiedFormats.push({
							"id": format["id"],
							"preview_url": format["preview_url"]
						})
					}

					responseData = {
						"id": responseData["id"],
						"name": responseData["name"],
						"formats": simplifiedFormats,
						"category_name": responseData["category_name"]
					}
				}

				returnData.push(responseData as IDataObject);
			}  else if (resource === 'design' && operation === "getDesignFormat") {
				const designId = this.getNodeParameter('designId', i) as string;
				const designFormat = this.getNodeParameter('designFormat', i) as string;
				// Simplify the response
				const simplify = this.getNodeParameter('simplify', i, false) as boolean;

				let responseData = await abyssaleApiRequest.call(this, 'GET', `/designs/${designId}/formats/${designFormat}`);
				if (simplify) {
					responseData = {
						"id": responseData["id"],
						"preview_url": responseData["preview_url"],
						"design_id": responseData["design"]["id"],
						"width": responseData["width"],
						"height": responseData["height"],
						"category_name": responseData["design"]["category_name"],
					}
				}

				returnData.push(responseData as IDataObject);
			} else if (resource === 'banner' && operation === "exportBanners") {
				const bannerIds = this.getNodeParameter('bannerIds', i) as IDataObject;
				const webhookUrl = this.getNodeParameter('webhookUrl', i, "") as string;

				const expectedBannersId = [] as string[];
				if (bannerIds && bannerIds.values) {
					const values = bannerIds.values as Array<{ bannerId: string }>;
					for (const item of values) {
						expectedBannersId.push(item.bannerId)
					}
				}

				const body = {
					ids: expectedBannersId,
					"callback_url": webhookUrl,
				}

				const responseData = await abyssaleApiRequest.call(this, 'POST', '/async/banners/export', body);

				returnData.push(responseData as IDataObject);
			}
		}
		return [this.helpers.returnJsonArray(returnData)];
	}
}
