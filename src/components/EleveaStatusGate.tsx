import { useEffect, useState } from "react";
import { fetchStatus } from "@/lib/api";

type Props = { children: React.ReactNode };

export default function EleveaStatusGate({ children }: Props) {
  const [state, setState] = useState<"loading" | "on" | "off">("loading");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetchStatus();
        // debug temporário
        console.debug("[EleveaStatus] status", res);

        if (!mounted) return;

        // considera bloqueio manual vindo do GAS (manualBlock em camelCase)
        const isActive = !!(res?.ok && res?.active && !res?.manualBlock);
        setState(isActive ? "on" : "off");
      } catch {
        // fail-open: se o endpoint cair, mantemos o site no ar
        if (mounted) setState("on");
      }
    }

    load();
    const onVis = () => document.visibilityState === "visible" && load();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      mounted = false;
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  if (state === "loading") return null;

  if (state === "off") {
    return (
      <div style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: 8 }}>Site temporariamente indisponível</h1>
          <p>Tente novamente em alguns minutos.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
