const levenshtein = (a, b)=>{
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(
            matrix[i - 1][j] + 1,     // delete
            matrix[i][j - 1] + 1,     // insert
            matrix[i - 1][j - 1] + 1  // replace
          );
    }
  }

  return matrix[a.length][b.length];
}

// Main function to suggest closest string
const suggest = (input, options = [], threshold = 3) => {
  if (!input || options.length === 0) return null;

  let closest = null;
  let minDistance = Infinity;

  for (const option of options) {
    const dist = levenshtein(input.toLowerCase(), option.toLowerCase());
    if (dist < minDistance && dist <= threshold) {
      minDistance = dist;
      closest = option;
    }
  }

  return closest;
}

// Function to get top N closest suggestions
const getSuggestions = (input, options = [], limit = 3) => {
  const scored = options.map(opt => ({
    word: opt,
    score: levenshtein(input.toLowerCase(), opt.toLowerCase())
  }));

  return scored
    .sort((a, b) => a.score - b.score)
    .filter(item => item.score <= 3)
    .slice(0, limit)
    .map(item => item.word);
}


export {
  suggest,
  getSuggestions
};
