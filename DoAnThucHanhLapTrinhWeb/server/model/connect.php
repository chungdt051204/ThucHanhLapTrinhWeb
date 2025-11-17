<?php
function connectdb(){
   $servername = "localhost";
   $username = "root";
   $password = "";
   try {
      $conn = new PDO("mysql:host=$servername;dbname=shopthoitrang", $username, $password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   } catch (PDOException $th) {
      echo "Kết nối thất bại: ".$th->getMessage();
      return null;
   }
   return $conn;
}
connectdb();
?>
