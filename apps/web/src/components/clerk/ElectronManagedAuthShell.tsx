import { passkeys } from "@clerk/electron/passkeys";
import { ClerkProvider } from "@clerk/electron/react";
import { Component, type ReactNode } from "react";

import { ManagedRelayAuthProvider } from "../../cloud/managedAuth";
import { clerkAppearance } from "./clerkAppearance";

class ClerkErrorBoundary extends Component<
  { readonly children: ReactNode; readonly fallback: ReactNode },
  { readonly hasError: boolean }
> {
  override state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown) {
    console.error("ClerkProvider failed to initialize, falling back to unmanaged mode:", error);
  }

  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * Electron half of the managed-auth boundary. The Electron provider statically
 * bundles the full clerk-js runtime, so this module must only ever load
 * lazily, and only inside the desktop shell — importing it eagerly would put
 * clerk-js back into every client's startup graph.
 */
export default function ElectronManagedAuthShell({
  publishableKey,
  children,
}: {
  readonly publishableKey: string;
  readonly children: ReactNode;
}) {
  return (
    <ClerkErrorBoundary fallback={children}>
      <ClerkProvider appearance={clerkAppearance} publishableKey={publishableKey} passkeys={passkeys}>
        <ManagedRelayAuthProvider>{children}</ManagedRelayAuthProvider>
      </ClerkProvider>
    </ClerkErrorBoundary>
  );
}
