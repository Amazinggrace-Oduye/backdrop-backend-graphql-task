### In 100 words or less, provide an answer to this in your readme: What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

# Answer

The pure Levenshtein Distance algorithm is a more effective solution than the broader Damerau-Levenshtein Distance algorithm. In this specific scenario of inputting bank account names and numbers, errors are more likely to be the result of substitutions, deletions, or insertions. Thus, the pure Levenshtein Distance algorithm, which only considers these three types of errors, is more efficient and accurate. However, the broader Damerau-Levenshtein algorithm additionally takes into account transpositions of adjacent characters, which is likely not a common error that could occur in human input. The damerau-Levenshtein Distance algorithm is appropriate when dealing with generic misspellings errors.

# Assumptions

- Users enter their names with a single space in this order firstname middlename lastname.
- User enter middle name if registered with their bank 
- User in DB is identified by ID.
- .env was added for access to hosted database and ease of testing.
