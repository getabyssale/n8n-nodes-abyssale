import {
    IExecuteFunctions,
    ILoadOptionsFunctions,
    IDataObject,
    IHookFunctions,
    IWebhookFunctions,
    IHttpRequestMethods,
    IHttpRequestOptions, IPollFunctions,
} from 'n8n-workflow';

export async function abyssaleApiRequest(
    this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions | IPollFunctions,
    method: IHttpRequestMethods,
    resource: string,
    body: IDataObject = {},
    query: IDataObject = {},
    uri?: string,
    headers: IDataObject = {},
) {
    const options: IHttpRequestOptions = {
        headers: {
            Accept: 'application/json',
						"X-Referer": "n8n",
            ...headers,
        },
        method,
        body,
        qs: query,
        url: uri ? `${uri}${resource}` : `https://api.abyssale.com${resource}`,
        returnFullResponse: false,
    };

    if (!Object.keys(body as IDataObject).length) {
        delete options.body;
    }
    if (!Object.keys(query).length) {
        delete options.qs;
    }

		return await this.helpers.httpRequestWithAuthentication.call(
				this,
				'AbyssaleApi',
				options,
		);
}

export async function fetchDesign(
    this: ILoadOptionsFunctions,
): Promise<[IDataObject[], IDataObject[]]> {
    const designId = this.getNodeParameter('designId') as string;
    if (!designId) return [[], []];

    const staticData = this.getWorkflowStaticData('node') as IDataObject & {
        designCache?: { id: string; elements: IDataObject[], formats: IDataObject[] };
    };

    if (!staticData.designCache || staticData.designCache.id !== designId) {
        const templateDetails = await abyssaleApiRequest.call(
            this,
            'GET',
            `/designs/${designId}`,
        );
        staticData.designCache = {
            id: designId,
            elements: templateDetails.elements || [],
            formats: templateDetails.formats || [],
        };
    }

    return [staticData.designCache.elements, staticData.designCache.formats];
}