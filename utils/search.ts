const fuzzyObjectKeySearch = (
  searchKey: string,
  dict: Array<object>,
  keyToSearch: string
) => {
  const words = searchKey.toLowerCase().split(" ");
  return dict.filter((obj) => {
    const normalisedTerm = obj[keyToSearch].toLowerCase();
    return words.every((word) => normalisedTerm.indexOf(word) > -1);
  });
};

export default fuzzyObjectKeySearch;
