import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div>
        <h1>Lỗi 404: Trang này không tồn tại</h1>
        <Link to="dashboard/overall">Đi đến trang quản trị</Link>
    </div>
  )
}

export default ErrorPage