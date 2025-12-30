/**
 * Formats a string to Title Case, handling UNIFESP menu specifics.
 * @param {string} str - The string to format.
 * @returns {string} - The formatted string.
 */
export const formatMenuString = (str) => {
    if (!str || typeof str !== 'string') return '';

    // Remove excessive whitespace
    let clean = str.replace(/\s+/g, ' ').trim();

    // If it's a known abbreviation or case that should stay UPPER, handle it
    // Otherwise, convert to Title Case
    const words = clean.toLowerCase().split(' ');

    const formattedwords = words.map(word => {
        // Keep short prepositions lowercase
        const prepositions = ['de', 'da', 'do', 'dos', 'das', 'com', 'c/', '&', 'ao', 'a', 'na', 'no'];
        if (prepositions.includes(word)) return word;

        // Capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Ensure first word is always capitalized
    if (formattedwords.length > 0) {
        formattedwords[0] = formattedwords[0].charAt(0).toUpperCase() + formattedwords[0].slice(1);
    }

    return formattedwords.join(' ');
};

/**
 * Specifically handles the capitalization of lists like salads.
 * @param {string[]} list - Array of strings.
 * @returns {string} - Combined formatted string.
 */
export const formatMenuList = (list) => {
    if (!list || !Array.isArray(list)) return '';
    return list.map(item => formatMenuString(item)).join(', ');
};
