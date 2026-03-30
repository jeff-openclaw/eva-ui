import type { ReactNode, CSSProperties } from 'react';
import './tokens.css';
import './reset.css';

/** Props for the EvaThemeProvider component. */
export interface EvaThemeProviderProps {
  /** Override specific tokens via CSS custom property map. */
  tokens?: Record<string, string>;
  /** Theme variant preset. Default: 'nerv'. */
  variant?: 'nerv' | 'seele' | 'wille';
  /** Children. */
  children: ReactNode;
}

/**
 * Wraps children in the Eva-UI theme context.
 * Applies CSS custom property tokens via a scoped `.eva-theme` container.
 */
export function EvaThemeProvider({
  tokens,
  variant = 'nerv',
  children,
}: EvaThemeProviderProps): React.JSX.Element {
  const style = tokens
    ? Object.fromEntries(
        Object.entries(tokens).map(([key, value]) => [
          key.startsWith('--') ? key : `--eva-${key}`,
          value,
        ])
      ) as CSSProperties
    : undefined;

  return (
    <div
      className={`eva-theme eva-theme--${variant}`}
      style={style}
      data-eva-theme={variant}
    >
      {children}
    </div>
  );
}
