(function () {
    'use strict';
    angular
        .module('autocompleteCustomTemplateDemo', ['ngMaterial'])
        .controller('DemoCtrl', DemoCtrl);
    function DemoCtrl ($timeout, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        self.repos         = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for repos... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }
        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }
        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function loadAll() {
            var repos =[
                {"name":"CVS",
                    "address": {
                        "city": "Milwaukee", "street":"Cambridge", "number":"130"
                    },
                    "phone":"222 222 2222",
                    "medicines":
                        {
                            "name":"iboprufeno",
                            "status": "available",
                            "price":"5.00"
                        }
                },
                {"name":"Walmart",
                    "address": {
                        "city": "Milwaukee", "street":"Riverview", "number":"20"
                    },
                    "phone":"333 333 3333",
                    "medicines":
                        {
                            "name":"tylenol",
                            "status": "unavailable",
                            "price":"2.00"
                        }
                }
            ];
            return repos.map( function (repo) {
                repo.value = repo.name.toLowerCase();
                return repo;
            });
        }
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();