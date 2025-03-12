import React from 'react';
import { r } from 'react-router/dist/development/fog-of-war-CCAcUMgB';

interface ShiftArrayProps {
  arrayLength: number;
  viewport: number;
  shift: number;
}

// Function to create an array of length `arrayLength`
const createArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i + 1); // Generates an array [1, 2, 3, ..., length]
};

// Function to perform the shift on the array
const shiftArray = (arr: number[], shiftValue: number): number[] => {
  return [...arr.slice(shiftValue), ...arr.slice(0, shiftValue)];
};

// Function to check if the shift will wrap the array properly
export const checkUnevenSets = (arrayLength: number, shiftValue: number, viewportSize: number): boolean => {
  const arr = createArray(arrayLength);
  let currentArray = [...arr];
  const originalArray = [...arr];
  
  const totalLength = arr.length;
  
  // To handle the chunks as defined by the viewport size
  const chunks = (arr: number[], size: number): number[][] => {
    let chunked: number[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  // Check if the shift divides the array length properly
  if (totalLength % shiftValue !== 0) {
    // return "Uneven: shift does not divide evenly into the array."; // If shift doesn't divide evenly into the array
    return true
  }

  // Loop to simulate shifting and see if we return to the original array
  let iterations = 0;
  do {
    currentArray = shiftArray(currentArray, shiftValue);
    iterations++;

    const chunkedArray = chunks(currentArray, viewportSize);
    // console.log("Iteration:", iterations, "Chunked Array:", chunkedArray);

    // If after any shift the array is back to the original, we stop
    if (JSON.stringify(currentArray) === JSON.stringify(originalArray)) {
    //   return "Shift is perfect and array returns to original.";
        return false
        
    }

    // If the shift happens too many times without wrapping properly, break out
    if (iterations > totalLength) {
      break;
    }

  } while (true);

//   return "Uneven: shift does not return to original.";
  return true
};


export function getVacantElements(totalItems: number, viewportSize: number, scrollStep: number): number {
  let vacant = 0;
  let i = 0;

  // Find the last valid start index
  while (i + viewportSize < totalItems) {
      i += scrollStep;
  }

  // Remaining elements in the last group
  let lastGroupSize = totalItems - i;

  if (lastGroupSize < viewportSize) {
      vacant = viewportSize - lastGroupSize;
  }

  return vacant;
}