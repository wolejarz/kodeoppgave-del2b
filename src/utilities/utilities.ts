import { displayDirection } from "./constants";

export const getDisplayDirection = (currentDirection: displayDirection) => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  // console.log("aspectRatio", aspectRatio);
  if (aspectRatio > 1.1 && currentDirection === displayDirection.vertical) {
    return displayDirection.horizontal;
  } else if (aspectRatio < 0.9 && currentDirection === displayDirection.horizontal) {
    return displayDirection.vertical;
  }
  return currentDirection;
};
