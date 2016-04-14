angular.module("starter").factory("FileUtil", function($cordovaFile) {
  var util = {};

  util.fileNames = [];
  util.images = [];

  function getNewName() {
    var today = new Date();
    return today.getHours().toString() + today.getMinutes().toString() +
      today.getSeconds().toString() + ".jpg";
  };

  function saveFileNames(fileNames) {
    var lista = angular.toJson(fileNames);
    localStorage.setItem("fileNames", lista);
  };

  function loadFileNames() {
    var lista = localStorage.getItem("fileNames");
    return angular.fromJson(lista) || [];
  }

  function openImage(name, success) {
    $cordovaFile.readAsText(cordova.file.externalApplicationStorageDirectory, name).then(
      function(result) {
        success(result);
      },
      function(err) {
        console.log(err);
      }
    )
  };

  util.load = function() {
    util.fileNames = loadFileNames();

    for(var i = 0; i < util.fileNames.length; i++) {
      openImage(util.fileNames[i], function(dataUrl) {
        util.images.push(dataUrl);
      })
    }
  };

  util.save = function(dataUrl) {
    var name = getNewName();


    $cordovaFile.writeFile(cordova.file.externalApplicationStorageDirectory,
      name, dataUrl, true).then(
        function(result) {
          console.log("sucesso save");
          util.images.push(dataUrl);
          util.fileNames.push(name);
          saveFileNames(util.fileNames);
        },
        function(err) {
          console.log("erro ", err);
        }
      )
  };

  return util;
})
