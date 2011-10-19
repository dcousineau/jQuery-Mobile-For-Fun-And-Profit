<?php
require 'Slim/Slim.php';

Slim::init();

Slim::get('/(:endpoint)(/:id)', function ($endpoint = null, $id = null) {
    $params = Slim::request()->get();
    
    $url = "http://www.brewerydb.com/api/" . $endpoint;
    
    if ($id)
        $url .= "/" . $id;
    
    $url .= "?" . http_build_query($params);
    
    $stream = fopen($url, 'r');
    $metadata = stream_get_meta_data($stream);
    
    foreach ($metadata['wrapper_data'] as $header) {
        header($header);
    }
    header('Access-Control-Allow-Origin: *');
    
    echo stream_get_contents($stream);
});

Slim::run();