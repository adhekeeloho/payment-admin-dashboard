# Payment Admin Dashboard

This project is a responsive Payment Admin Dashboard built with Next.js and Tailwind CSS. It features a collapsible sidebar, a top navigation bar, and a main content area that displays various metrics, transaction data, and visualizations.

## Features

- **Collapsible Sidebar**: Navigate through different sections of the dashboard including Dashboard, Transactions, Customers, Payouts, and Settings.
- **Top Navigation Bar**: Includes a global search bar, notification toggle, and user profile dropdown for easy access to user settings.
- **Metric Cards**: Displays key performance indicators such as Total Revenue, Active Subscriptions, Pending Payouts, and Churn Rate.
- **Transaction Table**: A sortable table that presents transaction details including Transaction ID, Customer, Date, Amount, and Status.
- **Revenue Graph**: Visual representation of revenue over time, providing insights into financial performance.
- **Filters**: Date range picker and status dropdowns for filtering transaction data.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

To get started with the Payment Admin Dashboard, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd payment-admin-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:3000` to view the dashboard.

## Folder Structure

- `src/app`: Contains the main application files including layout and global styles.
- `src/components`: Contains reusable components such as sidebar, top navigation, metric cards, transaction table, revenue graph, and filters.
- `src/types`: Contains TypeScript interfaces and types for type safety across the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.