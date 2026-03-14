# bamwor-mcp-server

**World Geographic Data for AI Agents** — MCP server providing structured access to 261 countries and 13.4M cities worldwide.

Built on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io) for seamless integration with Claude Desktop, Cursor, Windsurf, and any MCP-compatible client.

## Why Bamwor?

| Source | Cities | Countries | Multilingual | API |
|--------|--------|-----------|-------------|-----|
| REST Countries | 0 | 250 | Yes | Free |
| CountryStateCity | 151K | 250 | No | No |
| API Ninjas | 5M | — | No | Paid |
| **Bamwor** | **13.4M** | **261** | **4 languages** | **Free + Paid** |

## Quick Start

### 1. Get a free API key

Register at [bamwor.com/developers/quickstart](https://bamwor.com/developers/quickstart) — takes 30 seconds.

### 2. Configure your MCP client

#### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bamwor-world-data": {
      "command": "npx",
      "args": ["-y", "bamwor-mcp-server"],
      "env": {
        "BAMWOR_API_KEY": "bw_live_your_key_here"
      }
    }
  }
}
```

#### Cursor / Windsurf

Add to your MCP settings:

```json
{
  "bamwor-world-data": {
    "command": "npx",
    "args": ["-y", "bamwor-mcp-server"],
    "env": {
      "BAMWOR_API_KEY": "bw_live_your_key_here"
    }
  }
}
```

### 3. Start using it

Ask your AI assistant things like:
- "What is the population of Brazil?"
- "List the 10 largest cities in India"
- "Compare Japan and South Korea"
- "Search for cities named Springfield"
- "Which countries are in Africa?"

## Available Tools

### `get_country`
Get detailed data about a country including population, area, capital, region, coordinates, and 20+ statistics.

**Input:** `{ query: "Brazil" }` — accepts name, slug, or ISO code

### `search_countries`
Search for countries by name or keyword with optional region filter.

**Input:** `{ query: "south", region: "Americas", limit: 10 }`

### `search_cities`
Search for cities worldwide by name from a database of 13.4M cities.

**Input:** `{ query: "Tokyo", limit: 10 }`

### `list_cities_by_country`
List cities in a specific country, sorted by population or name.

**Input:** `{ country: "germany", min_population: 500000, limit: 20 }`

### `compare_countries`
Compare two countries side by side across all available metrics.

**Input:** `{ country_a: "France", country_b: "Germany" }`

## Docker (Isolated Setup)

For containerized deployment:

```bash
cd mcp/
cp .env.example .env
# Edit .env and add your BAMWOR_API_KEY

docker compose build
docker compose run --rm -i bamwor-mcp
```

The Docker setup is **100% isolated** — it creates its own network, exposes no ports, shares no volumes, and communicates only via the public Bamwor API over HTTPS.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BAMWOR_API_KEY` | Yes | Your Bamwor API key |
| `BAMWOR_API_URL` | No | Override API URL (default: `https://bamwor.com/api/v1`) |

## Rate Limits

Depends on your API plan:

| Plan | Requests/min | Requests/day | Price |
|------|-------------|-------------|-------|
| Free | 30 | 1,000 | $0 |
| Pro | 60 | 10,000 | $19.99/mo |
| Premium | 300 | 50,000 | $39.99/mo |

Register for a free key at [bamwor.com/developers/quickstart](https://bamwor.com/developers/quickstart).

## Data Sources

- **Countries:** CIA World Factbook, UN, World Bank — 261 countries and territories
- **Cities:** GeoNames — 13.4M populated places with coordinates, population, timezone, elevation
- **Statistics:** 20+ metrics per country (GDP, HDI, life expectancy, literacy, and more)

## Links

- [Bamwor API Documentation](https://bamwor.com/en/developers/docs)
- [API Pricing](https://bamwor.com/en/developers/pricing)
- [Bamwor Website](https://bamwor.com)

## License

MIT
