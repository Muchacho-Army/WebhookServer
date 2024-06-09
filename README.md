# Webhook Server
Simple webhook server for sending webhooks to a discord server when a youtube channel uploads a new video

### Installation
1. Clone the Repository: `git clone https://github.com/Muchacho-Army/WebhookServer`
2. Install the Dependencies: `npm install --include=dev`

### Setup
> [!WARNING]
> You need to allow incoming TCP connections for your port
- Create a .env file in the root directory with the following content:
    ```
    PORT = 8080
    FQDN = "http://your.server.com"
    DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/..."
    ```
- Start the server with `npm start`
