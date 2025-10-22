import {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
} from 'n8n-workflow';
import { abyssaleApiRequest } from './shared/transport';

export class AbyssaleTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Abyssale Trigger',
		name: 'abyssaleTrigger',
		icon: { light: 'file:./icons/abyssale.svg', dark: 'file:./icons/abyssale-dark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Handle Abyssale events via webhooks',
		defaults: {
			name: 'Abyssale Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'AbyssaleApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Events',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Watch Design Status',
						value: 'template_status',
						description: 'Occurs whenever a design status has changed',
					},
					{
						name: 'Watch New Banner',
						value: 'new_banner',
						description: 'Occurs whenever a new banner is created',
					},
					{
						name: 'Watch New Banners Batch',
						value: 'new_banner_batch',
						description: 'Occurs whenever a batch generation of banners is created',
					},
					{
						name: 'Watch New Export',
						value: 'new_export',
						description: 'Occurs whenever an export of one or multiple banners has been completed',
					},
				],
				required: true,
				default: 'template_status',
				description: 'The event to listen to',
			},
			// Simplify
			{
				displayName: 'Simplify',
				name: 'simplify',
				description: 'Whether to return a simplified version of the response instead of the raw data',
				type: 'boolean',
				default: false,
				displayOptions: {
					show: {
						event: ['new_banner', 'new_banner_batch'],
					},
				},
			}
		],
		usableAsTool: true,
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId === undefined) {
					return false;
				}

				try {
					await abyssaleApiRequest.call(this, 'GET', `/webhook/${webhookData.webhookId}`, {}, {}, "https://webhook.abyssale.com");
				} catch(error) {
					if (error.httpCode === '404') {
						// Webhook does not exist
						delete webhookData.webhookId;
						delete webhookData.webhookEvent;
						return false;
					}
				}

				return true
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event', "");

				const body = {
					"hook_url": webhookUrl,
					"type": event,
				}
				const responseData = await abyssaleApiRequest.call(this, 'POST', "/subscribe", body, {}, "https://webhook.abyssale.com");

				if (responseData.id === undefined) {
					// Required data is missing so was not successful
					throw new NodeApiError(this.getNode(), responseData as JsonObject, {
						message: 'Abyssale webhook creation response did not contain the expected data.',
					});
				}

				const webhookData = this.getWorkflowStaticData('node');
				webhookData.webhookId = responseData.id as string;
				webhookData.webhookEvent = event;

				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId !== undefined) {
					try {
						await abyssaleApiRequest.call(this, 'DELETE', `/unsubscribe/${webhookData.webhookId}` , {}, {},"https://webhook.abyssale.com");
					} catch {
						return false;
					}

					// Remove from the static workflow data so that it is clear
					// that no webhooks are registered anymore
					delete webhookData.webhookId;
					delete webhookData.webhookEvent;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();

		// Simplify the response
		const simplify = this.getNodeParameter('simplify', false) as boolean;
		const event = this.getNodeParameter('event', '') as string;

		let response = req.body
		if (simplify) {
			if (event == "new_banner") {
				response  = {
					"id": req.body["id"],
					"url": req.body["file"]["url"],
					"cdn_url": req.body["file"]["cdn_url"],
					"design_id": req.body["template"]["id"],
					"format_id": req.body["format"]["id"],
				}
			} else if (event == "new_banner_batch") {
				const simplifiedBanners = [] as IDataObject[];
				for (const banner of req.body["banners"]) {
					simplifiedBanners.push({
						"id": banner["id"],
						"url": banner["file"]["url"],
					})
				}

				response = {
					"generation_request_id": req.body["generation_request_id"],
					"banners": simplifiedBanners,
					"errors": req.body["errors"],
				}
			}
		}

		return {
			workflowData: [this.helpers.returnJsonArray(response as IDataObject)],
		};
	}

}