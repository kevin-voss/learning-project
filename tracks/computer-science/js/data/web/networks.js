window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Networks, URLs, DNS, ports and HTTPS. The old lesson "networking-http" was merged in here
// (js/data/aliases.js sends #networking-http links to this lesson).
DS.curriculum.push({
  id: 'networks-ips-requests',
  category: 'How the Web Works',
  title: 'Networks, IPs, Ports, and Requests',
  icon: 'fa-network-wired',
  subtitle: 'How a message finds the right computer and the right program.',
  keywords: ['ip address', 'port', 'url', 'dns', 'https', 'packets', 'routers'],
  relatedIds: ['client-server', 'http-requests-responses', 'linux-terminal-os'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'Sending a parcel',
      analogy: 'Sending a request is like sending a parcel. The IP address is the street address of the building. The port is the flat number inside the building. Big parcels are split into small boxes called packets. Sorting centres on the way, called routers, pass each box closer to the address.',
      whatIsIt: 'A network is a group of computers that can send messages to each other. The internet is a network of networks. Every computer on it has an IP address, like 93.184.215.14. Inside the computer, each server program listens on a port, a number like 443 or 3000.',
      demoType: 'web-foundations',
      demoTitle: 'Follow a parcel',
      demoHint: 'Step through a request from your browser to a server program and back.',
      demoSteps: [
        { label: 'Address', detail: 'The browser knows the IP address and the port of the server.', result: 'The parcel has a full address.' },
        { label: 'Packets', detail: 'The message is split into small packets.', result: 'Small boxes travel more easily.' },
        { label: 'Routers', detail: 'Routers pass each packet closer to the address.', result: 'The packets arrive at the server computer.' },
        { label: 'Port', detail: 'The packets go to the program that listens on the port.', result: 'The right program gets the request.' },
        { label: 'Back home', detail: 'The answer travels back the same way and is put together again.', result: 'The browser has the response.' },
      ],
      checklist: [
        'You can explain IP address and port with the parcel picture.',
        'You can say what packets and routers do.',
        'You can read a URL and find the domain and the path.',
      ],
      check: [
        { q: 'Which number picks the computer, and which picks the program on it?', a: 'The IP address picks the computer. The port picks the program.' },
        { q: 'Why are big messages split into packets?', a: 'Small packets are easier to send. If one gets lost, only that one is sent again.' },
      ],
    },
    {
      id: 'urls',
      label: 'Reading a URL',
      title: 'Reading a URL',
      analogy: 'A URL is the full address you write on the parcel: which delivery service, which building, which room and a note for the clerk.',
      whatIsIt: 'A URL is a web address. It has parts. https is the protocol: how to talk. shop.example.com is the domain: which server. /products is the path: which page. ?id=42 is the query: extra details. #reviews is the fragment: a place on the page.',
      codeTitle: 'One URL, five parts',
      codeLanguage: 'Text',
      codeText: `https://shop.example.com/products?id=42#reviews

https              protocol  (how to talk)
shop.example.com   domain    (which server)
/products          path      (which page)
?id=42             query     (extra details)
#reviews           fragment  (where on the page)`,
      check: [
        { q: 'In https://example.com/about, what is the path?', a: '/about.' },
        { q: 'Which part names the server?', a: 'The domain, for example example.com.' },
      ],
    },
    {
      id: 'dns',
      label: 'DNS: the phone book',
      title: 'DNS: the phone book of the internet',
      analogy: 'You know your friend\'s name, but your phone needs a number to call. A phone book turns the name into the number. DNS is that phone book: it turns example.com into an IP address.',
      whatIsIt: 'People remember names. Computers need IP addresses. DNS (Domain Name System) answers the question "which IP address belongs to this name?". Your browser asks DNS first, then connects to the IP address.',
      demoType: 'web-foundations',
      demoTitle: 'Open a website',
      demoHint: 'Step through what happens after you press Enter in the address bar.',
      demoSteps: [
        { label: 'URL', detail: 'You type https://example.com and press Enter.', result: 'The browser knows the name.' },
        { label: 'DNS', detail: 'The browser asks DNS: which IP address has example.com?', result: 'The browser knows where to connect.' },
        { label: 'Connect', detail: 'The browser opens a connection to that IP address on port 443.', result: 'A line to the server is open.' },
        { label: 'Request', detail: 'The browser sends a request and gets the page back.', result: 'The page appears.' },
      ],
      check: [
        { q: 'What does DNS give back for a name like example.com?', a: 'An IP address.' },
      ],
    },
    {
      id: 'ports-localhost',
      label: 'Ports and localhost',
      title: 'Ports and localhost',
      whatIsIt: 'One computer can run many server programs. Each one listens on its own port. Web pages use 443 (https) or 80 (http). While you build an app, your own computer is the server. Its name is localhost. So http://localhost:3000 means: my own computer, the program on port 3000.',
      conceptSections: [
        { icon: 'fa-house', title: 'localhost', desc: 'Your own computer.', example: 'IP address 127.0.0.1' },
        { icon: 'fa-door-open', title: 'Port 443', desc: 'The usual door for https.', example: 'https://example.com' },
        { icon: 'fa-door-open', title: 'Port 3000, 5173, 8080', desc: 'Common doors for apps you build.', example: 'http://localhost:3000' },
      ],
      check: [
        { q: 'What does http://localhost:8080 mean?', a: 'Connect to my own computer, to the program that listens on port 8080.' },
        { q: '"Connection refused" on localhost:3000. What is a likely reason?', a: 'No program is listening on port 3000. Maybe the server is not started.' },
      ],
    },
    {
      id: 'https',
      label: 'HTTPS: the sealed envelope',
      title: 'HTTPS: the sealed envelope',
      analogy: 'http is a postcard: everyone who carries it can read it. https is a sealed envelope: only the receiver can open it.',
      whatIsIt: 'HTTPS is HTTP inside a locked tunnel called TLS. People on the same Wi-Fi can see that you talk to a server, but not what you say. Passwords and private data must always travel over https. The lock icon in the address bar shows it.',
      check: [
        { q: 'Why must a login page use https?', a: 'Otherwise the password travels as a readable postcard that others on the network could read.' },
      ],
      relatedIds: ['encryption-concepts'],
    },
    {
      id: 'deeper-ipv4-ipv6',
      label: 'Deeper: IPv4 and IPv6',
      title: 'Deeper: IPv4 and IPv6',
      whatIsIt: 'An IPv4 address has four numbers from 0 to 255, like 192.168.1.20. Each number is called an octet, because it fits in 8 bits. There are only about 4 billion IPv4 addresses. That is not enough, so IPv6 was made. An IPv6 address has eight groups of hexadecimal digits, like 2001:db8::1. :: is a short way to write a row of zero groups, and you may use it once.',
      codeTitle: 'Two address styles',
      codeLanguage: 'Text',
      codeText: `IPv4: 192.168.1.20
      192 . 168 . 1 . 20   four octets, each 0-255

IPv6: 2001:0db8:0000:0000:0000:0000:0000:0001
short 2001:db8::1          :: replaces the zero groups once`,
      checklist: ['Describe IPv4 octets and IPv6 hexadecimal groups.'],
    },
    {
      id: 'deeper-subnets',
      label: 'Deeper: subnets and CIDR',
      title: 'Deeper: subnets and CIDR',
      whatIsIt: 'A subnet is a smaller range of addresses inside a network, like one street in a town. CIDR notation writes a range as address/number. The number says how many bits at the start are the same for the whole range. 192.168.1.0/24 means: the first 24 bits are fixed, so the range is 192.168.1.0 to 192.168.1.255.',
      conceptSections: [
        { icon: 'fa-sitemap', title: '/24', desc: '256 addresses.', example: '192.168.1.0 - 192.168.1.255' },
        { icon: 'fa-sitemap', title: '/16', desc: '65,536 addresses.', example: '10.0.0.0 - 10.0.255.255' },
        { icon: 'fa-house-signal', title: 'Private ranges', desc: 'Used inside homes and offices, not on the open internet.', example: '192.168.x.x, 10.x.x.x' },
      ],
      checklist: ['Read 192.168.1.0/24 as a range of 256 addresses.'],
    },
    {
      id: 'deeper-tcp-udp',
      label: 'Deeper: TCP and UDP',
      title: 'Deeper: TCP and UDP',
      analogy: 'TCP is a registered letter: every box is counted, and lost boxes are sent again. UDP is throwing leaflets: fast, but some may get lost.',
      whatIsIt: 'TCP and UDP are two ways to send packets. TCP makes a connection first, keeps packets in order and resends lost ones. Web pages and APIs use TCP. UDP skips all that, so it is faster. Video calls and games often use UDP: a lost frame is better than a late one.',
      conceptSections: [
        { icon: 'fa-handshake', title: 'TCP', desc: 'Reliable, in order, a bit slower.', example: 'HTTP, email, file downloads' },
        { icon: 'fa-bolt', title: 'UDP', desc: 'Fast, no guarantee.', example: 'Video calls, games, DNS lookups' },
      ],
      checklist: ['Say one case for TCP and one for UDP.'],
    },
  ],
});
