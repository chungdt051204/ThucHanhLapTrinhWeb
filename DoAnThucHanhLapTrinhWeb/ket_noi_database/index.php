<?php
include_once "model/connect.php";
include_once "model/product.php";
connectdb();
$products = getproducts();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="index.css">
    <title>Danh sách sản phẩm</title>
</head>
<body>
    <div class="product-container">
        <?php 
            foreach($products as $v){
                ?>
                <div class="product-item">
                    <img src="<?php echo $v["image_url"]; ?>" alt="" width="150" height="200">
                    <h2><?php echo $v["name"]; ?></h2>
                </div>
                <?php
            }
        ?>
    </div>
</body>
</html>
