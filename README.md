# Fullstack Trading Application

This is a fullstack trading application built using ReactJS and NodeJS. The application allows users to register, login, and access trading information.

## Installation

To install the application, please follow the below steps:

1. Clone the repository from Github using `git clone <https://github.com/jivan9822/TradingInfo>`.
2. Navigate to the client folder and install the dependencies using `npm install`.
3. Start the client using `npm run dev`.
4. Navigate to the server folder and install the dependencies using `npm install`.
5. Start the server using `npm start`.

## User Registration

The user can register by providing their name, email, password, and photo (as a base64 string). The application verifies the user's email before allowing them to log in.

## User Login

The application uses JWT implementation for user authentication. Users can log in using their registered email and password.

## Trading Information

After logging in, the user can see trading information on the home page. The user can access the stock database by clicking on the "Get All Stock Data" button. The user can filter the stock data by searching for stocks or symbols. The user can also search for stocks by name by clicking on the "Click to search by name" button.

When the user clicks on a product ID, they can view the details of the stock, including the current price, high, low, number of shares, open price, volume, and more. The user can also view the details of the company by clicking on the "Company Details" button.

## Stack Used

The frontend of the application is built using ReactJS and the advanced React Redux Toolkit for state management. The backend is built using NodeJS, and the database is stored in MongoDB. The application uses JWT tokens for handling protected routes, and multer to handle images.

## Unit Testing

Unit testing has been implemented for one of the modules.

## Optimization

Code optimization has been done to ensure the application runs efficiently.

## API Implementation

The application uses the Polygon API for accessing trading data. The application handles large amounts of data by filtering and searching.

## Deployment and Github Repository

The project has been deployed to [Netlify](https://papaya-frangollo-f46efc.netlify.app/), and the code is available on [Github](https://github.com/jivan9822/TradingInfo).

## Author Details

Name: Jivan Toshniwal  
Mobile No: 9822442282  
email: j.toshniwal@yahoo.co.in  
Address: Mumbai.

Thank you for using this application!
