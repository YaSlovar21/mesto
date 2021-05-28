export function renderLoading(boolOnLoading, buttonElement, textDefault, textOnLoading) {
  if (boolOnLoading) {
    buttonElement.textContent = textOnLoading;
  } else {
    buttonElement.textContent = textDefault;
  }
}