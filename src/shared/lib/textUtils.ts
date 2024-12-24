let tempElement: HTMLDivElement | null = null;

export const measureTextWidth = (text: string, font: string): number => {
  if (!tempElement) {
    tempElement = document.createElement("div");
    tempElement.style.position = "absolute";
    tempElement.style.visibility = "hidden";
    tempElement.style.whiteSpace = "nowrap";
    tempElement.style.width = "auto";
    tempElement.style.height = "auto";
    document.body.appendChild(tempElement);
  }

  tempElement.style.font = font;
  tempElement.textContent = text;

  return tempElement.clientWidth;
};

export const hideText = (
  text: string,
  maxWidth: number,
  font: string
): string => {
  const currentWidth = measureTextWidth(text, font);

  if (currentWidth <= maxWidth) {
    return text;
  }

  let left = 0;
  let right = text.length;
  let croppedText = text;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    croppedText = text.slice(0, mid);

    if (measureTextWidth(croppedText, font) <= maxWidth) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return `${croppedText.slice(0, right)}...`;
};
