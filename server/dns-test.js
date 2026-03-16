const dns = require('dns');

const hostname = '_mongodb._tcp.problem.ffv3d7q.mongodb.net';

console.log('Attempting to resolve SRV record for:', hostname);

dns.resolveSrv(hostname, (err, addresses) => {
  if (err) {
    console.error('DNS Resolution Error:', err);
    process.exit(1);
  }
  console.log('Resolved addresses:', addresses);
  process.exit(0);
});
