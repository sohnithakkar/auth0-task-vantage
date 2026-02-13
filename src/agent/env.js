import dotenv from 'dotenv';
dotenv.config();

const str = (v, fallback = '') => {
    const s = (v ?? '').toString().trim();
    return s === '' ? fallback : s;
};
const int = (v, fallback) => {
    const n = parseInt(String(v ?? ''), 10);
    return Number.isFinite(n) ? n : fallback;
};

// Static configuration with sensible defaults
export const AGENT_PORT = int(process.env.AGENT_PORT, 3000);
export const AGENT_BASE_URL = str(process.env.AGENT_BASE_URL, `http://localhost:${AGENT_PORT}`);

// MCP service configuration
export const MCP_PORT = int(process.env.MCP_PORT, 8080);
export const MCP_BASE_URL = str(process.env.MCP_BASE_URL, `http://localhost:${MCP_PORT}`);
export const MCP_AUTH0_AUDIENCE = str(process.env.MCP_AUTH0_AUDIENCE);

// Auth0 configuration (required for authentication)
export const AUTH0_DOMAIN = str(process.env.AUTH0_DOMAIN);
export const AGENT_AUTH0_CLIENT_ID = str(process.env.AGENT_AUTH0_CLIENT_ID);
export const AGENT_AUTH0_CLIENT_SECRET = str(process.env.AGENT_AUTH0_CLIENT_SECRET);
export const AGENT_SESSION_SECRET = str(process.env.AGENT_SESSION_SECRET);

// LLM configuration (LiteLLM via OpenAI-compatible API)
// Supports LITELLM_KEY from shell environment or OPENAI_API_KEY from .env
export const OPENAI_API_KEY = str(process.env.LITELLM_KEY || process.env.OPENAI_API_KEY);
export const OPENAI_BASE_URL = str(process.env.OPENAI_BASE_URL);
export const OPENAI_MODEL = str(process.env.OPENAI_MODEL, 'gpt-4o');

// Auth detection following pattern from other services
export const AUTH_ENABLED = !!(AUTH0_DOMAIN &&
  AGENT_AUTH0_CLIENT_ID &&
  AGENT_AUTH0_CLIENT_SECRET &&
  AGENT_BASE_URL &&
  AGENT_SESSION_SECRET);

