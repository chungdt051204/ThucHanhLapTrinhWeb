<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab5_2</title>
</head>
<body>
    <?php
        $arr= array();
        $r = array("id"=> "sp1", "name "=> "Sản phẩm 1 ");
        $arr[] = $r;
        $r = array("id"=> "sp2", "name "=> "Sản phẩm 2 ");
        $arr[] = $r;
        $r = array("id"=> "sp3", "name "=> "Sản phẩm 3 ");
        $arr[] = $r;
        ?>
            <table border=1>
               <tr>
                <!-- Hàng đầu tiên cột 1 là Stt, cột 2 là Mã sản phẩm, cột 3 là Tên sản phẩm -->
                <td>Stt</td>
                <td>Mã sản phẩm</td>
                <td>Tên sản phẩm</td>
               </tr>
               <?php
                for($i = 0; $i < count($arr); $i++){//Duyệt qua từng phần tử trong mảng $arr
                    ?>
                        <tr>
                            <!-- Cột 1 mỗi hàng là vị trí i + 1 -->
                            <!-- Cột 2 mỗi hàng là giá trị tại vị trí i có key = "id" trong mảng -->
                            <!-- Cột 3 mỗi hàng là giá trị tại vị trí i có key = "name " trong mảng -->
                            <td><?php echo $i + 1 ?></td>
                            <td><?php echo $arr[$i]["id"] ?></td>
                            <td><?php echo $arr[$i]["name "] ?></td>
                        </tr>
                    <?php
                }
                ?>
            </table>
        <?php
     ?>
</body>
</html>