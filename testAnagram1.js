// An algorithm which tests whether one word y is an anagram of a word x by iterating the letters in x and removing them from y
function testAnagram(wordX, wordY) {
    let wordYArray = wordY.split('');
    for (let i = 0; i < wordX.length; i++) {
        let charX = wordX[i];
        let index = wordYArray.indexOf(charX);

        if (index !== -1) {
            wordYArray.splice(index, 1);
        } else {
            return false;
        }
    }

    return wordYArray.length === 0;
}

