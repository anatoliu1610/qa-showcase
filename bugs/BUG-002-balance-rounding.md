# BUG-002: Balance rounding mismatch after win

- Severity: Major
- Environment: Staging API v1.3

## Steps
1. Place bet 0.10
2. Receive win 0.30
3. Compare UI balance with API response

## Actual
UI shows 0.19 delta instead of 0.20 in some rounds.

## Expected
Exact balance math with correct decimal precision.
