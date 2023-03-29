# Node and TypeScript demo using GraphQL
Wanted to add a more recent example of my coding using JavaScript with TypeScript on Node, and thought I'd use this opportunity to also learn about GraphQL! This project uses the following tech:

- Docker for containerized deployments
- Node.js and GraphQL for API server
  - JavaScript (using TypeScript) for the Node portions
  - SDL for the GraphQL schema definitions
  - Express for routing
- MySQL for the relational database
  - Sequelize for data models and relational associations

## Running the Demo
For this demo, you'll need Docker Desktop and Docker Compose installed. Both are platform-agnostic and easy to get running. Once you have those:

1. Clone or download a zip of this repository.
2. Open a Terminal / Command Prompt and navigate to the location of this cloned or unzipped repository on your local machine.
3. Run `docker-compose up -d --build`

Once the containers have launched, the NodeJS servers will take a quick moment before being available for requests. You should be able to make requests against any of the 3 scaled NodeJS replicas that Docker launched at http://localhost:800x/graphql, where 800x is port numbers 8000 through 8002.

For testing requests against the API servers, I like to use Postman.

## Feedback
If you check out the demo and think I could've done things differently, let me know using the Issues tab! Feedback is the best way for me to break habits and grow. :)