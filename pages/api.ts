import { IndicatorsData, ForexData } from './types';


const API_DATA = {
    "buy_indicators": {
    "my_subscription": {
      "id": "38",
      "buy_indicators_id": "2",
      "user_id": "146709",
      "trading_view_id": "..",
      "enroll_by": "TGMAPP_MINIAPP29782972897998279",
      "status": "lifetime",
      "expiration_date": "0",
      "date_added": "1758385167"
    },
    "subscriptions": [
      {
        "id": "1",
        "name": "Yearly Subscription",
        "price": "150",
        "discounted_price": "100",
        "duration_in_months": "12",
        "date_added": "1720535759"
      },
      {
        "id": "2",
        "name": "Lifetime Subscription",
        "price": "350",
        "discounted_price": "200",
        "duration_in_months": "0",
        "date_added": "1720535777"
      }
    ]
  },
  "utility_trading_panels": {
    "my_subscription": {
      "id": "929",
      "trading_panel_id": "2",
      "user_id": "146709",
      "forex_addresses": "[\"11237841\"]",
      "enroll_by": "TGMAPP_MINIAPP29782972897998279",
      "status": "lifetime",
      "expiration_date": "0",
      "date_added": "1758385213"
    },
    "subscriptions": [
      {
        "id": "1",
        "name": "Yearly Subscription",
        "price": "150",
        "discounted_price": "100",
        "duration_in_months": "12",
        "date_added": "1692483664"
      },
      {
        "id": "2",
        "name": "Lifetime Subscription",
        "price": "500",
        "discounted_price": "250",
        "duration_in_months": "0",
        "date_added": "1692483677"
      },
      {
        "id": "4",
        "name": "Demo",
        "price": "0",
        "discounted_price": null,
        "duration_in_months": "0",
        "date_added": "1701071567"
      }
    ]
  }
};


export const fetchIndicatorsData = (): Promise<IndicatorsData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(API_DATA.buy_indicators as IndicatorsData);
        }, 1000); // Simulate 1 second network delay
    });
};

export const fetchForexData = (): Promise<ForexData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(API_DATA.utility_trading_panels as ForexData);
        }, 1000); // Simulate 1 second network delay
    });
};
