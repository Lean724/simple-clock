import {
  ActionConfig,
  ActionTargetConfig,
  ActionTrigger,
  ColorValue,
  EntitySlotConfig,
  SimpleClockCardConfig,
} from '../types';
import { colorToCss } from './date-time';

const HOLD_THRESHOLD_MS = 500;
const DOUBLE_TAP_WINDOW_MS = 250;
const MOVE_THRESHOLD_PX = 10;

interface GestureState {
  pointerId?: number;
  startX: number;
  startY: number;
  held: boolean;
  moved: boolean;
  active: boolean;
  holdTimer?: number;
  tapTimer?: number;
  lastPointerType?: string;
}

/**
 * Returns true if the given action config represents an active action.
 */
export function hasAction(action?: ActionConfig): boolean {
  return Boolean(action && action.action && action.action !== 'none');
}

/**
 * Returns true if any of tap, double_tap, or hold actions is configured and active.
 */
export function hasAnyAction(config: ActionTargetConfig): boolean {
  return (
    hasAction(config.tap_action) ||
    hasAction(config.double_tap_action) ||
    hasAction(config.hold_action)
  );
}

/**
 * Resolves the effective card-level action configuration (defaults all triggers to 'none').
 */
export function resolveCardActionConfig(config: SimpleClockCardConfig): ActionTargetConfig {
  return {
    tap_action: config.tap_action ?? { action: 'none' },
    double_tap_action: config.double_tap_action ?? { action: 'none' },
    hold_action: config.hold_action ?? { action: 'none' },
  };
}

/**
 * Resolves the effective entity-slot action configuration (tap defaults to 'more-info').
 */
export function resolveEntityActionConfig(
  slot: EntitySlotConfig | undefined,
  entityId: string
): ActionTargetConfig {
  return {
    entity: entityId,
    tap_action: slot?.tap_action ?? { action: 'more-info' },
    double_tap_action: slot?.double_tap_action ?? { action: 'none' },
    hold_action: slot?.hold_action ?? { action: 'none' },
  };
}

/**
 * Resolves the effective icon color for an entity slot, preferring per-slot color over global.
 */
export function resolveEntityIconColor(
  slotColor: ColorValue | undefined,
  globalColor: ColorValue | undefined
): string | undefined {
  return colorToCss(slotColor) ?? colorToCss(globalColor);
}

/**
 * Coordinates tap, double_tap, and hold pointer gestures for multiple named targets.
 */
export class ActionGestureController {
  private _states = new Map<string, GestureState>();

  private _getOrCreateState(key: string): GestureState {
    let state = this._states.get(key);
    if (!state) {
      state = {
        startX: 0,
        startY: 0,
        held: false,
        moved: false,
        active: false,
      };
      this._states.set(key, state);
    }
    return state;
  }

  private _clearHoldTimer(state: GestureState): void {
    if (state.holdTimer !== undefined) {
      window.clearTimeout(state.holdTimer);
      state.holdTimer = undefined;
    }
  }

  private _clearTapTimer(state: GestureState): void {
    if (state.tapTimer !== undefined) {
      window.clearTimeout(state.tapTimer);
      state.tapTimer = undefined;
    }
  }

  public handlePointerDown(
    ev: PointerEvent,
    key: string,
    config: ActionTargetConfig,
    onAction: (action: ActionTrigger) => void
  ): void {
    if (ev.pointerType === 'mouse' && ev.button !== 0) {
      return;
    }

    const state = this._getOrCreateState(key);
    this._clearHoldTimer(state);

    state.pointerId = ev.pointerId;
    state.startX = ev.clientX;
    state.startY = ev.clientY;
    state.held = false;
    state.moved = false;
    state.active = true;
    state.lastPointerType = ev.pointerType;

    if (hasAction(config.hold_action)) {
      state.holdTimer = window.setTimeout(() => {
        state.holdTimer = undefined;
        if (!state.active || state.moved) return;
        state.held = true;
        onAction('hold');
      }, HOLD_THRESHOLD_MS);
    }
  }

  public handlePointerMove(ev: PointerEvent, key: string): void {
    const state = this._states.get(key);
    if (!state || !state.active || state.moved) return;
    if (state.pointerId !== undefined && ev.pointerId !== state.pointerId) return;

    const distance = Math.hypot(ev.clientX - state.startX, ev.clientY - state.startY);
    if (distance > MOVE_THRESHOLD_PX) {
      state.moved = true;
      this._clearHoldTimer(state);
    }
  }

  public handlePointerUp(
    ev: PointerEvent,
    key: string,
    config: ActionTargetConfig,
    onAction: (action: ActionTrigger) => void
  ): void {
    const state = this._states.get(key);
    if (!state || !state.active) return;
    if (state.pointerId !== undefined && ev.pointerId !== state.pointerId) return;

    this._clearHoldTimer(state);
    state.active = false;

    if (state.held || state.moved) {
      this._clearTapTimer(state);
      state.moved = false;
      return;
    }

    if (hasAction(config.double_tap_action)) {
      if (state.tapTimer !== undefined) {
        this._clearTapTimer(state);
        onAction('double_tap');
      } else {
        state.tapTimer = window.setTimeout(() => {
          state.tapTimer = undefined;
          if (hasAction(config.tap_action)) {
            onAction('tap');
          }
        }, DOUBLE_TAP_WINDOW_MS);
      }
      return;
    }

    this._clearTapTimer(state);
    if (hasAction(config.tap_action)) {
      onAction('tap');
    }
  }

  public handlePointerCancel(key: string): void {
    const state = this._states.get(key);
    if (!state) return;

    this._clearHoldTimer(state);
    this._clearTapTimer(state);
    state.active = false;
    state.held = false;
    state.moved = false;
  }

  public handleContextMenu(ev: Event, key: string, config: ActionTargetConfig): void {
    if (!hasAction(config.hold_action)) return;
    const state = this._states.get(key);
    if (
      state?.held ||
      state?.lastPointerType === 'touch' ||
      state?.lastPointerType === 'pen'
    ) {
      ev.preventDefault();
    }
  }

  public destroy(): void {
    for (const state of this._states.values()) {
      this._clearHoldTimer(state);
      this._clearTapTimer(state);
    }
    this._states.clear();
  }
}
