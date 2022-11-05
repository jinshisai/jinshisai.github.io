<?php

function getpageurl(){
     // https or http
     if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
          $url = "https://";
     } else {
          $url = "http://";
     }

     // Append the host(domain name, ip) to the URL.
     $url .= $_SERVER['HTTP_HOST'];

     // Append the requested resource location to the URL
     $url .= $_SERVER['REQUEST_URI'];

     echo $url;
}

function getdirurl(){
     // https or http
     if (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') {
          $url = "https://";
     } else {
          $url = "http://";
     }

     // Append the host(domain name, ip) to the URL.
     $url .= $_SERVER['HTTP_HOST'];

     // Append the requested resource location to the URL
     $url .= substr($_SERVER["REQUEST_URI"],0,strrpos($_SERVER["REQUEST_URI"],"/")+1);

     echo $url;
}

?>