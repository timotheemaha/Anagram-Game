function buildLetterCount(word) {
    let letterCount = {};

    for (let i = 0; i < word.length; i++) {
        const char = word[i];

        if (letterCount[char] === undefined) {
            letterCount[char] = 1;
        } else {
            letterCount[char]++;
        }
    }

    return letterCount;
}

function testAnagram2(wordX, wordY) {
    const letterCountX = buildLetterCount(wordX);
    const letterCountY = buildLetterCount(wordY);

    // Compare the letter counts
    for (const char in letterCountX) {
        if (letterCountX[char] !== letterCountY[char]) {
            return false; // Different letter counts, not anagrams
        }
    }

    return true; // All letter counts match, anagrams
}
