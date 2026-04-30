export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { bot } = await import('@/lib/tele');
    
    bot.on('message', (msg) => {
      console.log(`Bot received: ${msg.text}`);
    });
  }
}