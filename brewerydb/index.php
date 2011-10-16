<?php
require 'Slim/Slim.php';

Slim::init();

Slim::get('/(:endpoint)', function ($endpoint = null) {
    $params = Slim::request()->get();
    
    $url = "http://brewerydb.com/api/" . $endpoint . "?" . http_build_query($params);
    
    $stream = fopen($url, 'r');
    $metadata = stream_get_meta_data($stream);
    
    foreach ($metadata['wrapper_data'] as $header) {
        header($header);
    }
    
    echo stream_get_contents($stream);
});

Slim::run();