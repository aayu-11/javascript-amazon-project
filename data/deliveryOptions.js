import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";
}

function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
      return;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, "day");
    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}

export { deliveryOptions, getDeliveryOption, calculateDeliveryDate };
