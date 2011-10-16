(function(exports, undefined) {
    
    function BreweryDB(apiKey) {
        this._apiKey = apiKey;
    }
    
    //BreweryDB.url = "http://www.brewerydb.com/api/";
    BreweryDB.url = "http://localhost/jquerymobile/brewerydb/index.php/";
    
    BreweryDB.prototype.search = function(options) {
        options = $.extend({
            success:    function() {},
            failure:    function() {},
            query:      null,
            searchType: null,
            metadata:   true,
            page:       null
        }, options);
        
        if( !(options.searchType in {brewery: null, beer: null}) && options.searchType !== null )
            throw new Error("Invalid type " + options.searchType);
        
        var params = {
            apikey: this._apiKey,
            format: 'json',
            type:   options.searchType,
            q:      options.query
        };
        
        if( options.page )
            params.page = options.page;
        
        if( options.metadata )
            params.metadata = options.metadata;
        
        $.ajax({
            url:      BreweryDB.url + "search",
            type:     'GET',
            dataType: 'json',
            data:     params,
            success:  options.success,
            failure:  options.failure
        });
    };
    
    BreweryDB.prototype.breweries = function(options) {
        options = $.extend({
            success:  function() {},
            failure:  function() {},
            page:     null,
            metadata: false,
            since:    null,
            geo:      null
        }, options);
        
        if( options.geo ) {
            if( !options.geo.lat || !options.geo.lng ) {
                throw new Error("To use geo-location, you must provide an object with [lat] and [lng]");
            }
            
            options.geo = $.extend({
                radius: 50,
                units:  'm'
            }, options.geo);
        }
        
        var params = {
            apikey: this._apiKey,
            format: 'json'
        };
        
        if( options.page )
            params.page = options.page;
        
        if( options.metadata )
            params.metadata = options.metadata;
        
        if( options.since )
            params.since = options.since;
        
        if( options.geo ) {
            params.geo    = true;
            params.lat    = options.geo.lat;
            params.lng    = options.geo.lng;
            params.radius = options.geo.radius;
            params.units  = options.geo.units;
        }
        
        $.ajax({
            url: BreweryDB.url + "breweries",
            type: 'GET',
            dataType: 'json',
            data: params,
            success: options.success,
            failure: options.failure
        });
    };
    
    exports.BreweryDB = BreweryDB;
    
    
    //For presentation purposes
    exports.db = new BreweryDB('566d6fb707fa568ce52eb49fc56f5712');
})(window);