/* eslint-disable no-plusplus */
const fuzzyObjectKeySearch = (
  searchKey: string,
  dict: Array<object>,
  keyToSearch: string,
  cutOffWeight = 0.3
) => {
  const kFactor = 2;
  const getWeight = (str: string) => {
    const normStr =
      " ".repeat(kFactor - 1) + str.toLowerCase() + " ".repeat(kFactor - 1);
    const v = new Array(normStr.length - kFactor + 1);
    for (let i = 0; i < v.length; i++) {
      v[i] = normStr.slice(i, i + kFactor);
    }
    return v;
  };

  return dict.filter((obj) => {
    const valueToSearch = obj[keyToSearch];
    if (!searchKey?.length || !valueToSearch?.length) {
      return false;
    }

    const s1 =
      searchKey.length < valueToSearch.length ? searchKey : valueToSearch;
    const s2 =
      searchKey.length < valueToSearch.length ? valueToSearch : searchKey;

    const pairs1 = getWeight(s1);
    const pairs2 = getWeight(s2);
    const set = new Set<string>(pairs1);

    const total = pairs2.length;
    let hits = 0;
    pairs2.forEach((item) => {
      if (set.delete(item)) {
        hits++;
      }
    });
    return hits / total > cutOffWeight;
  });
};

export default fuzzyObjectKeySearch;
