<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lab5_1</title>
  </head>
  <body>
    <?php
      $a = ["a" => 1, "b" => 3, "c" => 5, "d" => 7, "e" => 9];//Khai báo mảng $a có 5 phần tử
      function showArray($arr){//Khai báo hàm showArray
        ?>
          <table border=1>
            <!-- Hàng 1 cột 1 là Index, cột 2 là Value -->
            <tr>
              <td>Index</td>
              <td>Value</td>
            </tr>
            <?php
                foreach($arr as $k => $v){//Duyệt từng phần tử trong mảng $a
                  ?>
                  <tr>
                    <!-- Mỗi hàng ở cột Index sẽ xuất ra vị trí của phần tử trong mảng $a -->
                     <!-- Mỗi hàng ở cột Value sẽ xuất ra giá trị của phần tử trong mảng $a  -->
                    <td><?php echo $k ?></td>
                    <td><?php echo $v ?></td>
                  </tr>
                  <?php
                }
            ?>
          </table>
        <?php 
      }
      showArray($a);
     ?>
  </body>
</html>
