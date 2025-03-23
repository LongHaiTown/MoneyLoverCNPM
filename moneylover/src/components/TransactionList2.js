import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";

function TransactionsList2() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getExpenses()
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Lỗi khi lấy giao dịch:", err));
  }, []);

  return (
    <div className="transactions-container">
      <h2>Danh sách giao dịch</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Số tiền</th>
            <th>Ngày</th>
            <th>Danh mục</th>
            <th>Loại</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.transaction_id}>
              <td>{t.transaction_id}</td>
              <td>{t.title}</td>
              <td>{t.amount}</td>
              <td>{t.date}</td>
              <td>{t.category_name}</td>
              <td
                style={{
                  color: t.category_type === "income" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {t.category_type === "income" ? "Thu nhập" : "Chi tiêu"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsList2;
