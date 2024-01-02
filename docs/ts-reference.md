# Typescript Reference

This document is to record helpful reminders and tips for working with Typescript.

## Typing in tests
You don't want to exclude typing all together in tests, because just like normal code, it can often save you time by catching mistakes.
But it is common to have cases where you truly don't care about the type of something in a test, and you just want to get on with it.
In these cases use `@ts-expect-error - reason we expect the error`
