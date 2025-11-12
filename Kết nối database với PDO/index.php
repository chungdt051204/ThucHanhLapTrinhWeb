<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Trang danh sách sản phẩm</title>
</head>
<body>
    <?php
        include_once "./model/connection.php";
        include_once "./model/product.php";
        $products = getProducts();
        ?>
            <div class="product-track">
                <?php 
                    foreach($products as $v){
                        ?>
                            <div class="product-item">
                                <img src=<?php echo $v["image_url"] ?> alt="" width="150" height="200">
                                <h2><?php echo $v["name"] ?></h2>
                            </div>
                        <?php
                    }   
                 ?>
            </div>
        <?php
     ?>
</body>
</html>