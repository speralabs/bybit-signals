// create router
const router = require('express').Router();
// Import body parser
const express = require('express');

router.use(express.urlencoded({ extended: true }));
router.use(express.json({ limit: '50mb' }));
router.use(express.json());
router.use(
  express.text({
    limit: '50mb',
    type: '*/xml',
  })
);

// set card routes
router.use('/currency', require('../src/currency/currency.router'));

module.exports = router;
