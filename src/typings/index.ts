export interface YouTubeVideo {
    video: {
        id: string;
        title: string;
        link: string;
    };
    channel: {
        id: string;
        name: string;
        link: string;
    };
    published: string;
    updated: string;
}

export interface DiscordWebhookAuthor {
    username?: string;
    avatar_url?: string;
}

export interface DiscordWebhookContent extends DiscordWebhookAuthor {
    content?: string;
    embeds?: [
        {
            author: {
                name: string;
                url: string;
                icon_url: string;
            };
            title: string;
            url: string;
            description: string;
            color: Number | string;
            fields: [
                {
                    name: string;
                    value: string;
                    inline: boolean;
                }
            ];
            thumbnail: {
                url: string;
            };
            image: {
                url: string;
            };
            footer: {
                text: string;
                icon_url: string;
            };
        }
    ];
}

export interface DiscordWebhook {
    type: Number;
    id: string;
    name: string;
    avatar: string | null;
    channel_id: string;
    guild_id: string;
    application_id: string | null;
    token: string;
}
