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
- **Avoid using snapshots**
  Snapshots are fine for very complex data structures and if you dont have much time. But ideally specific assertions
  should be made. The issue with snapshots is they can be hard to read, and thus can hide subtle bugs, also it is tempting
  to update the snapshot when it fails, without really digging into if the failure is valid or not.
