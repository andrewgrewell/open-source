import { observeAllStateValues } from '../observeAllStateValues';
import { of } from 'rxjs';
import { ObservableState } from 'src/load-central/search/filters/filters.types';

describe('observeAllStateValues', () => {
  it('return a observable of the plain state object', async () => {
    const state: ObservableState<any> = {
      a: {
        setValue: () => {},
        value: of(1),
      },
      b: {
        c: {
          setValue: () => {},
          value: of(2),
        },
      },
    };
    const spy = jest.fn();
    observeAllStateValues(state).subscribe(spy);
    expect(spy).toHaveBeenCalledWith({
      a: 1,
      b: {
        c: 2,
      },
    });
  });
});
