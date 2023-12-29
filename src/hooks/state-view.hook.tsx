type ComponentState = 'loading' | 'error' | 'empty' | 'data';

export function useComponentViewState(loading: boolean, error: boolean, data: any[]): ComponentState {
    if (loading) return 'loading';
    if (error) return 'error';
    if (data.length === 0) return 'empty';
    return 'data';
}