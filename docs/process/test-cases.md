# Test Cases (starter)

## TC-001 Login success
Precondition: valid user exists.
Steps: Open login -> enter valid credentials -> submit.
Expected: 200 response, user redirected, session active.

## TC-002 Spin with insufficient funds
Precondition: balance < bet amount.
Steps: attempt spin.
Expected: validation error, no bet record created.

## TC-003 Transaction consistency
Precondition: user performs one bet and one win.
Steps: call history endpoint; verify DB records.
Expected: API and DB totals match.
