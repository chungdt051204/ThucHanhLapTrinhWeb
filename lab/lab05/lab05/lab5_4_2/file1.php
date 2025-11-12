<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form nhập liệu</title>
  </head>
  <body>
    <form action="" method="get">
      <label for="name">Tên sản phẩm:</label>
      <input type="text" name="name" placeholder="Nhập tên sản phẩm" /><br />
      <label for="find">Cách tìm:</label>
      <input type="radio" name="find" value="0" />gần đúng
      <input type="radio" name="find" value="1" />chính xác<br />
      <label for="category">Loại sản phẩm:</label>
      <select name="category" id="">
        <option value="0">tatca</option>
        <option value="1">loại 1</option>
        <option value="2">loại 2</option>
        <option value="3">loại 3</option></select
      ><br />
      <input type="submit" value="submit" />
    </form>
    <?php
      $name = $_GET["name"] ?? "";//Nếu tồn tại $_GET["name"] thì gán $name=$_GET["name"] ngược lại gán $name=""
      $find = "";//Khai báo biến $find rỗng
      if(isset($_GET["find"]))//Nếu tồn tại $_GET["find"
        $find = $_GET["find"] === "0" ? "gần đúng" : "chính xác";//Nếu $_GET["find"] bằng 0 thì gán 
        //$find bằng gần đúng ngược lại gán $find bằng chính xác
      $category = "";//Khai báo biến $category rỗng
      if(isset($_GET["category"])){//Nếu tồn tại $_GET["category"
        if($_GET["category"] === "0")//Nếu $_GET["category"] bằng 0 thì gán $category là chưa chọn sản phẩm
        $category = "Chưa chọn loại sản phẩm";
        if($_GET["category"] === "1")//Nếu $_GET["category"] bằng 1 thì gán $category là loại 1
          $category = "loại 1";
        if($_GET["category"] === "2")//Nếu $_GET["category"] bằng 2 thì gán $category là loại 2
          $category = "loại 2";
        if($_GET["category"] === "3")//Nếu $_GET["category"] bằng 3 thì gán $category là loại 3
          $category = "loại 3";
      }
      if($name !== "" && $find != "" && $category != ""){//Nếu $name, $find và $category khác rỗng thì xuất ra thông tin bên dưới
        echo "Tên sản phẩm: $name <br>";
        echo "Cách tìm: $find <br>";
        echo "Loại sản phẩm: $category";
      } 
     ?>
  </body>
</html>
