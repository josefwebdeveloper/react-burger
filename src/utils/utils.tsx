import React from "react";

export const getHeightFromDivToBottom = (containerRef:React.RefObject<any>) => {
  const rect = containerRef.current.getBoundingClientRect();
  return    window.innerHeight - rect.top-20;

}
export const getImageNameFromUrl=(url: string): string =>{
  // Extract the part of the URL after the last '/'
  const lastSlashIndex = url.lastIndexOf('/');
  let imageName = url.substring(lastSlashIndex + 1);

  // If there's a query string, remove it
  const queryParamIndex = imageName.indexOf('?');
  if (queryParamIndex !== -1) {
    imageName = imageName.substring(0, queryParamIndex);
  }

  return imageName;
}
export const isMobile = () => {
  // Regular expressions to test for different types of mobile devices
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  // Check if the navigator.userAgent matches with any of the mobile devices
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};
