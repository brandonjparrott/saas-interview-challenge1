/**
 * Returns true if the string is a palindrome
 */
export function isPalindrome(str: string): boolean {
    const reversed = str.split('').reverse().join('');
    return reversed === str;
}