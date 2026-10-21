window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'web-big-picture',
    category: 'How the Web Works',
    title: 'How the Web Fits Together',
    icon: 'fa-map',
    subtitle: 'One map first: browser, internet, server, database.',
    analogy: 'A web app is like ordering a pizza. Your browser is you at home. The internet is the road. The server is the pizza shop. The database is the shop\'s fridge full of ingredients.',
    realWorldExample: {
      title: 'Opening a learning app',
      desc: 'You type a web address. The browser finds the server and downloads the page. The page asks the server for your lessons. The server reads them from the database and sends them back. You see your list.',
    },
    whatIsIt: 'The web is a team of four parts. The browser shows the page. The internet carries messages. The server answers questions. The database remembers things, even when the server restarts.',
    whyUse: 'Words like HTTP, server, Docker and Git all belong somewhere on this map. Learn the map once, and every new word has a place to go.',
    conceptSections: [
      { icon: 'fa-window-maximize', title: 'Browser', desc: 'Shows the page and runs your JavaScript.', example: 'Clicking a button can make the browser send a message.' },
      { icon: 'fa-network-wired', title: 'Internet', desc: 'Carries small pieces of data between computers.', example: 'Wi-Fi, cables and routers on the way.' },
      { icon: 'fa-server', title: 'Server', desc: 'A computer that waits for questions and sends answers.', example: 'It checks your login and returns your profile.' },
      { icon: 'fa-database', title: 'Database', desc: 'Remembers data for a long time.', example: 'Users, posts, orders, lessons.' },
    ],
    demoType: 'web-foundations',
    demoTitle: 'Follow the app path',
    demoHint: 'Step through the trip from browser to server and back.',
    demoSteps: [
      { label: 'Open address', detail: 'You type a web address into the browser.', result: 'The browser knows which site you want.' },
      { label: 'Ask server', detail: 'A message travels over the internet to the server.', result: 'The server gets a question to answer.' },
      { label: 'Read data', detail: 'The server asks the database for saved data.', result: 'Saved data is found.' },
      { label: 'Show page', detail: 'The answer travels back and the browser draws the page.', result: 'You see a page, a list or an error.' },
    ],
    checklist: ['You can name the job of the browser, the server and the database.', 'You can tell the trip of one click in your own words.', 'You can say why the database is not inside the browser.'],
    check: [
      { q: 'In the pizza picture, what is the server?', a: 'The pizza shop. It takes the order and sends back the pizza.' },
      { q: 'Which part remembers your data when the server restarts?', a: 'The database.' },
    ],
    relatedIds: ['client-server'],
  },
  {
    id: 'client-server',
    category: 'How the Web Works',
    title: 'Client and Server',
    icon: 'fa-laptop-code',
    subtitle: 'A guest, a waiter and a kitchen.',
    keywords: ['client', 'server', 'request', 'response'],
    relatedIds: ['web-big-picture', 'networks-ips-requests', 'http-requests-responses'],
    subPages: [
      {
        id: 'picture',
        label: 'The picture',
        title: 'A restaurant',
        anim: 'request',
        analogy: 'You sit in a restaurant. You are the client: you ask for food. The kitchen is the server: it makes the food. The waiter is the network: he carries your order to the kitchen and brings the plate back. You never walk into the kitchen yourself.',
        whatIsIt: 'A client is the program that asks. Most of the time it is your browser. A server is a program on another computer that answers. The question is called a request. The answer is called a response. One kitchen can cook for many guests at once.',
        realWorldExample: {
          title: 'Loading your profile',
          desc: 'You click "My profile". Your browser (client) sends a request. The server checks who you are, looks up your data and sends a response. The browser shows your name and photo.',
        },
        demoType: 'web-foundations',
        demoTitle: 'Follow one order',
        demoHint: 'Step through one order from your table to the kitchen and back.',
        demoSteps: [
          { label: 'Guest orders', detail: 'The client sends a request: "Please send my profile."', result: 'The request is on its way.' },
          { label: 'Waiter carries', detail: 'The network carries the request to the server.', result: 'The kitchen gets the order.' },
          { label: 'Kitchen cooks', detail: 'The server checks the order and gets the data from the storage room (the database).', result: 'The answer is ready.' },
          { label: 'Plate arrives', detail: 'The response travels back. The browser shows the profile.', result: 'You see your page.' },
        ],
        checklist: [
          'You can point to the client and the server in a web app.',
          'You can say what a request and a response are.',
          'You can explain why the browser does not open the database itself.',
        ],
        check: [
          { q: 'In the restaurant, who is the client?', a: 'You, the guest. The client is the one who asks.' },
          { q: 'What do we call the answer the server sends back?', a: 'A response.' },
          { q: 'Why should a guest not walk into the kitchen?', a: 'The kitchen protects its food and rules. The server protects its data in the same way: only the server talks to the database.' },
        ],
      },
      {
        id: 'many-guests',
        label: 'Many guests',
        title: 'One server, many clients',
        demoType: null,
        whatIsIt: 'One server answers many clients. Your phone, your laptop and your friend\'s laptop can all ask the same server. Because the data lives on the server, everyone sees the same, up-to-date data. The server also checks the rules: who may see what.',
        conceptSections: [
          { icon: 'fa-display', title: 'Client', desc: 'Shows the screen and asks questions.', example: 'Browser, phone app.' },
          { icon: 'fa-server', title: 'Server', desc: 'Checks rules and answers.', example: 'Are you logged in? Then here is your data.' },
          { icon: 'fa-database', title: 'Database', desc: 'Stores data. Only the server talks to it.', example: 'Profiles, posts, orders.' },
        ],
        check: [
          { q: 'You change your name on your laptop. Why does your phone show the new name too?', a: 'Both ask the same server, and the server keeps one copy of your data.' },
        ],
      },
      {
        id: 'from-javascript',
        label: 'Later: ask from JavaScript',
        title: 'Later: send a request from JavaScript',
        demoType: null,
        whatIsIt: 'Come back here after the fetch primer on the path. JavaScript can be the guest that orders. fetch sends a request. .then waits for the plate. This example asks GitHub\'s server for a user.',
        codeTitle: 'A first request',
        codeLanguage: 'JavaScript',
        codeText: `fetch('https://api.github.com/users/octocat')
  .then(response => response.json())   // read the answer as data
  .then(user => console.log(user.name)); // The Octocat`,
        tryIt: {
          steps: [
            'Open the browser console (F12).',
            'Paste the three lines and press Enter.',
          ],
          result: 'The Octocat, a moment later.',
        },
      },
    ],
  },
);
