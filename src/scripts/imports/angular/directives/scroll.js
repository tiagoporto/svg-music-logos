import app from '../app.js'

app.directive('onScroll', function ($document) {
  return {
    restrict: 'A',
    link (scope, element, attrs) {
      $document.bind('scroll', function () {
        scope.$apply(attrs.onScroll)
      })
    }
  }
})
