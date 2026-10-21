window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'servers-deployment-devops',
    category: 'Data and Servers',
    title: 'Servers, Deployment, and CI/CD',
    icon: 'fa-server',
    subtitle: 'Learn how code moves from your computer to real users, and how teams keep it working.',
    analogy: 'Building an app is like opening a restaurant. Code is the recipe, a server is the kitchen, deployment opens the doors, CI/CD is the checklist, logs are kitchen notes, and monitoring is the smoke alarm.',
    realWorldExample: {
      title: 'Deploying a todo app',
      desc: 'You push code to GitHub. CI runs tests and builds the app. If checks pass, the hosting platform deploys it. Users visit the live URL. If a button breaks, logs show errors and monitoring can alert the team.',
    },
    whatIsIt: 'A server runs software for users. Deployment publishes code. CI checks changes automatically. CD prepares or releases code. Logs and monitoring help teams notice what happens after release.',
    whyUse: 'Real software is more than code on your laptop. It needs a repeatable path to production and a way to see whether users are getting errors, slow pages, or outages.',
    conceptSections: [
      { icon: 'fa-server', title: 'Server', desc: 'A server waits for requests and sends responses.', example: 'GET /health returns {"status":"ok"}.' },
      { icon: 'fa-rocket', title: 'Deployment', desc: 'Deployment copies, builds, or releases code where users can access it.', example: 'A static site may deploy to a CDN.' },
      { icon: 'fa-gears', title: 'CI/CD', desc: 'CI/CD automates checks and releases so humans make fewer repeat mistakes.', example: 'Run tests on every pull request.' },
      { icon: 'fa-chart-line', title: 'Logs and monitoring', desc: 'Logs show events. Monitoring shows health patterns over time.', example: 'An alert fires when error rate jumps.' },
    ],
    conceptFlow: ['Developer writes code', 'Push to Git repository', 'CI runs tests', 'Build app', 'Deploy to server', 'Users send requests', 'Logs and monitoring track health'],
    mermaidDiagram: `flowchart LR
  A[Developer code] --> B[Git push]
  B --> C[CI pipeline]
  C --> D{Tests pass?}
  D -- No --> E[Fix code]
  E --> B
  D -- Yes --> F[Build app]
  F --> G[Deploy]
  G --> H[Users]
  H --> I[Logs]
  H --> J[Monitoring]`,
    whenToUse: [
      { icon: 'fa-globe', title: 'Publishing apps', desc: 'Deploy when other people need to access your work.' },
      { icon: 'fa-vial', title: 'Automated checks', desc: 'Use CI so tests run consistently before changes ship.' },
      { icon: 'fa-chart-simple', title: 'Production health', desc: 'Use logs and monitoring to understand live behavior.' },
      { icon: 'fa-rotate', title: 'Repeatable releases', desc: 'Use CD to reduce manual release mistakes.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Deployment pipeline simulator',
    demoHint: 'Watch a change move through automated checks to a live app.',
    demoSteps: [
      { label: 'Push', detail: 'A developer pushes commits to the remote repository.', result: 'Automation has a new change to check.' },
      { label: 'Test', detail: 'CI runs tests, lint, and build steps.', result: 'Bad changes can stop before users see them.' },
      { label: 'Deploy', detail: 'A passing build is published to hosting or servers.', result: 'Users can reach the new version.' },
      { label: 'Observe', detail: 'Logs and monitoring show errors, latency, and traffic.', result: 'The team can detect and debug production issues.' },
    ],
    codeTitle: 'CI Workflow Example',
    codeLanguage: 'YAML',
    codeText: `name: Test and Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm test
      - run: npm run build`,
    pros: ['Makes releases more repeatable', 'Catches mistakes before deployment', 'Gives teams visibility after launch'],
    cons: ['Pipelines need maintenance', 'Broken tests can block releases', 'Monitoring must be tuned to avoid noisy alerts'],
    checklist: ['Explain the path from Git push to deploy.', 'Describe what CI checks before release.', 'Explain why logs and monitoring matter after launch.'],
  },
  {
    id: 'docker-containers',
    category: 'Data and Servers',
    title: 'Docker and Containers',
    icon: 'fa-box',
    subtitle: 'Package an app with everything it needs so it runs the same way on any machine.',
    analogy: 'Docker is like packing a lunchbox for your app. Instead of hoping another kitchen has the same tools and ingredients, you pack the runtime, setup, and app together.',
    realWorldExample: {
      title: 'Web app plus database',
      desc: 'A Node app can run in one container and PostgreSQL in another. New developers do not manually install exact Node and database versions. They run one command and get the same setup as the team.',
    },
    whatIsIt: 'Docker builds images and runs containers. An image is a packaged template. A container is a running copy of that template. Containers help developers, CI systems, and servers run apps with consistent dependencies. When an app needs multiple containers: such as a frontend, API, and database: Docker Compose is the usual next step to run and wire them together.',
    whyUse: 'Docker helps solve "it works on my machine." If every developer, test server, and production server runs the same container image, the app is more likely to behave consistently everywhere. A single container is a great start. Compose becomes important once several services must start together with shared networks, ports, and volumes.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Dockerfile', desc: 'A Dockerfile is the recipe for an image.', example: 'Start from node:20, copy files, install packages, run the app.' },
      { icon: 'fa-layer-group', title: 'Image', desc: 'An image is the packaged result of the Dockerfile.', example: 'hello-web:1.0 can be shared and run elsewhere.' },
      { icon: 'fa-play', title: 'Container', desc: 'A container is a live running instance of an image.', example: 'Run the image and expose port 3000.' },
      { icon: 'fa-database', title: 'Volume', desc: 'A volume helps important data survive container restarts.', example: 'Postgres data is stored in a volume.' },
    ],
    conceptFlow: ['Write app code', 'Write Dockerfile', 'Build image', 'Run container', 'Map host port to container port', 'Attach volume if data must persist', 'Use Compose for multiple services'],
    mermaidDiagram: `flowchart TD
  A[App code] --> B[Dockerfile]
  B --> C[Docker builds image]
  C --> D[Container runs]
  D --> E[App listens on container port]
  E --> F[Host port maps traffic]
  D --> G[Volume saves data]
  H[docker-compose.yml] --> D
  H --> I[Database container]`,
    whenToUse: [
      { icon: 'fa-user-plus', title: 'Onboarding developers', desc: 'New teammates can start without manually installing every dependency.' },
      { icon: 'fa-vial', title: 'Testing consistently', desc: 'Tests can run in the same environment on laptops and CI servers.' },
      { icon: 'fa-server', title: 'Deploying apps', desc: 'The same image can move from development to staging to production.' },
      { icon: 'fa-database', title: 'Running local services', desc: 'Databases, queues, and caches can run locally without permanent installs.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Build and run pipeline',
    demoHint: 'Move from Dockerfile to image to container and see where ports and volumes fit.',
    demoSteps: [
      { label: 'Dockerfile', detail: 'The Dockerfile lists setup instructions.', result: 'Docker has a recipe for the image.' },
      { label: 'Image', detail: 'Build turns the recipe into a reusable image.', result: 'The app environment is packaged.' },
      { label: 'Container', detail: 'Run starts a live container from the image.', result: 'The app is running in isolation.' },
      { label: 'Ports + volumes', detail: 'Port mapping exposes the app. Volumes preserve important data.', result: 'The container can be reached and data can survive restarts.' },
    ],
    codeTitle: 'Dockerfile Example',
    codeLanguage: 'Dockerfile',
    codeText: `FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
CMD ["npm", "start"]`,
    pros: ['Makes app environments repeatable', 'Simplifies setup with many dependencies', 'Works well for local development, CI, and deployment'],
    cons: ['Adds new concepts and commands', 'Images can become large', 'Ports, volumes, and networking can confuse beginners'],
    checklist: ['Explain image vs container.', 'Describe why Docker helps with "works on my machine".', 'Explain what a port mapping does.', 'Describe when Docker Compose is the next step after one container.'],
  },
);
