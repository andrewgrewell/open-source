# Testing
Tips and patterns for writing tests.

### *A note on coverage reports*
It's been awhile since I setup coverage reporting, but the short of it is that the report generated from Jest isn't ideal
for a monorepo, so I have setup an extra step where I use nyc to generate a merged report.
This is the report that should be used with coverage tools. Coverage collection should be reviewed and updated if needed.*

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
