import { NextResponse } from "next/server";
import { sendChatMessage, getAvailableProviders, getProviderModels, hasApiKey, getDefaultProvider, type ProviderName } from "@/lib/ai";

export async function GET() {
  try {
    const providers = getAvailableProviders();
    
    const providerInfo = await Promise.all(
      providers.map(async (provider) => {
        const models = getProviderModels(provider);
        const hasKey = hasApiKey(provider);
        
        return {
          name: provider,
          displayName: provider.charAt(0).toUpperCase() + provider.slice(1),
          available: hasKey,
          models: models.slice(0, 3),
          defaultModel: models[0],
        };
      })
    );

    return NextResponse.json({
      providers: providerInfo,
      defaultProvider: getDefaultProvider(),
    });
  } catch (error) {
    console.error("Error fetching AI info:", error);
    return NextResponse.json({ error: "Failed to fetch AI info" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, provider, model, temperature, maxTokens } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages array required" }, { status: 400 });
    }

    const aiProvider = provider || getDefaultProvider();
    
    const response = await sendChatMessage(messages, {
      provider: aiProvider,
      model: model || getProviderModels(aiProvider)[0],
      maxTokens: maxTokens || 2048,
      temperature: temperature || 0.7,
    });

    return NextResponse.json({
      content: response.content,
      model: response.model,
      provider: response.provider,
      usage: response.usage,
    });
  } catch (error: any) {
    console.error("Error in AI completion:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to get AI response" 
    }, { status: 500 });
  }
}