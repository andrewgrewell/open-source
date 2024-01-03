# Testing
Tips and patterns for writing tests.

## Jest
- **Specifying the required test environment for a suite**
  add the following comment to the top of the test file
  ```js
  /**
  * @jest-environment jsdom
  */
    ```
- **Tests that use timezones**
  There are some time mocking libraries that can be used to mock timezones, but the easiest solution
  I have found is to use a unix timestamp, e.g. 1370866345 and pass that into `jest.useFakeTimers().setSystemTime()`
