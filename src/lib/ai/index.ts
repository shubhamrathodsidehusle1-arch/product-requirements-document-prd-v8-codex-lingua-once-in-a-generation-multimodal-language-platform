export type ProviderName = "openai" | "anthropic" | "openrouter" | "kilocode";

export interface AIConfig {
  provider: ProviderName;
  model: string;
  apiKey?: string;
  baseURL?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  provider: ProviderName;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface TTSRequest {
  text: string;
  voice?: string;
  language?: string;
}

export interface TTSResponse {
  audioUrl?: string;
  audioBase64?: string;
}

export interface STTRequest {
  audioUrl?: string;
  audioBase64?: string;
}

export interface STTResponse {
  text: string;
  language?: string;
}

abstract class AIProvider {
  abstract chat(messages: ChatMessage[], config: AIConfig): Promise<ChatResponse>;
  abstract getAvailableModels(): string[];
  
  getEnvApiKey(): string | undefined {
    return process.env.AI_API_KEY;
  }
}

class OpenAIProvider extends AIProvider {
  private client: any;

  private getClient(apiKey: string, baseURL?: string) {
    const { OpenAI } = require("openai");
    return new OpenAI({ 
      apiKey, 
      baseURL: baseURL || process.env.OPENAI_BASE_URL 
    });
  }

  async chat(messages: ChatMessage[], config: AIConfig): Promise<ChatResponse> {
    const apiKey = config.apiKey || this.getEnvApiKey() || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key required");
    }

    const client = this.getClient(apiKey, config.baseURL);
    const model = config.model || "gpt-4o";

    const response = await client.chat.completions.create({
      model,
      messages,
      max_tokens: config.maxTokens || 4096,
      temperature: config.temperature || 0.7,
    });

    return {
      content: response.choices[0].message.content,
      model: response.model,
      provider: "openai",
      usage: {
        inputTokens: response.usage?.prompt_tokens || 0,
        outputTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  }

  getAvailableModels(): string[] {
    return [
      "gpt-4o",
      "gpt-4o-mini", 
      "gpt-4-turbo",
      "gpt-3.5-turbo",
      "o1-preview",
      "o1-mini",
    ];
  }
}

class AnthropicProvider extends AIProvider {
  private client: any;

  private getClient(apiKey: string) {
    const { Anthropic } = require("@anthropic-ai/sdk");
    return new Anthropic({ 
      apiKey,
      maxTokens: 4096,
    });
  }

  async chat(messages: ChatMessage[], config: AIConfig): Promise<ChatResponse> {
    const apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("Anthropic API key required");
    }

    const client = this.getClient(apiKey);
    const model = config.model || "claude-sonnet-4-20250514";

    const systemMessage = messages.find(m => m.role === "system");
    const userMessages = messages.filter(m => m.role !== "system");

    const response = await client.messages.create({
      model,
      max_tokens: config.maxTokens || 4096,
      temperature: config.temperature || 0.7,
      system: systemMessage?.content,
      messages: userMessages.map(m => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    return {
      content: response.content[0].text,
      model: response.model,
      provider: "anthropic",
    };
  }

  getAvailableModels(): string[] {
    return [
      "claude-sonnet-4-20250514",
      "claude-4-opus-20250514",
      "claude-4-sonnet-20250514",
      "claude-3-5-sonnet-20240620",
      "claude-3-opus-20240229",
      "claude-3-haiku-20240307",
    ];
  }
}

class OpenRouterProvider extends AIProvider {
  async chat(messages: ChatMessage[], config: AIConfig): Promise<ChatResponse> {
    const apiKey = config.apiKey || process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OpenRouter API key required");
    }

    const model = config.model || "openai/gpt-4o";
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Codex Lingua",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: config.maxTokens || 4096,
        temperature: config.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      model: data.model,
      provider: "openrouter",
    };
  }

  getAvailableModels(): string[] {
    return [
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "anthropic/claude-3.5-sonnet",
      "google/gemini-pro-1.5",
      "meta-llama/llama-3.1-70b-instruct",
      "mistralai/mistral-large",
    ];
  }
}

class KiloCodeProvider extends AIProvider {
  private baseURL: string;

  constructor() {
    super();
    this.baseURL = process.env.KILOCODE_API_URL || "https://api.kilo.chat/v1";
  }

  async chat(messages: ChatMessage[], config: AIConfig): Promise<ChatResponse> {
    const apiKey = config.apiKey || process.env.KILOCODE_API_KEY;
    if (!apiKey) {
      throw new Error("KiloCode API key required");
    }

    const model = config.model || "kilo-auto/free";
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: config.maxTokens || 4096,
        temperature: config.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`KiloCode API error: ${error}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      model: data.model,
      provider: "kilocode",
    };
  }

  async generateText(prompt: string, config?: Partial<AIConfig>): Promise<ChatResponse> {
    return this.chat([
      { role: "user", content: prompt }
    ], {
      provider: "kilocode",
      model: config?.model || "kilo-auto/free",
      apiKey: config?.apiKey,
      maxTokens: config?.maxTokens,
      temperature: config?.temperature,
    });
  }

  getAvailableModels(): string[] {
    return [
      "kilo-auto/free",
      "kilo-plus/premium",
    ];
  }
}

const providers: Record<ProviderName, AIProvider> = {
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  openrouter: new OpenRouterProvider(),
  kilocode: new KiloCodeProvider(),
};

export async function sendChatMessage(
  messages: ChatMessage[],
  config: AIConfig
): Promise<ChatResponse> {
  const provider = providers[config.provider];
  if (!provider) {
    throw new Error(`Unknown provider: ${config.provider}`);
  }

  return provider.chat(messages, config);
}

export function getProviderModels(provider: ProviderName): string[] {
  return providers[provider].getAvailableModels();
}

export function getDefaultProvider(): ProviderName {
  const envProvider = process.env.DEFAULT_AI_PROVIDER as ProviderName;
  if (envProvider && providers[envProvider]) {
    return envProvider;
  }
  return "kilocode";
}

export function hasApiKey(provider: ProviderName): boolean {
  switch (provider) {
    case "openai":
      return !!process.env.OPENAI_API_KEY;
    case "anthropic":
      return !!process.env.ANTHROPIC_API_KEY;
    case "openrouter":
      return !!process.env.OPENROUTER_API_KEY;
    case "kilocode":
      return !!process.env.KILOCODE_API_KEY;
    default:
      return false;
  }
}

export function getAvailableProviders(): ProviderName[] {
  const available: ProviderName[] = [];
  
  for (const [name, provider] of Object.entries(providers)) {
    if (hasApiKey(name as ProviderName) || name === "kilocode") {
      available.push(name as ProviderName);
    }
  }
  
  return available.length > 0 ? available : ["kilocode"];
}