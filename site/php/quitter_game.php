<?php
session_start();

if (isset($_SESSION["grid"])) {
    unset($_SESSION['grid']);
}

if (isset($_SESSION["word"])) {
    unset($_SESSION['word']);
}

if (isset($_SESSION['path'])) {
    unset($_SESSION['path']);
}

header("Location: ../index.php");