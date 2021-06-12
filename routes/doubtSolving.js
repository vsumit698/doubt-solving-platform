const router = require('express').Router();

router.use('/doubt-solving',require('./api'));

// when request path does not matches
router.get('/',(req,res)=>{
    console.log('Path Not Found');
    res.status(200).json({message:'Path Not Found'});
});

module.exports = router;