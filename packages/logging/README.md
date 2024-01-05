# @ag-oss/logging

This library provides loggers and utilities for building well formatted loggers.

The secondary goal is to also serve as an example of functional programming and modular code.

## Installation

```bash
npm install @ag-oss/logging
```

## Usage

```typescript
import { verboseLogger as log } from '@ag-oss/logging-js';

...

log.verbose('This will only show up if global.verbose is true');
```
