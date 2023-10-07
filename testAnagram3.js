// An algorithm which tests whether one word y is an anagram of a word x by putting the letters in the two words in order
function testAnagram3(wordX, wordY) {
    wordXArray = wordX.split("");
    wordYArray = wordY.split("");
    wordXArray.sort();
    wordYArray.sort();
    if (wordXArray.join() === wordYArray.join()) {
        return true
    } else {
        return false
    }

}