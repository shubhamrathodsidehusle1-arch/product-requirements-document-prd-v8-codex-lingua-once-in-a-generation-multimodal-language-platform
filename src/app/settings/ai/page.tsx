import { getAvailableProviders, getProviderModels, getDefaultProvider } from "@/lib/ai";

export const dynamic = "force-dynamic";

export default async function AISettingsPage() {
  const providers = getAvailableProviders();
  const defaultProvider = getDefaultProvider();

  const providerInfo = providers.map(provider => ({
    name: provider,
    displayName: provider.charAt(0).toUpperCase() + provider.slice(1),
    models: getProviderModels(provider),
    isDefault: provider === defaultProvider,
  }));

  return (
    <div className="min-h-screen bg-surface-dark">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">AI Settings</h1>
        
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Available Providers</h2>
          <p className="text-slate-400 mb-4">
            Configure which AI provider to use for tutoring, writing feedback, and pronunciation analysis.
          </p>
          
          <div className="space-y-4">
            {providerInfo.map((provider) => (
              <div key={provider.name} className="p-4 bg-white/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{getProviderIcon(provider.name)}</span>
                    <div>
                      <span className="font-medium">{provider.displayName}</span>
                      {provider.isDefault && (
                        <span className="ml-2 px-2 py-0.5 bg-brand-500/20 text-brand-400 text-xs rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.models.map((model) => (
                    <span 
                      key={model} 
                      className="px-2 py-1 bg-white/5 text-slate-400 text-sm rounded"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <p className="text-slate-400 mb-4">
            To use a provider, set the corresponding environment variable:
          </p>
          
          <div className="space-y-3 font-mono text-sm">
            <div className="p-3 bg-white/5 rounded-lg flex justify-between">
              <span>KiloCode</span>
              <span className="text-slate-400">KILOCODE_API_KEY</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg flex justify-between">
              <span>OpenAI</span>
              <span className="text-slate-400">OPENAI_API_KEY</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg flex justify-between">
              <span>Anthropic</span>
              <span className="text-slate-400">ANTHROPIC_API_KEY</span>
            </div>
            <div className="p-3 bg-white/5 rounded-lg flex justify-between">
              <span>OpenRouter</span>
              <span className="text-slate-400">OPENROUTER_API_KEY</span>
            </div>
          </div>
          
          <p className="text-slate-500 text-sm mt-4">
            Set DEFAULT_AI_PROVIDER to change the default provider.
          </p>
        </div>
      </div>
    </div>
  );
}

function getProviderIcon(name: string): string {
  const icons: Record<string, string> = {
    kilocode: "🤖",
    openai: "🧠",
    anthropic: "🔷",
    openrouter: "🔄",
  };
  return icons[name] || "💡";
}