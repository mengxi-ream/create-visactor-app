// validate if the input string is the type AvailableLibraries

import { AvailableLibraries, availableLibraries } from "~/installers/index.js";

export const LibraryErrorMessage =
  "Invalid library. Please choose from the following: " +
  availableLibraries.join(", ");

export const validateLibrary = (value: string): boolean => {
  return availableLibraries.includes(value as AvailableLibraries);
};
