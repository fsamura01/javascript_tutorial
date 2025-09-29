# **Shortest Distance to Character Algorithm Flowchart**

I'll create a Mermaid flowchart that visualizes the algorithm for the `shortestToChar` function.

The flowchart I've created visualizes how the `shortestToChar` function works. This algorithm finds the shortest distance from each position in a string to a given character. Let me explain the key parts:

1. First, the algorithm initializes an array called `answer` filled with `Infinity` values. This array will eventually hold the shortest distances.

2. The algorithm makes two passes through the string:
   - A left-to-right pass that finds the closest occurrence of the character to the left
   - A right-to-left pass that finds the closest occurrence to the right and takes the minimum distance

3. During the left-to-right pass:
   - The algorithm starts with `prev = -Infinity` (representing no occurrence yet)
   - For each character in the string, it checks if it matches the target character
   - If it matches, it updates `prev` to the current position
   - It then calculates the distance from the current position to the most recent occurrence

4. During the right-to-left pass:
   - The algorithm starts with `prev = Infinity` (representing no occurrence yet)
   - It performs similar steps as the left-to-right pass
   - For each position, it takes the minimum of the previously calculated distance and the new distance

5. Finally, it returns the `answer` array containing the shortest distances.

This two-pass approach ensures that for each position, we find the minimum distance to the target character, whether it appears to the left or right of that position.
