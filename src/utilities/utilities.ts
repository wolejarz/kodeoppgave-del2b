import { displayDirection } from "./constants";

export const getDisplayDirection = (currentDirection: displayDirection) => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  if (aspectRatio > 1.25 && currentDirection === displayDirection.vertical) {
    return displayDirection.horizontal;
  } else if (aspectRatio < 0.75 && currentDirection === displayDirection.horizontal) {
    return displayDirection.vertical;
  }
  return currentDirection;
};
