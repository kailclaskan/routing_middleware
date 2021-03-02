const express = require('express');
const items = require('./fakeDb');
const router = new express.Router();

router.get('/', (req, res) => {
    return res.json(global.items);
});

router.post('/', (req, res) => {
    item = req.body
    global.items.push(item);
    return res.json({"added": { item }});
});

router.get('/:name', (req, res) => {
    let item = global.items.find(i => i.name === req.params.name);
    return res.json(item);
});

router.patch('/:name', (req, res) => {
    let item = global.items.find(i => i.name === req.params.name);
    item.name = req.body.name;
    item.price = req.body.price;
    return res.json({"updated": {item}})
});

router.delete('/:name', (req, res) => {
    let item = global.items.find(i => i.name === req.params.name);
    items.splice(item, 1);
    return res.json({ message: "Deleted"})
});

module.exports = router;