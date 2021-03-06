var express = require('express')
var router = express.Router()

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  //res.locals.surveyURL="https://www.smartsurvey.co.uk/s/TELLUS/?surveydata="
  res.locals.surveyURL="https://www.smartsurvey.co.uk/s/TELLUS/?"
  next()
});


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

// VARS
// back
// oldcat
// cat
// permit
// page

function createURL(query){
  return Object.keys(query).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(query[k])
  }).join('&')
}

router.get('/found', function (req, res) {
    req.query.page = 'found'
    res.render('found',{
      "qS":createURL(req.query)
    })
})

router.get('/notfound', function (req, res) {
    req.query.page = 'notfound'
    res.render('notfound',{
      "qS":createURL(req.query)
    })
})

router.get('/error', function (req, res) {
    req.query.page = 'error'
    res.render('error',{
      "qS":createURL(req.query)
    })
})

router.get('/thanks', function (req, res) {
    req.query.page = 'thanks'
    res.render('thanks',{
      "qS":createURL(req.query)
    })
})


module.exports = router
