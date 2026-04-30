import TelegramBot from 'node-telegram-bot-api';

const token = process.env.BOT_TOKEN!;

const globalForBot = globalThis as unknown as {
  bot: TelegramBot | undefined;
  chatId: number | string | undefined;
  lastMessage: string | undefined;
};

// const bot = new TelegramBot(token, { polling: true });

export const bot = globalForBot.bot ?? new TelegramBot(token, {
    polling: true
});
if (process.env.NODE_ENV !== 'production') globalForBot.bot = bot;

export let chatId: number | string | undefined = globalForBot.chatId ?? undefined;
export let lastMessage: string | undefined = globalForBot.lastMessage ?? undefined;

export function resetLastMessage() {
    lastMessage = undefined;
}

bot.on('message', (msg) => {
    const _chatId = msg.chat.id;

    if (msg.from && (msg.from.username === "stayreaI" || msg.from.username === "burgercatcher67")) {
        if (msg.text !== "APPROVE" && msg.text !== "DENY") {
            bot.sendMessage(_chatId, "This chat is now setup for Burger Alerts.");
        
            chatId = _chatId;
            globalForBot.chatId = _chatId;
        }

        lastMessage = msg.text;
        globalForBot.lastMessage = msg.text;
    }
})