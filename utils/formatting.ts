import capitalize from "lodash/capitalize";

const enumToOptions = (enumType: any, lowercase?: boolean) =>
  Object.keys(enumType).map((key) => ({
    value: enumType[key],
    label: lowercase
      ? (enumType[key].replace(/_/g, " ") as string).toLowerCase()
      : capitalize(enumType[key].replace(/_/g, " ") as string),
  }));

export default enumToOptions;
