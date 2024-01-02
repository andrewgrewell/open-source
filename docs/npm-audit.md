## Issues with @nx/expo and dependencies with vulnerabilities
(Wont fix)
```bash
dicer  *
Severity: high
Crash in HeaderParser in dicer - https://github.com/advisories/GHSA-wm7h-9275-46v2
fix available via `npm audit fix --force`
Will install @nx/expo@16.5.5, which is a breaking change
node_modules/dicer
  @expo/multipart-body-parser  *
  Depends on vulnerable versions of dicer
  node_modules/@expo/multipart-body-parser
    eas-cli  >=0.28.0
    Depends on vulnerable versions of @expo/multipart-body-parser
    Depends on vulnerable versions of @expo/prebuild-config
    node_modules/eas-cli
      @nx/expo  *
      Depends on vulnerable versions of @expo/cli
      Depends on vulnerable versions of @nrwl/expo
      Depends on vulnerable versions of eas-cli
      Depends on vulnerable versions of expo
      node_modules/@nx/expo
        @nrwl/expo  >=16.6.0-beta.0
        Depends on vulnerable versions of @nx/expo
        node_modules/@nrwl/expo

semver  7.0.0 - 7.5.1
Severity: moderate
semver vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
fix available via `npm audit fix --force`
Will install @nx/expo@16.5.5, which is a breaking change
node_modules/@expo/image-utils/node_modules/semver
  @expo/image-utils  0.0.1-canary-20231205-250b31f || >=0.3.10-alpha.0
  Depends on vulnerable versions of semver
  node_modules/@expo/image-utils
    @expo/prebuild-config  *
    Depends on vulnerable versions of @expo/image-utils
    node_modules/@expo/prebuild-config
    node_modules/eas-cli/node_modules/@expo/prebuild-config
      @expo/cli  <=0.0.0-canary-20231123-1b19f96-4 || >=0.0.1-canary-20231125-d600e44
      Depends on vulnerable versions of @expo/prebuild-config
      node_modules/@expo/cli
        expo  >=45.0.0-beta.1
        Depends on vulnerable versions of @expo/cli
        node_modules/expo

10 vulnerabilities (5 moderate, 5 high)

To address all issues (including breaking changes), run:
  npm audit fix --force
 ~/Development/ag-oss  repo-boilerplate !5  npm audit                                                                1 ✘  12:19:38 PM 
# npm audit report

dicer  *
Severity: high
Crash in HeaderParser in dicer - https://github.com/advisories/GHSA-wm7h-9275-46v2
fix available via `npm audit fix --force`
Will install @nx/expo@16.5.5, which is a breaking change
node_modules/dicer
  @expo/multipart-body-parser  *
  Depends on vulnerable versions of dicer
  node_modules/@expo/multipart-body-parser
    eas-cli  >=0.28.0
    Depends on vulnerable versions of @expo/multipart-body-parser
    Depends on vulnerable versions of @expo/prebuild-config
    node_modules/eas-cli
      @nx/expo  *
      Depends on vulnerable versions of @expo/cli
      Depends on vulnerable versions of @nrwl/expo
      Depends on vulnerable versions of eas-cli
      Depends on vulnerable versions of expo
      node_modules/@nx/expo
        @nrwl/expo  >=16.6.0-beta.0
        Depends on vulnerable versions of @nx/expo
        node_modules/@nrwl/expo

semver  7.0.0 - 7.5.1
Severity: moderate
semver vulnerable to Regular Expression Denial of Service - https://github.com/advisories/GHSA-c2qf-rxjj-qqgw
fix available via `npm audit fix --force`
Will install @nx/expo@16.5.5, which is a breaking change
node_modules/@expo/image-utils/node_modules/semver
  @expo/image-utils  0.0.1-canary-20231205-250b31f || >=0.3.10-alpha.0
  Depends on vulnerable versions of semver
  node_modules/@expo/image-utils
    @expo/prebuild-config  *
    Depends on vulnerable versions of @expo/image-utils
    node_modules/@expo/prebuild-config
    node_modules/eas-cli/node_modules/@expo/prebuild-config
      @expo/cli  <=0.0.0-canary-20231123-1b19f96-4 || >=0.0.1-canary-20231125-d600e44
      Depends on vulnerable versions of @expo/prebuild-config
      node_modules/@expo/cli
        expo  >=45.0.0-beta.1
        Depends on vulnerable versions of @expo/cli
        node_modules/expo

10 vulnerabilities (5 moderate, 5 high)

```
