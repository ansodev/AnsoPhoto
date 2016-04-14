// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})

.directive("filterBar", function() {
  return {
    restrict: "E",
    templateUrl: "components/filter-bar.html"
  }
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("HomeController", function($scope, FileUtil, $ionicModal) {
  ionic.Platform.ready(function(){
    FileUtil.load();
    $scope.images = FileUtil.images;
  });

  $ionicModal.fromTemplateUrl("image-modal.html", {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.showModal = function(image) {
    $scope.imageModal = image;
    $scope.modal.show();
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

})

.controller("CameraController", function($scope, ImageUtil, FileUtil, $ionicTabsDelegate) {
  $scope.onTabSelect = function() {
    $scope.imageCamera = undefined;

    ImageUtil.getImage(ImageUtil.cameraOptions.CAMERA, function(imageData) {
      console.log("sucesso");
      $scope.imageCamera = "data:image/jpeg;base64," + imageData;
      ImageUtil.filterImage("imageCamera", 0);
    },
    function(err) {
      console.log(err);
      $ionicTabsDelegate.select(0);
    }
  );
};

  $scope.onFilter = function(option) {
    ImageUtil.filterImage("imageCamera", option);
  };

  $scope.onSave = function() {
    var canvas = document.getElementById("imageCamera");
    var dataUrl = canvas.toDataURL();
    FileUtil.save(dataUrl);
    $ionicTabsDelegate.select(0);
  };

})

.controller("GalleryController", function($scope, ImageUtil, FileUtil, $ionicTabsDelegate) {
  $scope.onTabSelect = function() {
    $scope.imageGallery = undefined;
    ImageUtil.getImage(ImageUtil.cameraOptions.GALLERY, function(imageData) {
      $scope.imageGallery = "data:image/jpeg;base64," + imageData;
      ImageUtil.filterImage("imageGallery", 0);
    },
    function(err) {
      console.log(err);
      $ionicTabsDelegate.select(0);
    }
  );
};

  $scope.onFilter = function(option) {
    ImageUtil.filterImage("imageGallery", option);
  };

  $scope.onSave = function() {
    var canvas = document.getElementById("imageGallery");
    var dataUrl = canvas.toDataURL();
    FileUtil.save(dataUrl);
    $ionicTabsDelegate.select(0);
  }
})
