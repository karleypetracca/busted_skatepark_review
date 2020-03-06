const express = require('express'),
  router = express.Router(),
  Parks = require('../models/parks');

router.get('/', async (req, res, next) => {
  const parkData = await Parks.getAll();

  res.render('template', {
    locals: {
      title: 'List of Parks',
      parkData: parkData
    },
    partials: {
      partial: 'partial'
    }
  });
});

router.get('/:park_id?', async (req, res, next) => {
  const { park_id } = req.params;
  const parkData = await Parks.getById(park_id);
  const reviewData = await Parks.getReviewsById(park_id);

  res.render('template', {
    locals: {
      title: parkData.name,
      parkData: parkData,
      reviewData: reviewData
    },
    partials: {
      partial: 'partial-single-park'
    }
  });
});

module.exports = router;
