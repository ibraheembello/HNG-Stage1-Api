export const determineAgeGroup = (age: number): string => {
  if (age >= 0 && age <= 12) return "child";
  if (age >= 13 && age <= 19) return "teenager";
  if (age >= 20 && age <= 59) return "adult";
  return "senior";
};

export const getTopCountry = (
  countries: { country_id: string; probability: number }[],
) => {
  if (!countries || countries.length === 0) return null;

  // Loops through the array and returns the object with the highest probability
  return countries.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current,
  );
};
