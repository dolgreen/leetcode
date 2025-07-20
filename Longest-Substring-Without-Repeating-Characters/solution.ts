// the simple solution O(n^2)
function lengthOfLongestSubstring(s: string): number {
  let longestStringCounter: number = 0;
  let currentStringCounter: number = 0;
  const duplicatCharArray: string[] = [];
  for (let i = 0; i < s.length; i++) {
    const currentChar = s.charAt(i);
    if (duplicatCharArray.includes(currentChar)) {
      duplicatCharArray.length = 0;
      if (currentStringCounter > longestStringCounter) {
        longestStringCounter = currentStringCounter;
      }
      currentStringCounter = 0;
      continue;
    } else {
      currentStringCounter++;
      duplicatCharArray.push(currentChar);
    }
  }
  if (currentStringCounter > longestStringCounter) {
    longestStringCounter = currentStringCounter;
  }

  return longestStringCounter;
}

// the simple solution after refactoring O(n^2)
function lengthOfLongestSubstringRefactor(s: string): number {
  let longest = 0;
  let current = 0;
  const seen: string[] = [];

  for (const char of s) {
    if (seen.includes(char)) {
      seen.length = 0;
      longest = Math.max(longest, current);
      current = 0;
    } else {
      seen.push(char);
      current++;
    }
  }

  return Math.max(longest, current);
}

// more complex solution O(n)
function lengthOfLongestSubstringComplex(s: string): number {
  let maxLen = 0;
  let start = 0;
  const seen = new Map<string, number>();

  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    if (seen.has(char) && seen.get(char)! >= start) {
      start = seen.get(char)! + 1;
    }
    seen.set(char, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }

  return maxLen;
}
