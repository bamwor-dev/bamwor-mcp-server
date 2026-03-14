import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCountrySchema, getCountry } from './tools/get-country.js';
import { searchCountriesSchema, searchCountries } from './tools/search-countries.js';
import { searchCitiesSchema, searchCities } from './tools/search-cities.js';
import { listCitiesByCountrySchema, listCitiesByCountry } from './tools/list-cities-by-country.js';
import { compareCountriesSchema, compareCountries } from './tools/compare-countries.js';

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'bamwor-world-data',
    version: '0.1.0',
  });

  /* ------------------------------------------------------------------ */
  /*  Tool 1: get_country                                                */
  /* ------------------------------------------------------------------ */
  server.tool(
    'get_country',
    'Get detailed data about a country by name, slug, or ISO code. Returns population, area, capital, region, coordinates, and 20+ statistics.',
    getCountrySchema,
    async (args) => {
      const text = await getCountry(args);
      return { content: [{ type: 'text' as const, text }] };
    },
  );

  /* ------------------------------------------------------------------ */
  /*  Tool 2: search_countries                                           */
  /* ------------------------------------------------------------------ */
  server.tool(
    'search_countries',
    'Search for countries by name or keyword, with optional region filter. Returns a list of matching countries with basic data.',
    searchCountriesSchema,
    async (args) => {
      const text = await searchCountries(args);
      return { content: [{ type: 'text' as const, text }] };
    },
  );

  /* ------------------------------------------------------------------ */
  /*  Tool 3: search_cities                                              */
  /* ------------------------------------------------------------------ */
  server.tool(
    'search_cities',
    'Search for cities worldwide by name. Returns matching cities from a database of 13.4M cities with population and country.',
    searchCitiesSchema,
    async (args) => {
      const text = await searchCities(args);
      return { content: [{ type: 'text' as const, text }] };
    },
  );

  /* ------------------------------------------------------------------ */
  /*  Tool 4: list_cities_by_country                                     */
  /* ------------------------------------------------------------------ */
  server.tool(
    'list_cities_by_country',
    'List cities in a specific country, sorted by population or name. Supports minimum population filter. Covers 13.4M cities globally.',
    listCitiesByCountrySchema,
    async (args) => {
      const text = await listCitiesByCountry(args);
      return { content: [{ type: 'text' as const, text }] };
    },
  );

  /* ------------------------------------------------------------------ */
  /*  Tool 5: compare_countries                                          */
  /* ------------------------------------------------------------------ */
  server.tool(
    'compare_countries',
    'Compare two countries side by side across all available metrics: population, area, GDP, HDI, life expectancy, and more.',
    compareCountriesSchema,
    async (args) => {
      const text = await compareCountries(args);
      return { content: [{ type: 'text' as const, text }] };
    },
  );

  return server;
}
