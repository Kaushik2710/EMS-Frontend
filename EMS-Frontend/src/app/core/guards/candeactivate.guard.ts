import { CanDeactivateFn } from '@angular/router';
import { SignupComponent } from '../../pages/Common/signup/signup.component';

export const candeactivateGuard: CanDeactivateFn<SignupComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canExit();
};
