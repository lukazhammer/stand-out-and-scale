require('dotenv').config({ path: '.env.local' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function main() {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.error('STRIPE_SECRET_KEY is missing in .env.local');
        // For safety, warn but don't crash if we can't check
        // Actually we can't proceed without it.
        process.exit(1);
    }

    try {
        // Search using list instead of search for broad compatibility if search not enabled (though search is standard now)
        // search requires some setup on Stripe sometimes. list is safer.
        const products = await stripe.products.list({
            limit: 100,
        });

        // Manual filter
        let product = products.data.find(p => p.name === 'Stand Out and Scale');
        let priceId;

        if (product) {
            console.log(`Found product: ${product.id}`);
            const prices = await stripe.prices.list({ product: product.id, limit: 1 });
            if (prices.data.length > 0) {
                priceId = prices.data[0].id;
                console.log(`Found existing price: ${priceId}`);
            } else {
                console.log('Creating price for existing product...');
                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: 799,
                    currency: 'usd',
                });
                priceId = price.id;
                console.log(`Created new price: ${priceId}`);
            }
        } else {
            console.log('Creating new product and price...');
            product = await stripe.products.create({
                name: 'Stand Out and Scale',
                description: 'Strategic Brand Building for Serious Entrepreneurs',
                images: ['https://stand-out-and-scale.com/book-cover.jpg'], // Placeholder or use env var if available
            });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: 799,
                currency: 'usd',
            });
            priceId = price.id;
            console.log(`Created new product and price: ${priceId}`);
        }

        console.log('---RESULT---');
        console.log(priceId);
        console.log('---END RESULT---');

    } catch (error) {
        console.error('Error interacting with Stripe:', error);
        process.exit(1);
    }
}

main();
