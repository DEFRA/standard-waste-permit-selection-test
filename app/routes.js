var express = require('express')
var router = express.Router()


// HOME ==============================================================
router.get('/', function (req, res) {
  res.render('index',{
    "formAction":"/category"
  }) 
})


// Select category ==============================================================

router.get('/category', function (req, res) {
  var catobj={"formAction":"/permit"}
  if( typeof req.query['back']==='undefined' ) {
    catobj.back = 0
  } else {
    catobj.back = req.query['back']
  }
  
  if( typeof req.query['oldcat']==='undefined' ) {
  } else {
    catobj.oldcat = req.query['oldcat']
  }
  
  res.render('category',catobj) 
})


// Select permit ==============================================================

router.get('/permit', function (req, res) {
  if(typeof req.query['cat']==='undefined'){  // simple error handling
    res.redirect('error')
  } else {
      var permobj={"formAction":"/found"}
      permobj.cat = req.query['cat']
      if( typeof req.query['back']==='undefined' ) {
      } else {
        permobj.back = req.query['back']
      }
      
      if( typeof req.query['oldcat']==='undefined' ) {
      } else {
        permobj.oldcat = req.query['oldcat']
      }
      
      res.render('permit',permobj)    
  }
})


// Found or error ==============================================================

router.get('/found', function (req, res) {
    res.render('found',{
      "qS":encodeURI( JSON.stringify(req.query) )
    })    
})

router.get('/notfound', function (req, res) {
    res.render('notfound',{
      "qS":encodeURI( JSON.stringify(req.query) )
    })    
})

router.get('/error', function (req, res) {
    res.render('error',{
      "qS":encodeURI( JSON.stringify(req.query) )
    })    
})

router.get('/thanks', function (req, res) {
    res.render('thanks',{
      "qS":encodeURI( JSON.stringify(req.query) )
    })    
})








// Permit search ===================================================================

router.get('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{ 
      "formAction": "/search-permit/index"
    })
})

router.post('/search-permit/index', function (req, res) {
    res.render(folder + '/search-permit/index',{ 
      "formAction":"/search-permit/index",
      "searchTerm":req.body.searchTerm 
    })
})


module.exports = router
