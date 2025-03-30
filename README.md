# MoneyLover - Personal Finance Management

MoneyLover is a personal finance management application, including both frontend and backend connected to a MySQL database.

## 1. Requirements

Before running the project, ensure you have installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [MySQL](https://www.mysql.com/)

## 2. Project Installation

### **2.1. Install Backend**

1. **Navigate to the backend directory**:
   ```sh
   cd server
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Create the **``** file and set environment variables**:
   ```sh
   cp .env.example .env
   ```
   Update your MySQL database credentials in `.env`.
4. **Run the server**:
   ```sh
   npm start
   ```

### **2.2. Install Frontend**

1. **Navigate to the frontend directory**:
   ```sh
   cd moneylover
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Start the frontend**:
   ```sh
   npm start
   ```

## 3. Important Dependencies

### **Backend Dependencies**

- `express` - Backend framework for Node.js
- `mysql2` - MySQL database connection
- `sequelize` - ORM for MySQL
- `dotenv` - Environment variable management
- `cors`, `body-parser` - Middleware for API handling

### **Frontend Dependencies**

- `react`, `react-dom` - React framework for UI
- `axios` - HTTP request handling
- `chart.js`, `recharts` - Data visualization libraries
- `styled-components` - CSS-in-JS styling

## 4. Useful Commands

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm install`   | Install dependencies              |
| `npm start`     | Run the server or frontend        |
| `npm run build` | Build the frontend for production |

## 5. Contact

For any issues, please create an issue or contact via email at [your-email@example.com](mailto\:your-email@example.com).

