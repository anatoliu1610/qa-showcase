# BUG-001: Spin button remains disabled after successful login

- Severity: Major
- Environment: Staging, Chrome 122

## Steps
1. Login with valid credentials
2. Open game screen
3. Observe spin button state

## Actual
Spin button is disabled until page refresh.

## Expected
Spin button should be enabled when session is active and balance > minimum bet.
