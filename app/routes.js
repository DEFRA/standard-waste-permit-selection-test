var express = require('express')
var router = express.Router()

var request = require('request')

// this file deals with all paths starting /version_x
// How to use folder variable:
// res.redirect( '/' + folder + '/exemptions/add_exemptions');
var folder = "";

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.folder=folder
  
  // check for an existing permit object stored in session
  // if it does not exist, create it
  var permit = req.session.permit
  if (!permit) {
    permit = req.session.permit = {}
  }
  
  next()
});


// CLEAR SESSION ==============================================================
router.get('/cls', function (req, res) {
  req.session.destroy()
  res.render('index')
})


// Select permit ==============================================================


// required for 'select a different permit' via task list
router.get('/selectpermit/permit-category2', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] 
    res.render(folder + '/selectpermit/permit-category2',{
      "formAction":"/"+ folder + "/selectpermit/choose-permit2",
      "chosenPermitID":req.body['chosenPermitID'],
      "permit":req.session.permit // always send permit object to page
    }) 
})

// The POST version
router.post('/selectpermit/permit-category2', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] 
    // permit NOT YET selected
    if( req.session.permit['chosenPermitID']==null ) {
      res.render(folder + '/selectpermit/permit-category2',{
        "formAction":"/"+ folder + "/selectpermit/choose-permit2",
        "permit":req.session.permit // always send permit object to page
      })
    // permit set via link on a GOV.UK page so skip this page
    } else {
      res.render(folder + '/check/task-list',{ // show save and return pages
         "formAction":"/"+ folder + "/check/check-answers",
         "chosenPermitID":req.body['chosenPermitID'],
         "permit":req.session.permit // always send permit object to page
      })
    }
})



router.post('/selectpermit/permit-category2', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] // add form entries to session 
  res.render(folder + '/selectpermit/permit-category2',{
    "formAction":"/"+ folder + "/selectpermit/choose-permit2",
    "permit":req.session.permit // always send permit object to page
  })
})

// also a get
router.get('/selectpermit/permit-category2', function (req, res) {
  for(var input in req.body) req.session.permit[input] = req.body[input] // add form entries to session 
  res.render(folder + '/selectpermit/permit-category2',{
    "formAction":"/"+ folder + "/selectpermit/choose-permit2",
    "permit":req.session.permit // always send permit object to page
  })
})


router.post('/selectpermit/choose-permit', function (req, res) {
  if(typeof req.body['chosenCategory']==='undefined'){  // simple error handling
    res.render(folder + '/error/index',{ 
        "errorText":"Please say what you want the permit for"
    })
  } else {
    res.render(folder + '/selectpermit/choose-permit',{
      "formAction":"/"+ folder + "/check/save-permit-details",
      "chosenCategory":req.body['chosenCategory']
    })    
  }
})

router.post('/selectpermit/choose-permit2', function (req, res) {
  if(typeof req.body['chosenCategory']==='undefined'){  // simple error handling
    res.render(folder + '/error/index',{ 
        "errorText":"Please say what you want the permit for"
    })
  } else {
    res.render(folder + '/selectpermit/choose-permit2',{
      "formAction":"/"+ folder + "/check/save-permit-details",
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
      "formAction":"/"+ folder + "/search-permit/index",
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
