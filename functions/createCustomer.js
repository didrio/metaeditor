const functions = require('firebase-functions');
const stripeLib = require('stripe');
const { STRIPE_NEW_CUSTOMER, STRIPE_SK_KEY } = require('./constants');

const stripe = stripeLib(STRIPE_SK_KEY);

const createCustomer = functions.https.onRequest(async (request, response) => {
  try {
    response.set('Access-Control-Allow-Origin', '*');
    if (request.method !== 'POST') {
      response.status(400).send('Not a POST request');
      return;
    }
    const {
      cNumber = null,
      cMonth = null,
      cYear = null,
      cCode = null,
      email = null,
      tier = null,
    } = JSON.parse(request.body);
    if (!email || !cNumber || !cMonth || !cYear || !cCode || !tier) {
      response.status(400).send('Missing required fields');
      return;
    }
    const newCustomer = STRIPE_NEW_CUSTOMER;
    newCustomer.email = email;
    const { id: customerId } = await stripe.customers.create(newCustomer);
    if (!customerId) {
      response.status(400).send('Error creating customer');
      return;
    }
    const { id: paymentId } = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: String(cNumber),
        exp_month: Number(cMonth),
        exp_year: Number(cYear),
        cvc: String(cCode),
      },
    });
    if (!paymentId) {
      response.status(400).send('Error creating payment');
      return;
    }
    await stripe.paymentMethods.attach(
        paymentId,
        { customer: customerId },
    );
    await stripe.customers.update(
        customerId,
        { invoice_settings: {
          default_payment_method: paymentId,
        }},
    );
    let priceId;
    switch (Number(tier)) {
      case 1: {
        priceId = 'price_1KnB3VJcXRHOrRKCMQ35fGz1';
        break;
      }
      case 2: {
        priceId = 'price_1KnB3yJcXRHOrRKC4cKDMXGW';
        break;
      }
      case 3: {
        priceId = 'price_1KnB57JcXRHOrRKCFHZGc79K';
        break;
      }
      default:
        response.status(400).send('Invalid tier');
        break;
    }
    await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
    });
    response.status(200).send({
      stripeCustomerId: customerId,
      stripePaymentId: paymentId,
    });
  } catch (error) {
    console.log('error', error);
    const errorMessage = typeof error === 'object' ? (error.message || error) : error;
    response.status(400).send(errorMessage);
  }
});

module.exports = createCustomer;
