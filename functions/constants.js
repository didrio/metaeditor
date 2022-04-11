const STRIPE_SUBSCRIPTION_1 = {
  'id': 'si_KJE5hk210OzQLl',
  'object': 'subscription_item',
  'billing_thresholds': null,
  'created': Date.now(),
  'metadata': {},
  'price': {
    'id': '15',
    'object': 'price',
    'active': true,
    'billing_scheme': 'per_unit',
    'created': Date.now(),
    'currency': 'usd',
    'livemode': false,
    'lookup_key': null,
    'metadata': {
      'charset': 'utf-8',
      'content': '15',
    },
    'nickname': null,
    'product': 'prod_BTdpcRLIUTfsFR',
    'recurring': {
      'aggregate_usage': null,
      'interval': 'week',
      'interval_count': 3,
      'usage_type': 'licensed',
    },
    'tax_behavior': 'unspecified',
    'tiers_mode': null,
    'transform_quantity': null,
    'type': 'recurring',
    'unit_amount': 444,
    'unit_amount_decimal': '444',
  },
  'quantity': 1,
  'subscription': 'sub_1Jebd02eZvKYlo2CnGvHpTeA',
  'tax_rates': [],
};

const STRIPE_SUBSCRIPTION_2 = {
  'id': 'si_KJE5hk210OzQLl',
  'object': 'subscription_item',
  'billing_thresholds': null,
  'created': Date.now(),
  'metadata': {},
  'price': {
    'id': '15',
    'object': 'price',
    'active': true,
    'billing_scheme': 'per_unit',
    'created': Date.now(),
    'currency': 'usd',
    'livemode': false,
    'lookup_key': null,
    'metadata': {
      'charset': 'utf-8',
      'content': '15',
    },
    'nickname': null,
    'product': 'prod_BTdpcRLIUTfsFR',
    'recurring': {
      'aggregate_usage': null,
      'interval': 'week',
      'interval_count': 3,
      'usage_type': 'licensed',
    },
    'tax_behavior': 'unspecified',
    'tiers_mode': null,
    'transform_quantity': null,
    'type': 'recurring',
    'unit_amount': 444,
    'unit_amount_decimal': '444',
  },
  'quantity': 1,
  'subscription': 'sub_1Jebd02eZvKYlo2CnGvHpTeA',
  'tax_rates': [],
};

const STRIPE_SUBSCRIPTION_3 = {
  'id': 'si_KJE5hk210OzQLl',
  'object': 'subscription_item',
  'billing_thresholds': null,
  'created': Date.now(),
  'metadata': {},
  'price': {
    'id': '15',
    'object': 'price',
    'active': true,
    'billing_scheme': 'per_unit',
    'created': Date.now(),
    'currency': 'usd',
    'livemode': false,
    'lookup_key': null,
    'metadata': {
      'charset': 'utf-8',
      'content': '15',
    },
    'nickname': null,
    'product': 'prod_BTdpcRLIUTfsFR',
    'recurring': {
      'aggregate_usage': null,
      'interval': 'week',
      'interval_count': 3,
      'usage_type': 'licensed',
    },
    'tax_behavior': 'unspecified',
    'tiers_mode': null,
    'transform_quantity': null,
    'type': 'recurring',
    'unit_amount': 444,
    'unit_amount_decimal': '444',
  },
  'quantity': 1,
  'subscription': 'sub_1Jebd02eZvKYlo2CnGvHpTeA',
  'tax_rates': [],
};

const STRIPE_NEW_CUSTOMER = {
  // 'id': null,
  // // 'object': 'customer',
  // 'address': null,
  // 'balance': 0,
  // // 'created': Date.now(),
  // // 'currency': 'usd',
  // // 'default_source': null,
  // // 'delinquent': true,
  // 'description': 'New Customer',
  // 'discount': null,
  'email': null,
  // 'invoice_prefix': null,
  // 'invoice_settings': {
  // 'custom_fields': null,
  // 'default_payment_method': null,
  // 'footer': null,
  // },
  // // 'livemode': false,
  // 'metadata': {
  // 'order_id': null,
  // },
  // 'name': null,
  // 'next_invoice_sequence': null,
  // 'phone': null,
  // 'preferred_locales': [],
  // 'shipping': null,
  // 'tax_exempt': 'none',
  // 'test_clock': null,
};

const STRIPE_CUSTOMER_ENDPOINT = 'https://api.stripe.com/v1/customers';
const STRIPE_SUBSCRIPTION_ENDPOINT = 'https://api.stripe.com/v1/subscriptions';

// eslint-disable-next-line max-len
const STRIPE_SK_KEY = 'sk_test_51KgBVWJcXRHOrRKCAmzWEASyvdrmtSJrq5XwqIrv1qVSGLsSWhAddgGUiVrE0Z4eZCfyMtG3eXVV8VulE4Gk6rYN00qMiXQen8';

const HTTP_POST_OPTIONS = {
  'Method': 'POST',
  'Content-Type': 'application/json',
};

module.exports = {
  HTTP_POST_OPTIONS,
  STRIPE_NEW_CUSTOMER,
  STRIPE_CUSTOMER_ENDPOINT,
  STRIPE_SK_KEY,
  STRIPE_SUBSCRIPTION_ENDPOINT,
  STRIPE_SUBSCRIPTION_1,
  STRIPE_SUBSCRIPTION_2,
  STRIPE_SUBSCRIPTION_3,
};
