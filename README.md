# Food Order App

A simple React-based food ordering application that allows users to browse meals, add items to a cart, and place orders. The app demonstrates modern React features such as context, hooks, and async HTTP requests, with a Node.js backend for data persistence.

## Features

- Browse a list of available meals
- Add meals to a shopping cart
- View and update cart items
- Checkout and submit orders
- Responsive UI with modal dialogs
- Error handling for failed requests

## Technologies

- **Frontend:** React (Context API, Hooks)
- **Backend:** Node.js, Express
- **Styling:** CSS (custom styles, Google Fonts)
- **Build Tool:** Vite

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/food-order-app.git
   cd food-order-app/19-FoodOrderApp
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   cd backend
   npm install
   node app.js
   ```

4. Start the frontend:
   ```sh
   cd ..
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/` – React components, context, hooks, and utility functions
- `backend/` – Express server and API endpoints
- `public/` – Static assets (images, icons)
- `data/` – JSON files for meals and orders

## License

This project is licensed under the MIT License.

---

**Note:** For full functionality, ensure both frontend and backend servers are running.
