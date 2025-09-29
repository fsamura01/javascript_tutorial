/**
 * @param {string} name - The original name to be typed
 * @param {string} typed - The actually typed string
 * @return {boolean} - Whether typed could have been created by long-pressing name
 */
function isLongPressedName(name, typed) {
  // Initialize pointers for both strings
  let namePointer = 0;
  let typedPointer = 0;

  // Process both strings
  while (typedPointer < typed.length) {
    // Case 1: Characters match - advance both pointers
    if (
      namePointer < name.length &&
      name[namePointer] === typed[typedPointer]
    ) {
      namePointer++;
      typedPointer++;
    }
    // Case 2: Long-pressed key - check if it matches previous character
    else if (
      typedPointer > 0 &&
      typed[typedPointer] === typed[typedPointer - 1]
    ) {
      typedPointer++;
    }
    // Case 3: No match possible
    else {
      return false;
    }
  }

  // Verify we've used all characters in name
  return namePointer === name.length;
}
