# Congo (Amazon storefront clone)

## What is this

An experimental prototype to explore using React-table's headless API to build product displays supported by server-side queries.

- Integrated common e-commerce operations such as fuzzy search, filter, sort and pagination.
- Pure BFF architecture using Apollo server serving a JSON data file.
- Search function uses a weighted ngram fuzzy search algorithm.
- Added an infinite scroll style in addition to the pagination.
- All e-commerce operations uses Apollo Client which is a cache based Graphql Client, allowing us to efficiently enable infinite scroll etc.

### Conclusion:

For product grid displays, it is redundant to use React Table if all operations are server sided since none of the React Table APIs were used.
