const express = require('express'),
  router = express.Router(),
  parksModel = require('../models/parks');

/* GET home page. */
router.get('/', async (req, res, next) => {
  let parkList = [];
  parkList = await parksModel.getAll();
  console.log(parkList);

  res.render('template', {
    locals: {
      title: 'Time to shred bruh!',
      parkData: parkList
    },
    partials: {
      partial: 'partial-index'
    }
  });
});

module.exports = router;
