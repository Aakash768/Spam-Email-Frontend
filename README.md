# Spam Email Detection Frontend

A modern, responsive web application for detecting spam emails using various machine learning models. Built with React, TypeScript, and Tailwind CSS.

## Features

- Multiple ML model selection (Random Forest, Logistic Regression, SVM, Naive Bayes)
- Real-time spam detection
- Dark/Light mode toggle
- Responsive design
- Modern UI with smooth animations
- Error handling and retry mechanism

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Development Tools:**
  - TypeScript for type safety
  - PostCSS for CSS processing
  - ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Aakash768/Spam-Email-Frontend.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   REACT_APP_API_URL=your_backend_api_url
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build` folder.

## Usage

1. Select your preferred ML model from the dropdown
2. Enter or paste the email text you want to analyze
3. Click the "Detect Spam" button
4. View the results showing whether the email is spam or not

## Configuration

The application supports various configuration options:

- Multiple ML models to choose from
- Customizable UI themes (Dark/Light mode)
- Configurable API endpoints
- Retry mechanism for API calls


## Acknowledgments

- Create React App for the initial project setup
- Tailwind CSS for the styling framework
- Radix UI for accessible component primitives
- Framer Motion for smooth animations
