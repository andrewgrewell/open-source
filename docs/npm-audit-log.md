# NPM Audit Log

This is a record of audit issues that come up when installing new packages, or running npm audit.
Often the issues are not easily fixable, or not a true vulnerability, but it is good to keep track of them, and address them
in batches as part of tackling tech debt.

<details>
  <summary><b>Issues with @nx/expo and dependencies with vulnerabilities | 10 vulnerabilities (5 moderate, 5 high)</b></summary>
  <pre>

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
  </pre>
</details>

<details>
  <summary><b>Audit after running nx storybook generator | 3 vulnerabilities (1 low, 5 moderate)</b></summary>
  <pre>

      next  0.9.9 - 13.5.4-canary.11
      Severity: moderate
      Next.js missing cache-control header may lead to CDN caching empty reply - https://github.com/advisories/GHSA-c59h-r6p8-q9wc
      Depends on vulnerable versions of postcss
      Depends on vulnerable versions of zod
      fix available via `npm audit fix --force`
      Will install next@13.5.6, which is outside the stated dependency range
      node_modules/next
      
      postcss  <8.4.31
      Severity: moderate
      PostCSS line return parsing error - https://github.com/advisories/GHSA-7fh5-64p2-3v2j
      fix available via `npm audit fix --force`
      Will install next@13.5.6, which is outside the stated dependency range
      node_modules/next/node_modules/postcss
      
      zod  <=3.22.2
      Zod denial of service vulnerability - https://github.com/advisories/GHSA-m95q-7qp3-xv42
      fix available via `npm audit fix --force`
      Will install next@13.5.6, which is outside the stated dependency range
      node_modules/zod

  </pre>
</details>
