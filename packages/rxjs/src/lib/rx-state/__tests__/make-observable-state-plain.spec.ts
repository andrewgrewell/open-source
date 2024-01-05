import { makeObservableStatePlain } from '../make-observable-state-plain';
import { of } from 'rxjs';
import { ObservableState } from '../rx-state.types';

describe('makeObservableStatePlain', () => {
  it('return a promise resolving to the plain state object', async () => {
    const state: ObservableState<any> = {
      a: {
        setValue: () => {
          // noop
        },
        value: of(1),
      },
      b: {
        c: {
          setValue: () => {
            // noop
          },
          value: of(2),
        },
      },
    };
    const result = await makeObservableStatePlain(state);
    expect(result).toEqual({
      a: 1,
      b: {
        c: 2,
      },
    });
  });
});
