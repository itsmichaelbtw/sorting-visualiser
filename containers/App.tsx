import React from "react";

export function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">Hello, world!</h1>
      <p className="text-2xl mt-4">Count: {count}</p>
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>

      <div className="relative overflow-x-auto mt-4">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Webpack Variable
              </th>
              <th scope="col" className="px-6 py-3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                DEVELOPER_TOOLS_ENABLED
              </th>
              <td className="px-6 py-4">
                <code>{DEVELOPER_TOOLS_ENABLED ? "true" : "false"}</code>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                NODE_ENVIRONMENT
              </th>
              <td className="px-6 py-4">
                <code>{NODE_ENVIRONMENT}</code>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_HASH
              </th>
              <td className="px-6 py-4">
                <code>{BUILD_HASH}</code>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_VERSION
              </th>
              <td className="px-6 py-4">
                <code>{BUILD_VERSION}</code>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                BUILD_TIMESTAMP
              </th>
              <td className="px-6 py-4">
                <code>{BUILD_TIMESTAMP}</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
