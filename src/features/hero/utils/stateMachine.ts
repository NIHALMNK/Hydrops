import { HeroState } from '../types/hero';

type StateListener = (state: HeroState) => void;

class HeroStateMachine {
  private state: HeroState = 'LOADING';
  private listeners: Set<StateListener> = new Set();

  public getState() {
    return this.state;
  }

  public setState(newState: HeroState) {
    if (this.state === newState) return;
    this.state = newState;
    this.listeners.forEach(fn => fn(this.state));
  }

  public subscribe(listener: StateListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const heroStateMachine = new HeroStateMachine();
