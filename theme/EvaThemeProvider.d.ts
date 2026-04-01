import { ReactNode } from '../../node_modules/react';
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
export declare function EvaThemeProvider({ tokens, variant, children, }: EvaThemeProviderProps): React.JSX.Element;
//# sourceMappingURL=EvaThemeProvider.d.ts.map