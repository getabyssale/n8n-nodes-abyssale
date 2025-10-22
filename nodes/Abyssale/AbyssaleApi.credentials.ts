import {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AbyssaleApi implements ICredentialType {
    name = 'AbyssaleApi';
    displayName = 'Abyssale API';
		icon: Icon = { light: 'file:./icons/abyssale.svg', dark: 'file:./icons/abyssale-dark.svg' };
    documentationUrl = 'https://docs.abyssale.com'; // Update with actual docs URL
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: { password: true },
            default: '',
            required: true,
            description: 'Your Abyssale API key',
        },
    ];

    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'x-api-key': '={{$credentials.apiKey}}',
            },
        },
    };

    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.abyssale.com',
            url: '/ready',
        },
    };
}