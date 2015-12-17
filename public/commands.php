<?php

$command = $_GET['command'];

switch ($command) {
    case lights:
        echo "lights";
        break;
    case tv:
        echo "tv";
        break;
    case white:
        echo "white";
        break;
    case strobe:
        echo "strobe";
        break;
    case fade:
        echo "fade";
        break;
    case bpm:
        echo "bpm";
        break;
    case red:
        echo "red";
        break;
    case green:
        echo "green";
        break;
    case blue:
        echo "blue";
        break;
    case "dark-red":
        echo "dark-red";
        break;
    case "light-green":
        echo "light-green";
        break;
    case "light-blue":
        echo "light-blue";
        break;
    case "darkest-red":
        echo "darkest-red";
        break;
    case "lightest-green":
        echo "lightest-green";
        break;
    case "dark-blue":
        echo "dark-blue";
        break;
    case orange:
        echo "orange";
        break;
    case "blue-green":
        echo "blue-green";
        break;
    case purple:
        echo "purple";
        break;
    case yellow:
        echo "yellow";
        break;
    case turquoise:
        echo "turquoise";
        break;
    case pink:
        echo "pink";
        break;
    default:
        echo $command . " is not a command";
}

?>
