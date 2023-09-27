<img src="readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="readme/title2.svg"/>

> HemaConnect is a web application which aims to create a platform to facilitate the process of blood donations.
>
> HemaConnect serves as the vital link connecting healthcare facilities with compassionate individuals eager to donate blood and make a life-saving difference. With its innovative approach, HemaConnect is poised to transform the blood donation process.

### Blood Donor Stories
- As a blood donor, I want to see hospital blood requests, so I can know which hospital needs blood.
- As a blood donor, I want to book and see upcoming appointments, so I can manage my timings.
- As a blood donor, I want to view hospitals in need of blood on a map, so I can find the best route to reach it.

### Hospital Employee Stories
- As an employee, I want to view and edit my blood banks, so I can be able to track my needs.
- As an employee, I want to create a request for blood, so I can show donors that we are in need of blood.
- As an employee, I want to view the donors' bookings, so I can keep track of the schedules.

### Admin Stories
- As an admin, I want to view the hospitals, so I can add hospitals and employees.


<br><br>

<!-- Prototyping -->
<img src="readme/title3.svg"/>

> The design was planned from scratch on a paper then enhanced on Figma by adding details.

### Mockups

### LogIn Screen (Web)
| Login screen                                          |
|-------------------------------------------------------|
| ![Login](./readme/screenshotsWebsite/Login/Login.png) |

### Admin Screens (Web)
| Hospital Table                                               | Hospital Modal                                                        | Employee Modal                                                        |
|--------------------------------------------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------|
| ![Landing](./readme/screenshotsWebsite/Admin/adminTable.png) | ![hospitalModal](./readme/screenshotsWebsite/Admin/hospitalModal.png) | ![EmployeeModal](./readme/screenshotsWebsite/Admin/employeeModal.png) |
### Hospital Employee Screens (Web)
| Blood Bank                                                       | Booking Table                                                     |
|------------------------------------------------------------------|-------------------------------------------------------------------|
| ![BloodBank](./readme/screenshotsWebsite/Employee/BloodBank.png) | ![BookingTable](./readme/screenshotsWebsite/Employee/Booking.png) |

| Request Modal                                                          | Donation Modal                                                          |
|------------------------------------------------------------------------|-------------------------------------------------------------------------|
| ![RequestModal](./readme/screenshotsWebsite/Employee/RequestModal.png) | ![DonationModal](./readme/screenshotsWebsite/Employee/BookingModal.png) |
### Blood Donor Screens (Mobile)
| OnBoarding                                                | OnBoarding                                       | OnBoarding                                            |
|-----------------------------------------------------------| --------------------------------------------------------- |-----------------------------------------------------------|
| ![onBoarding](./readme/screenshotsMobile/onBoarding1.jpg) | ![onBoarding](./readme/screenshotsMobile/onBoarding2.jpg) | ![onBoarding](./readme/screenshotsMobile/onBoarding3.jpg)      |

| Login screen                                   | Register screen                                      | Home screen                                  | 
|------------------------------------------------|------------------------------------------------------|----------------------------------------------|
| ![Login](./readme/screenshotsMobile/LogIn.jpg) | ![Register](./readme/screenshotsMobile/Register.jpg) | ![Home](./readme/screenshotsMobile/Feed.jpg) | 

| Appointments                                                 | Map                                        | Profile                                            |
|--------------------------------------------------------------|--------------------------------------------|----------------------------------------------------|
| ![Appointments](./readme/screenshotsMobile/Appointments.jpg) | ![Map](./readme/screenshotsMobile/Map.jpg) | ![Profile](./readme/screenshotsMobile/Profile.jpg) |

<br><br>

<!-- Tech stack -->
<img src="readme/title5.svg"/>

###  HemaConnect is built using the following technologies:

- [React Native Expo](https://expo.dev/):  Expo is a set of tools and services built around React Native, making it easier to develop, test, and deploy mobile apps.
- [MySQL](https://www.mysql.com/): MySQL is a widely used open-source relational database management system (RDBMS). It is used as the database for storing and managing data.
- [React](https://react.dev/): React is a popular JavaScript library for building user interfaces. React utilized the development of web-based interfaces for employees and the administrator.
- [Laravel](https://laravel.com/): Laravel is a PHP web application framework known for its elegant syntax and developer-friendly features. It provides tools for routing, authentication, database interactions, and more.
- [React Native Maps](https://www.npmjs.com/package/react-native-maps): React Native Maps is a component system for maps that allows the integration with maps and location-based functionality in React Native mobile applications. I've also used [Google Geolocation and Services Integration](https://developers.google.com/maps); Google Geolocation and Services provide powerful geolocation and mapping capabilities.

<br><br>

<!-- Implementation -->
<img src="readme/title4.svg"/>

> Using the above mockups and technologies, HemaConnect introduce the following features:

### Blood Donor Screens (Mobile)
| OnBoarding                                       | Login screen                            | Register screen                          | Home screen                             |
|--------------------------------------------------|-----------------------------------------|------------------------------------------|-----------------------------------------|
| ![onBoarding](./readme/gifsApp/onBoarding.gif)   | ![Login](./readme/gifsApp/LoginApp.gif) | ![Register](./readme/gifsApp/SignUp.gif) | ![Home](./readme/gifsApp/feed.gif)      |
| Appointment screen                               | Map Screen                              | Profile Screen                           |
| ![appointment](./readme/gifsApp/appointment.gif) | ![Map](./readme/gifsApp/map.gif)        | ![profile](./readme/gifsApp/profile.gif) |

### Login Screens (Web)
| Login screen                                         |
|------------------------------------------------------|
| ![LoginGif](./readme/gifsWebsite/Login/WebLogin.gif) |


### Admin Screens (Web)
| Adding Employee                                           | Adding Hospital                                           |
|-----------------------------------------------------------|-----------------------------------------------------------|
| ![Employee](./readme/gifsWebsite/Admin/employeeModal.gif) | ![Hospital](./readme/gifsWebsite/Admin/hospitalModal.gif) |


### Hospital Employee Screens (Web)
| Blood Bank Page                                         | Booking Page                                                  |
|---------------------------------------------------------|---------------------------------------------------------------|
| ![BankPage](./readme/gifsWebsite/Employee/BankPage.gif) | ![BookingPage](./readme/gifsWebsite/Employee/BookingPage.gif) |



<br><br>

<!-- How to run -->
<img src="readme/title6.svg"/>

> To set up HemaConnects locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Coffee Express locally and explore its features.