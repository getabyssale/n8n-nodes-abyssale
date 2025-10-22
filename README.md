# n8n-nodes-abyssale

This is an n8n community node. It lets you use Abyssale API in your n8n workflows.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Abyssale](https://www.abyssale.com/) helps you generate creative content at scale.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

- Banner
  - Export banners
  - Generate html5 banner ads
  - Generate multi format animated gifs
  - Generate multiple images
  - Generate multiple format pds for printing
  - Generate multiple format videos
  - Generate a single image
  - Get banner
  - Watch banner creation
  - Watch banner batch creation
  - Watch banners export
- Design
  - Get a design
  - Get a design format
  - Watch design status changes

## Credentials

You can use abyssale access token to use this node.

### Access token

1. Follow this [tutorial](https://help.abyssale.com/en/articles/329008-how-to-create-your-abyssale-api-key) to generate your api key.
2. Copy the token.

## Compatibility

Compatible with n8n@1.117.3 or later

## Usage

### Generate marketing visuals with n8n
Transform your n8n workflows with automated visual generation. 
Pull data from any source and turn it into engaging visuals for every channel - from social posts to email campaigns.

#### Basic image generation
1. Add an **Abyssale** node to your workflow.
2. Select the **Generate a single image** operation from the node's dropdown menu.
3. Add your Abyssale API credential.
4. Choose a static design. The design must be created in the Abyssale app beforehand and will be used as the base for your generated images.
5. Select your desired format you want to use.
6. Configure the design elements you want to customize. Map input data to specific elements like text, images, or colors to personalize each generated visual.
7. Execute the node by clicking **Execute step**.
8. Abyssale will automatically generate an image with your specified element modifications applied.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Abyssale API docs](https://developers.abyssale.com/)
