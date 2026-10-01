import {
  getDestinationsByType,
  getDestinationTypeBySlug,
} from "../wordpress/destination";

export async function getDestinationsPageData() {
  const countryType = await getDestinationTypeBySlug("country");
  const countries = await getDestinationsByType(countryType[0].id);

  return {
    countries: countries,
  };
}
