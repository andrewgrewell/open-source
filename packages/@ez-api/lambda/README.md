# EZ-API Lambda

Provides tooling for api handlers running in serverless(AWS) lambda.

## Guide

### Handlers
- Depends on the `ag-oss/serverless` package underlying handler functionality
- A handler can either be a single function, or an object defining route based handlers
- Handlers can have varying levels of protection, and can include authentication and authorization
- EZ-API exposes sugar for creating handlers for use in the EZ-API stack.

