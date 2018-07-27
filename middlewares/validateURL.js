const { URL } = require('url');
const dns = require('dns');

module.exports = (req, res, next) => {
  const inputURL = req.body.url;

  try {
    const myURL = new URL(inputURL);
    dns.lookup(myURL.hostname, (err) => {
      if (err) return res.status(422).json({error: 'invalid URL'});
      next();
    });
  } catch(err) {
    res.status(422).json({error: 'invalid URL'});
  }
};