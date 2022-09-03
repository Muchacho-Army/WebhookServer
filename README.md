# Webhook Server
Simple webhook server for sending webhooks when a youtube channel uploads a new video

### Installation
1. Clone the Repository: `git clone https://github.com/Muchacho-Army/WebhookServer`
2. Install the Dependencies: `npm install`


### Setup
- Create a .env file in the root directory with the following content:
    ```
    PORT = 8080
    SERVER = "http://your.server.com"
    WEBHOOK_URL = "https://discord.com/api/webhooks/..."
    ```
- Start the server with `node build\index.js`

