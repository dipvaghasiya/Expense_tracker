import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to Expense Manager</h1>
          <p className="mt-4 text-lg text-gray-600">
            Track your expenses, manage your categories, and gain insights into your financial habits.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-indigo-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="ml-4 bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md shadow-md hover:bg-indigo-50"
            >
              Log In
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Track Expenses</h3>
            <p className="mt-2 text-gray-600">
              Easily track your income and expenses to stay on top of your finances.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">Manage Categories</h3>
            <p className="mt-2 text-gray-600">
              Organize your transactions by categories for better insights.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900">View Reports</h3>
            <p className="mt-2 text-gray-600">
              Generate reports to analyze your spending patterns over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
