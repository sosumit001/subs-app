import Stripe from "stripe";

export const stripe = new Stripe('sk_test_51Nqv0kSDog9gAZs73MT7xsExoG9Ekm2ddtY9goasbkNxwl3WTvujNxz20qoERD0TH147i0BD2V0C0b2jBdhXIw6o00uYXhnDRU', {
  apiVersion: "2023-08-16",
  typescript: true,
});