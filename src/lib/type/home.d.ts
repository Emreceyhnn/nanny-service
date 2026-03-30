export interface HomePageState {
  isLoading: boolean;
}

export type HomePageActions = Record<string, never>;

export interface HomePageProps {
  state: HomePageState;
  actions: HomePageActions;
}
