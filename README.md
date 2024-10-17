# Grocery List App

This is a **React Native** application for managing a grocery list. Users can add, edit, delete, and mark items as purchased. The app uses **React Native + Expo** for the frontend and **JSON Server** to mock API requests.

## Features

- Add new grocery items
- Edit existing grocery items
- Delete grocery items
- Mark items as bought
- Fetch and update data from a local JSON server

## Technologies Used

- **React Native + Expo**: Core framework for building the mobile application.
- **JSON Server**: Used as a mock server to handle API requests for the grocery list data.
- **Gluestack**: For styling UI components. Check out the [Gluestack UI documentation](https://v1.gluestack.io/ui/docs/home/overview/introduction).
- **React Query**: To handle data fetching, caching, and synchronization. For more details, see the [React Query documentation](https://tanstack.com/query/latest/docs/react/quick-start).

## Getting Started

### Prerequisites

- Make sure you have Node.js and npm installed.
- You will also need **Expo CLI** to run the application on iOS or Android.

### Installation

1. Clone the repository and navigate to the root directory of the project:
   ```
   git clone [your-repo-url]
   cd [your-project-directory]
    ```
### Running the App
1. To run the app on an iOS simulator:
    ``` 
    npx expo start --ios
   ```
    Or to run the app on an Android emulator:
   ``` 
   npx expo start --android
   ```
2. Set up JSON Server to mock the API:
   
* Create a db.json file somewhere on your machine. Here's a sample structure for the file:

   ```json
   {
     "groceries": [
       {
         "id": "1",
         "name": "Milk",
         "amount": 1,
         "isBought": false
       },
       {
         "id": "2",
         "name": "Juice",
         "amount": 4,
         "isBought": false
       }
     ]
   }
   ```
  Run the following command to start the JSON server:

   ```
   npx json-server --watch [path to file]/db.json --port 3001
   ```

Replace ``[path to file]`` with the location of your ``db.json`` file.

### Notes
* Ensure the JSON server is running on ``http://localhost:3001`` for the app to interact with it properly.


* If you want to change the port or host for JSON server, update the API calls in your React Native code accordingly.
### License
This project is licensed under the MIT License.


   



