app.controller('UsersCtrl', ['$scope','serverRequestSvc',
    function ($scope, serverRequestSvc) {
        $scope.Message = 'Hello World';
        var baseUrl = '/api';
        $scope.btnText = "Save";
        $scope.UserId = 0;
        $scope.usersList = [];
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
        $scope.GetUsers = function () {
            var apiRoute = baseUrl + '/UsersAPI';
            var user = serverRequestSvc.getAll(apiRoute);
            user.then(function (response) {
               
                $scope.usersList = response.data;
            }, function (error) {
                console.log("Error: " + error);
            });
        }
        $scope.GetUsers();
        $scope.DeleteUser = function (item) {
            var apiRoute = baseUrl + '/DeleteUser/' + item.UserId;
            var deleteUser = serverRequestSvc.delete(apiRoute);
            deleteUser.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.GetUsers();
                    $scope.Clear();
                } else {
                    alert("Some error");
                }
            }, function (error) {
                console.log("Error: " + error);
            });
        }
    }

]);  