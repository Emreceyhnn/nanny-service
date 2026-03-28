export interface HomePageState {
  isLoading: boolean;
}

export interface HomePageActions {
  // Navigation is handled by Link
}

export interface HomePageProps {
  state: HomePageState;
  actions: HomePageActions;
}
