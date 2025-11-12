<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab5_3</title>
</head>
<body>
    <?php
    $n = 10;//Tổng số lượng câu hỏi
    $m = 5;//Số câu hỏi cần lấy ra để in trong đề thi (m < n)
    // Mảng chứa danh sách các câu hỏi trắc nghiệm
    $questions = [
        "1" => "PHP là viết tắt của gì?",
        "2" => "Lệnh nào dùng để in ra màn hình trong PHP?",
        "3" => "Biến trong PHP bắt đầu bằng ký tự nào?",
        "4" => "Câu lệnh nào để khai báo mảng trong PHP?",
        "5" => "Hàm nào dùng để đếm số phần tử trong mảng?",
        "6" => "PHP được chạy chủ yếu ở phía nào (client/server)?",
        "7" => "Cặp thẻ PHP được mở bằng ký hiệu nào?",
        "8" => "Câu lệnh nào dùng để kiểm tra điều kiện trong PHP?",
        "9" => "Hàm nào dùng để lấy độ dài chuỗi?",
        "10" => "Câu lệnh nào dùng để lặp qua mảng trong PHP?"
    ];
    // Hàm array_rand() sẽ chọn ngẫu nhiên $m khóa (key) trong mảng $questions
    // Kết quả trả về là một mảng chứa các chỉ số (key) được chọn ngẫu nhiên
    $random_keys = array_rand($questions, $m);
    // Tiêu đề của đề thi
    echo "<h2>Đề thi trắc nghiệm ($m/$n câu)</h2>";
    // Thẻ <ol> tạo danh sách có đánh số tự động
    echo "<ol>";
    // Duyệt qua từng khóa (key) ngẫu nhiên trong mảng $random_keys
    foreach ($random_keys as $k) {
        // In ra câu hỏi tương ứng với mỗi key
        echo "<li>" . $questions[$k] . "</li>";
    }
    // Đóng thẻ danh sách
    echo "</ol>";
    ?>
</body>
</html>

