export const emit = (eventType, eventData = null) => {
  return new CustomEvent(eventType, {
    bubbles: true,
    detail: eventData,
  });
};
