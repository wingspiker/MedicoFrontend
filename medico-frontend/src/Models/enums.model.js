// export const occupationsEnum = {
//     DOCTOR : 'Doctor',
//     MEDICAL_OWNER : 'Medical Owner',
// }

// export const degreesEnum = {
//     DOCTOR : 'Doctor',
//     MEDICAL_OWNER : 'Medical Owner',
// }

export const chargesTypeEnum = {
  SUBSCRIPTION:0,
  PERCENTAGE:1
};

export const productTypeEnum = {
  CAPSULE: "Capsule",
  TABLET: "Tablet",
};

export const prescriptionEnum = {
  RX: "Rx",
  NRX: "nRx",
  G: "G",
};

export const pricingPreferenceEnum = {
  DISCOUNT: "Discount on MRP",
  MARGIN: "Margin on Retail Price",
};

export const subscriptionTypeEnum = {
  PERMONTH_3000: "Monthly Plan",
  PERSIXMONTH_15000: "Six Monthly Plan",
  PERYEAR_25000: "Annual Plan",
};

export const EffectivePriceCalculationTypeEnum = {
  DiscountOnMRP: "Discount on MRP",
  MarginOnSellingPrice: "Margin on selling price",
};

export const priceCentricOfferSubTypeEnum = {
  OrderAmount: "Based on Order Amount",
  OrderHistory: "Based on Order History",
};

export const paymentStatus = {
  Pending: 1,
  Paid: 2,
  Verified: 3,
  Failed: 4,
};

export const OrderStatus = {
  Pending: 1,
  Confirmed: 2,
  Shipped: 3,
  Delivered: 5,
  Cancelled: 4,
  Returned: 6,
};
