# Log Viewer Application

A React-based log viewer for filtering, searching, and customizing log data.

## 🚀 Features

- **Severity Filtering:** Quickly filter logs by severity (DEBUG, INFO, WARN, ERROR) using the sidebar.
- **Search:** Debounced full-text search across log messages.
- **Customizable Table:** Toggle visibility of Date, Severity, and Message columns.
- **Pagination:** Efficiently loads logs in pages for performance.
- **Responsive UI:** Clean, user-friendly interface.

## 🛠 Local Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/log-view.git
   cd log-view
   
   Install dependencies:
   npm install
   
   Start the development server:
   npm start
   
   The app will be available at http://localhost:3000.

## 📡 API Requirements
- The app expects a logs API at ```/api/v1/logs``` returning an array of log entries.
You can mock this endpoint or adjust the fetch logic as needed.
   
## 💡 Developer thoughts

- **Webpack** is used as the module bundler, and have not used CRA or vite as mentioned in the requirements.
- **LogTable** is not made Custom, as it does not make much sense to write a lot of Custom component/ re-usable component for the component in question for the scope of this project.
- **Pagination** for such a huge log view application is normally done on the backend as well to load the data incrementally, making API calls as we reach the cursor point. For the sake of simplicity have mock built that functionality on the Frontend.
- **Search** would normally have an API, to get the seached data, here debounced the search action to mimick that behaviour.
- **Mock Service Worker (MSW)** is used to mock API calls for logs, which allows for testing without a real backend.
- **Design inspiration** is taken by [middleware](https://middleware.io/wp-content/uploads/2022/08/Middlewares-Log-monitoring-dashboard.png)'s log moinitoring dashboard.
- **Styled-components** is used for styling, providing a clean and modular approach to CSS.
- **ESLint, TSLint, Prettier** are configured for code quality and formatting.
