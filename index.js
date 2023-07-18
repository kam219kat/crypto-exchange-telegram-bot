import { Telegraf, Markup, Scenes, session } from 'telegraf';
import 'dotenv/config';
const Binance = require('node-binance-api');

// BOT TOKEN
const BOT_TOKEN = process.env.BOT_TOKEN;
// ADMIN CHAT ID
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
// Initialize Binance API client
const binance = new Binance().options({
    APIKEY: process.env.BINANCE_API_KEY,
    APISECRET: process.env.YOUR_BINANCE_API_SECRET,
});

// Connect to the bot
const bot = new Telegraf(BOT_TOKEN);

// User balances
const balances = new Map();

const users = new Map();

// Bot balance
let botBalance = 0;

// Transaction history
const transactionHistory = new Map();

// Referral system
const referralBonusPercentage = 1;

// Automatic withdrawal and deposit
// Implement your own logic here

// Manual deposit orders
const manualDepositOrders = [];

// Command handler for the /withdraw command
bot.command('start' | 'help', (ctx) => {
    ctx.reply(`
/deposit <crypto_symbol>: /deposit btc
/withdraw <crypto_symbol> <amount>: /withdraw btc 0.12
/exchange <from_crypto_symbol> <to_crypto_symbol> <amount>: /exchange btc eth 0.12
/history
/admin_deposit <crypto_symbol> <amount>: /admin_deposit btc 0.23
/help
/balance <crypto_symbol>: /balance btc
    `);
});

// /deposit <COIN>
bot.command('deposit', (ctx) => {
    const userId = ctx.from.id;
    const cryptoSymbol = ctx.message.text.split(' ')[1];
    const balance = null;
    if (!cryptoSymbol) {
        ctx.reply('Please provide the cryptocurrency symbol. For example: /deposit BTC');
        return;
    }
    // Generate a unique address for the user to deposit the specified cryptocurrency
    const depositAddress = generateDepositAddress(userId, cryptoSymbol);

    if (!depositAddress) {
        ctx.reply(`Sorry, we do not support deposits for ${cryptoSymbol} at the moment.`);
        return;
    }

    ctx.reply(`To deposit ${cryptoSymbol}, send it to the following address:\n\n${depositAddress}`);

    if (balance = balances.get(userId)) {
        balances.set(userId, { [cryptoSymbol]: 30 });
    } else {
        balance[cryptoSymbol] += 30;
    }

});

// Admin manually deposits funds
bot.command('admin_deposit', (ctx) => {
    const userId = ctx.from.id;
    const cryptoSymbol = ctx.message.text.split(' ')[1];
    const balance = null;
    if (!cryptoSymbol) {
        ctx.reply('Please provide the cryptocurrency symbol. For example: /admin_deposit BTC');
        return;
    }
    // Generate a unique address for the user to deposit the specified cryptocurrency
    const depositAddress = generateDepositAddress(userId, cryptoSymbol);

    if (!depositAddress) {
        ctx.reply(`Sorry, we do not support deposits for ${cryptoSymbol} at the moment.`);
        return;
    }

    ctx.reply(`To deposit ${cryptoSymbol}, send it to the following address:\n\n${depositAddress}`);
    addTransactionHistory(ctx.from.id, 'deposit', { currency: cryptoSymbol, amount });

    if (balance = balances.get(userId)) {
        balances.set(userId, { [cryptoSymbol]: 30 });
    } else {
        balance[cryptoSymbol] += 30;
    }

});
// Helper function to generate a unique deposit address for the user
function generateDepositAddress(userId, cryptoSymbol) {
    // Implement your logic here to generate a unique deposit address for the user and the specified cryptocurrency
    // You can use the userId and cryptoSymbol to create a unique mapping

    // Generate a mock deposit address for demonstration purposes
    const depositAddress = `0xFBcC6C3820abAdE562f8c6D865b9d7c861F6886E`;

    // Store the deposit address for future reference
    depositAddresses[userId] = depositAddress;

    // Return the generated deposit address
    return depositAddress;
}

