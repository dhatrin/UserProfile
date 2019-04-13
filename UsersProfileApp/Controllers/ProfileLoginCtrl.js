app.controller('ProfileLoginCtrl', ['$scope', 'serverRequestSvc', 'fileReaderSvc', '$window',
    function ($scope, serverRequestSvc, fileReaderSvc, $window) {

        var baseUrl = '/api';
        $scope.btnText = "Save";
        $scope.ImgSrc = "";
        $scope.ImageSave = "";

        //Saving information
        $scope.SaveUpdate = function () {
            var users = {
                UserName: $scope.UserName,
                Hobby: $scope.Hobby,
                UserPhoto: $scope.UserPhoto
            }
            if ($scope.btnText == "Save") {
                var apiRoute = baseUrl + '/SaveUser';
                var saveUser = serverRequestSvc.post(apiRoute, users);

                saveUser.then(function (response) {
                    if (response.data != "") {
                        alert("Data Save Successfully");
                        $scope.Clear();
                        $scope.GetUsers();
                    } else {
                        alert("Some error");
                    }
                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }

        $scope.Clear = function () {
            $scope.UserName = "";
            $scope.Hobby = "";
            $scope.UserPhoto = "";
        }

        //uploading image
        $scope.uploadImage = function (files) {
            for (var i = 0; i < files.length; i++) {

                var file = files[i];
                var reader = new FileReader();
                reader.onload = $scope.onImageLoad;
                reader.readAsDataURL(file);

            }
        }

        $scope.onImageLoad = function (e) {
            $scope.$apply(function () {
                $scope.ImgSrc = e.target.result;
               // $scope.UserPhoto = $scope.ImgSrc.replace("data:image/jpeg;base64,", "");
                $scope.UserPhoto  = $scope.ImgSrc.split(',')[1];
            });
        }

        $scope.GetAllUsers = function () {
            var url = $window.location. + '/UserProfile';
            $window.location = url;
        }
    
    }

]);  