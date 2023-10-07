export const releaseYear = (releaseDate) => {
  const year = releaseDate?.split("-");
  if (year) {
    return year[0];
  } else {
    return null;
  }
};
