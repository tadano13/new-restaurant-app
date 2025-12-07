# **🍽️ New Restaurant App**

A full-stack web application designed for restaurant management and food ordering. This project contains a separate frontend and backend to handle the user interface and server-side logic respectively.

**🚀 Live Demo:** [https://new-restaurant-app-omega.vercel.app](https://new-restaurant-app-omega.vercel.app)

**⚠️ Note:** This project is a **DEMO / PROTOTYPE**. It is designed to showcase the core functionality and technical architecture. While functional, it is not a fully production-ready commercial release in this repository.

## **📖 About the Project**

This application simulates a complete digital ecosystem for a restaurant.

* **For Customers:** It allows users to browse a dynamic menu, view item details, add items to a cart, and complete a checkout process.  
* **For Admins:** It provides a dashboard to manage orders like either accepting and completed or be deleted ( id and password to check admin pannel is id = admin and password = admin).

## **✨ Features**

* **User Interface:** Clean and responsive design for browsing menus and placing orders.  
* **Admin Dashboard:** Manage dishes, prices, and incoming orders.   
* **Cart Management:** Add, remove, and modify items in the cart.  
* **Real-time Updates:** 

## **🛠 Tech Stack**

**Frontend:**

* HTML5, CSS3  
* JavaScript (ES6+)  

**Backend:**

* Node.js  
* Express.js  
* *Database:* Mongodb

**Deployment:**

* Vercel

## **📂 Project Structure**
```
new-restaurant-app/  
├── backend/          \# Server-side logic, API routes, and database models  
├── frontend/         \# Client-side code, pages, and components  
├── vercel.js         \# Vercel deployment configuration  
└── README.md         \# Project documentation
```
## **🚀 Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine.

### **Prerequisites**

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher)  
* npm or yarn

### **Installation**

1. **Clone the repository:**
   ```
   git clone \[https://github.com/tadano13/new-restaurant-app.git\](https://github.com/tadano13/new-restaurant-app.git)
   ```

   *Alternatively, you can download the ZIP file by clicking the green "Code" button on GitHub and selecting "Download ZIP".*  
2. **Navigate to the project directory:**  
   ```
   cd new-restaurant-app
   ```

### **Backend Setup**

1. Navigate to the backend directory:  
   ```
   cd backend
   ```

2. Install dependencies:  
   ```
   npm install
   ```

3. **Environment Variables:** Create a .env file in the backend folder and add your configuration (e.g., Database URI, PORT).  
  ```
   PORT=5000  
   DB\_URI=your\_database\_connection\_string
  ```

5. Start the server:  
  ```
   npm start  
   \# or for development with nodemon  
   npm run dev
  ```

### **Frontend Setup**

1. Open a new terminal and navigate to the frontend directory:  
  ```
   cd frontend
  ```

3. Install dependencies:  
  ```
   npm install
  ```

5. Start the client:  
  ```
   npm start  
   open and run index.html 
  ```

## **🔌 API Endpoints**

| Method | Endpoint | Description |
| :---- | :---- | :---- |
| GET | /api/products | Fetch all available dishes |
| POST | /api/orders | Create a new order |
| POST | /api/auth/login | Admin Login |

*(Update this table with your actual API routes found in the backend folder)*

## **🌍 Deployment**

This project is configured for deployment on **Vercel**.

1. Ensure your `vercel.json` is configured correctly to handle both frontend and backend builds.  
2. Push your changes to GitHub.  
3. Connect your repository to Vercel and deploy\!

## **🤝 Contributing**

Contributions are welcome\! Please follow these steps:

1. Fork the repository.  
2. Create a new branch `(git checkout \-b feature/YourFeature).`  
3. Commit your changes `(git commit \-m 'Add some feature').` 
4. Push to the branch `(git push origin feature/YourFeature). ` 
5. Open a Pull Request.

## **💼 Contact & Customization**

**Interested in a complete solution?**

As mentioned, this repository serves as a demo. If you are looking for a **complete, production-ready version** of this app for your business, or if you need specific features developed:

* 🚀 **Full Version Available:** Get a fully featured app ready for deployment.  
* 🛠️ **Custom Development:** I can customize this project to fit your specific restaurant branding and requirements.

Contact me directly to discuss your needs\!  
(nishantsawaimoon282@gmail.com, https://portfolio-website-by-nish-86.vercel.app/)

## **📝 License**

This project is licensed under the MIT License.
