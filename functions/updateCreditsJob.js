const functions = require('firebase-functions');
const stripeLib = require('stripe');
const Firestore = require('@google-cloud/firestore');
const { STRIPE_SK_KEY } = require('./constants');

const stripe = stripeLib(STRIPE_SK_KEY);

const firestore = new Firestore({
  projectId: 'mymetadata-380af',
  timestampsInSnapshots: true,
});

const updateCreditsJob = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const snapshot = await firestore.collection('users').get();
  snapshot.docs.forEach(async (doc) => {
    const { credits = 0, stripeCustomerId, tier = 0 } = doc.data();
    const subscription = await stripe.subscriptions.list({ customer: stripeCustomerId });
    if (subscription && Array.isArray(subscription.data)) {
      const data = subscription.data[0];
      if (data && data.current_period_end) {
        const end = data.current_period_end;
        const difference = end - (Date.now() / 1000);
        const daysLeft = difference / 60 / 60 / 24;
        const customerTier = Number(tier);
        if ((customerTier === 1 || customerTier === 2) && daysLeft > 0 && daysLeft < 1) {
          let newCredits;
          switch (Number(customerTier)) {
            case 1: {
              newCredits = 10;
              break;
            }
            case 2: {
              newCredits = 30;
              break;
            }
            default:
              newCredits = 0;
              break;
          }
          const originalCredits = typeof credits === 'number' ? credits : 0;
          await firestore.collection('users').doc(doc.id)
              .update({ credits: Number(Math.floor(originalCredits + newCredits)) });
        }
      }
    }
  });
});

module.exports = updateCreditsJob;
