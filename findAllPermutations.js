function findAllPermutations(word) {
    let allPermutations = [];
    let permutation;
    
    for (let i = 0; i < word.length; i++) {
        let char = word[i];
        let remainingChars = word.slice(0, i) + word.slice(i + 1); // Remove the current char
        
        for (let j = 0; j < remainingChars.length; j++) {
            permutation = remainingChars.slice(0, j) + char + remainingChars.slice(j); // inserting char at position j within remainingChars
            if (!allPermutations.includes(permutation)) {
                allPermutations.push(permutation);
            } else {
                continue
            }
        }
    }


    return allPermutations
}