# Incident RCA Example

## Symptom
Players report "Spin failed" intermittently.

## Investigation
- Kibana showed spike of 500 on `/api/spin`.
- Correlated by request_id to DB timeout logs.
- SQL showed lock contention on transaction table.

## Root cause
Long-running reporting query blocked write path.

## Fix
- Added index + moved reporting query to read replica.
- Added timeout and retry policy.

## Verification
- 500 rate dropped to baseline.
- No new incidents after deployment.
