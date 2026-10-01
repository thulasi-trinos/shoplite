# ShopLite

ShopLite is a small demo shop used by the [AI Incident Copilot](https://github.com/thulasi-trinos/incident-copilot) learning project. It is not a real product.

Its code and **commit history are part of the incident scenarios**: the copilot investigates simulated production incidents by reading these commits and diffs. Do not rewrite history on `main`.

| Service | What it does | Release tags |
| --- | --- | --- |
| `checkout-service` | Cart and checkout API, backed by Postgres | `checkout-service/v*` |
| `payment-service` | Charges cards through the PayLane provider | `payment-service/v*` |
| `inventory-service` | Stock levels and product lookups | `inventory-service/v*` |
| `api-gateway` | Routes public traffic to the services | `api-gateway/v*` |