// Command handler for the /withdraw command
bot.command('withdraw', async (ctx) => {
    const userId = ctx.from.id;
    const cryptoSymbol = ctx.message.text.split(' ')[1];
    const amount = parseFloat(ctx.message.text.split(' ')[2]);
    let balance = null;
    if (!cryptoSymbol || !amount || isNaN(amount) || amount <= 0) {
        ctx.reply('Invalid command format. Please use the following format: /withdraw <crypto_symbol> <amount>');
        return;
    }

    // Check if the user has sufficient balance
    if (!(balance = balances.has(userId)) || !balance[cryptoSymbol] || balances[cryptoSymbol] < amount) {
        ctx.reply('Insufficient funds.');
        return;
    }

    // Perform the withdrawal
    // const withdrawalResult = await performWithdrawal(userId, cryptoSymbol, amount);

    if (withdrawalResult.success) {
        ctx.reply(`Successfully withdrawn ${amount} ${cryptoSymbol}.`);
        addTransactionHistory(ctx.from.id, 'withdraw', { currency: cryptoSymbol, amount });
    } else {
        ctx.reply(`Failed to withdraw ${amount} ${cryptoSymbol}. Reason: ${withdrawalResult.error}`);
    }
});

// Command handler for /exchange command
bot.command('exchange', async (ctx) => {
    const { fromCurrency, toCurrency, amount } = ctx.message.text.split(' ').slice(1);
    let balance = null;
    if (!fromCurrency || !toCurrency || !amount || isNaN(amount) || amount <= 0) {
        ctx.reply('Invalid command format. Please use the following format: /exchange <from_crypto_symbol> <to_crypto_symbol> <amount>');
        return;
    }

    // Check if the user has sufficient balance
    if (!(balance = balances.has(userId)) || !balance[fromCurrency] || balances[fromCurrency] < amount) {
        ctx.reply(`Insufficient ${fromCurrency}`);
        return;
    }
    try {
        // Perform the cryptocurrency exchange using the Binance API
        // const exchangeResult = await performExchange(fromCurrency, toCurrency, amount);

        // Return the result to the user
        ctx.reply(`Exchange result: ${0.23 * amount} ${toCurrency}`);
        addTransactionHistory(ctx.from.id, 'exchange', { from: fromCurrency, to: toCurrency, fromAmount: amount, toAmount: 0.23 * amount});
    } catch (error) {
        console.error(error);
        ctx.reply('An error occurred during the exchange.');
    }
});

// Admin manually deposits funds
bot.command('admin_deposit', (ctx) => {
    const userId = ctx.from.id;
    const cryptoSymbol = ctx.message.text.split(' ')[1];
    const balance = null;
    if (!cryptoSymbol) {
        ctx.reply('Please provide the cryptocurrency symbol. For example: /admin_deposit BTC');
        return;
    }
    // Generate a unique address for the user to deposit the specified cryptocurrency
    const depositAddress = generateDepositAddress(userId, cryptoSymbol);

    if (!depositAddress) {
        ctx.reply(`Sorry, we do not support deposits for ${cryptoSymbol} at the moment.`);
        return;
    }

    ctx.reply(`To deposit ${cryptoSymbol}, send it to the following address:\n\n${depositAddress}`);

    if (balance = balances.get(userId)) {
        balances.set(userId, { [cryptoSymbol]: 30 });
    } else {
        balance[cryptoSymbol] += 30;
    }

});

// Show the transaction history
bot.command('history', async (ctx) => {

    ctx.reply(getTransactionHistory(ctx.from.id));
});

function addTransactionHistory(userId, type, meta) {
    if (!transactionHistory.has(userId)) {
        transactionHistory.set(userId, [transaction]);
    }
    
    transactionHistory.get(userId).push({type, meta});
}

function getTransactionHistory(userId, limit = 10) {
    if (!transactionHistory.has(userId)) {
        return 'No transactions';
    }

    const transactions = transactionHistory.get(userId).slice(-10);
    return transactions.map(transaction => {
        switch(transaction.type) {
            case 'deposit': // deposit
                return `Deposit ${transaction.currency} ${transaction.amount}`;
            break;
            case 'withdraw': // withdraw
                return `Withdraw ${transaction.currency} ${transaction.amount}`;
            case 'exchange': // exchange
                return `Exchange ${transaction.from} ${transaction.fromAmount} -> ${transaction.to} ${transaction.toAmount}`;
            break;
        }
    }).join('\n')
}
// Start the bot
bot.launch();