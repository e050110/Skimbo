'use strict';

define(["app"], function(app) {
  app.directive('onKeyPress', ['ArrayUtils', function($arrayUtils) {

    var allCallback = {};

    function findIndexCallback(charCode, element) {
      var index = $arrayUtils.indexOfWith(allCallback[charCode], element, function(element1, element2) {
        return (element1.globalKey == "true" || angular.equals(element1.element, element2));
      });
      return index;
    }

    function findCallback(charCode, element) {
      var index = findIndexCallback(charCode, element);
      if(index > -1) {
        return allCallback[charCode][index];
      }
    }

    function deleteCallback(charCode, element) {
      var index = findIndexCallback(charCode, element);
      if(index > -1) {
        allCallback[charCode].splice(index, 1);
      }
    }

    document.onkeypress = function(e) {
      e = e || window.event;
      var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
      if (charCode) {
        var obj = findCallback(charCode, angular.element(e.target));
        if(obj !== undefined) {
          var element = obj.element;
          var ctrlKeyCheck = obj.ctrlKeyCheck;
          var scope = obj.scope;
          var onKeyPressExec = obj.onKeyPressExec;

          //console.log("Character typed: " + charCode);

          if((ctrlKeyCheck == true && e.ctrlKey) || 
              ctrlKeyCheck != true) {
            scope.$eval(onKeyPressExec);
            e.stopPropagation();
            e.preventDefault();
          }
        }
      }
    }

    return {
      restrict : 'A',
      link : function($scope, $element, $attr) {
        allCallback[$attr.onKeyPress] = allCallback[$attr.onKeyPress] || [];
        allCallback[$attr.onKeyPress].push({
          ctrlKeyCheck: $attr.ctrlKeyCheck,
          scope: $scope,
          onKeyPressExec: $attr.onKeyPressExec,
          element: $element,
          globalKey: $attr.globalKey
        });
        $element.bind("$destroy", function() {
          deleteCallback($attr.onKeyPress, $element);
        });
      }
    }
  }]);
});