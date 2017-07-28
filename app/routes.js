var express = require('express')
var router = express.Router()

router.use(function (req, res, next) {
  // check for an existing permit object stored in session
  // if it does not exist, create it
  var permit = req.session.permit
  if (!permit) {
    permit = req.session.permit = {}
  }
  
  next()
});

// HOME ==============================================================
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index',{
    "formAction":"/permit-category"
  }) 
})


// Select permit ==============================================================


// The POST version
router.post('/permit-category', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] 
    res.render('permit-category',{
      "formAction":"/permit-list",
      "permit":req.session.permit // always send permit object to page
    }) 
})

// The GET version - for link back
router.get('/permit-category', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] 
    res.render('permit-category',{
      "formAction":"/permit-list",
      "permit":req.session.permit // always send permit object to page
    }) 
})

router.post('/permit-list', function (req, res) {
  if(typeof req.body['chosenCategory']==='undefined'){  // simple error handling
    res.render(folder + '/error/index',{ 
        "errorText":"Please say what you want the permit for"
    })
  } else {
    res.render('permit-list',{
      "formAction":"/xxxxxxxx",
      "chosenCategory":req.body['chosenCategory']
    })    
  }
})

// Permit search ===================================================================

router.get('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{ 
      "formAction":"/"+ folder + "/search-permit/index"
    })
})

router.post('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{ 
      "formAction":"/search-permit/index",
      "searchTerm":req.body.searchTerm 
    })
})

// Send permit data in session to every page ==================================
router.all('*', function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.permit=req.session.permit
  next()
});


module.exports = router
