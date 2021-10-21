const express = require('express')
const router = express.Router()
const Listing  = require('../models/Listings')


//get all listing
router.get('/', async (req,res) =>{
    try{
        const listing = await Listing.find()
        res.json(listing)
    }catch(err){
res.json(err)
    }
})

// Get a single listing 
router.get('/:listingId', async (req,res) =>{
    try{
        const listing = await Listing.findById(req.params.listingId)
        res.json(listing)
    }catch(error){
        console.log(res.json(error))
    }
})

//Add listing 
router.post('/', async  (req,res) =>{
try{
    const listing = new Listing({
        title:req.body.title,
        location: req.body.location,
        price: req.body.price ,
        bedrooms: req.body.bedrooms,
        bathroom: req.body.bathroom,
        toilets: req.body.toilets,
        serviced: req.body.serviced,
        furnished: req.body.furnished,
        agent_id: req.body.agent_id,
        type: req.body.type,
        img_src: req.body.img_src


        
    });
    const  newListing = await listing.save()
    res.json(newListing)
}catch(err){
    res.json(err)
}
});

// Delete Listing 
router.delete('/:listingId', async (req,res)=>{
    try{
        const deletedListing = await Listing.deleteOne({_id: req.params.listingId})
        res.json(deletedListing)
    }catch(error){
        res.json(error)
    }
})

//Update one lisitng
router.patch('/:listingId', async (req,res)=>{
    try{
        const updatedListing = await Listing.updateOne(
            {_id: req.params.listingId},
            { $set: { title: req.body.title }
        });
        res.json(updatedListing)

    }catch(error){
        res.json(error)
    }
})


// router.get('/sell',(req,res) =>{
//     res.send('Sell lisitng')
// })
// router.get('/rent',(req,res) =>{
//     res.send('rent lisitng')
// })
// router.get('/lease',(req,res) =>{
//     res.send('lease lisitng')
// })
// router.get('/jv',(req,res) =>{
//     res.send('jv lisitng')
// })
// router.get('/shortlet',(req,res) =>{
//     res.send('shortlet lisitng')
// })
module.exports = router;