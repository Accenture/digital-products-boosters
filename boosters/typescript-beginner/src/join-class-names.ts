let joinClassNames = (
  classNames: (string | undefined)[],
): string | undefined => {
  let classNamesFiltered = classNames.filter(
    (value): boolean => value !== undefined,
  );

  return classNamesFiltered.length ? classNamesFiltered.join(" ") : undefined;
};

export { joinClassNames };
