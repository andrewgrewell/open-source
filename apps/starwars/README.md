# StarWars App

The StarWars app is an example of what a full stack application.

**Table of Contents**
- [StarWars App](#starwars-app)
  - [Tech Stack Overview](#tech-stack-overview)
    - [Infrastructure](#infrastructure)
      - [Hasura](#hasura)
      - [Auth0](#auth0)
      - [AWS RDS](#aws-rds)
    - [Clients](#clients)
    - [Services](#services)
---

## Tech Stack Overview

### Infrastructure
TODO: write a guide on the setup of the BE infrastructure

#### Hasura
Hasura provides an API gateway in front of the swapi graphql (data service), 
and the various other services that make up the StarWars stack.

#### Auth0
Authentication is handled with Auth0, and uses Auth0's Actions 
to populate the token with additional Hasura claims, and to sync the user info
into the `users` table of the Postgres DB.

#### AWS RDS
A PostgreSQL database is hosted in AWS RDS, and used as the primary data store for all app services.

### Clients


### Services

---
