import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getCountrySchema, getCountry } from './tools/get-country.js';
import { searchCountriesSchema, searchCountries } from './tools/search-countries.js';
import { searchCitiesSchema, searchCities } from './tools/search-cities.js';
import { listCitiesByCountrySchema, listCitiesByCountry } from './tools/list-cities-by-country.js';
import { compareCountriesSchema, compareCountries } from './tools/compare-countries.js';

/**
 * Wraps a tool handler to catch errors and return them as MCP-compliant
 * error content instead of crashing the server.
 */
function safeTool(fn: (args: any) => Promise<string>) {
  return async (args: any) => {
    try {
      const text = await fn(args);
      return { content: [{ type: 'text' as const, text }] };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: 'text' as const, text: `Error: ${message}` }],
        isError: true as const,
      };
    }
  };
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'bamwor-world-data',
    version: '0.1.2',
  });

  server.tool(
    'get_country',
    'Get detailed data about a country by name, slug, or ISO code. Returns population, area, capital, region, coordinates, and 20+ statistics.',
    getCountrySchema,
    safeTool(getCountry),
  );

  server.tool(
    'search_countries',
    'Search for countries by name or keyword, with optional region filter. Returns a list of matching countries with basic data.',
    searchCountriesSchema,
    safeTool(searchCountries),
  );

  server.tool(
    'search_cities',
    'Search for cities worldwide by name. Returns matching cities from a database of 13.4M cities with population and country.',
    searchCitiesSchema,
    safeTool(searchCities),
  );

  server.tool(
    'list_cities_by_country',
    'List cities in a specific country, sorted by population or name. Supports minimum population filter. Covers 13.4M cities globally.',
    listCitiesByCountrySchema,
    safeTool(listCitiesByCountry),
  );

  server.tool(
    'compare_countries',
    'Compare two countries side by side across all available metrics: population, area, GDP, HDI, life expectancy, and more.',
    compareCountriesSchema,
    safeTool(compareCountries),
  );

  return server;
}
