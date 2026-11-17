/** @format */

export const availability = {
  // Діапазон дат коли доставка недоступна (залиш порожнім якщо немає обмежень)
  deliveryClosedFrom: "2026-08-19", // 'YYYY-MM-DD', напр. '2026-08-01'
  deliveryClosedTo: "2026-08-27", // 'YYYY-MM-DD', напр. '2026-08-15'

  // Найраніший час доставки (завжди за варшавським часом, lib/orderTime.ts):
  // зараз + deliveryLeadHours, хвилини вгору до deliveryRoundMinutes;
  // з deliveryLastOrderHour і пізніше — на deliveryFirstHour:00 наступного дня;
  // раніше за deliveryFirstHour:00 — на deliveryFirstHour:00 того ж дня.
  deliveryLeadHours: 5,
  deliveryRoundMinutes: 15,
  deliveryLastOrderHour: 18,
  deliveryFirstHour: 9,

  // Самовивіз: найраніше зараз + pickupLeadHours (без інших правил).
  pickupLeadHours: 5,

  // Повне закриття (доставка І самовивіз) — показує банер
  fullyClosed: false,
  closedMessage: "Przerwa urlopowa. Wracamy wkrótce!",
};
