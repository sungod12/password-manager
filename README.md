# Password Manager (Passaver)
A simple password manager created using **React** for Frontend and **Node JS** as server and CRUD requests and **Firebase** as database for handling authentication and for storing user's password and their respective accounts.

## Screenshots
- Register Screen

  ![image](https://user-images.githubusercontent.com/55348832/153449320-2c6f4e99-b0fc-4d5b-847e-251669bcd254.png)
  
- Login Screen

  ![image](https://user-images.githubusercontent.com/55348832/153449581-91dc1cc7-719c-4d0f-b534-5a1069b50545.png)

- Main Screen

  ![image](https://user-images.githubusercontent.com/55348832/153449869-261f427b-b956-4d23-8774-cde8b6193713.png)

## Application Flow
- User registers by using his email and password. After successfully registering,he is greeted with sign in screen.
- After entering the correct credentials,he/she will be shown his/her saved passwords,if there are any.Otherwise,the screen will be empty with just a card to add name of service     the password is associated with.
  - In case,the user forgots his/her password ,he/she can also click on "Forgot Password" option below the Sign In button,where he/she has to enter his/her registered email id.
  - An email will 
- After entering the required details,they will be saved in database and shown in the screen. There will also be delete button in case he wants to delete the password.
- In case,user enters a different password for same service **(account)**. He/she will be shown a prompt,that password for same service **(account)** exists.

## Learnings
- Firebase Integration 
  -  Working with Authentication tokens.
  -  CRUD Operations
- Hosting a Server and FrontEnd on Heroku and Netlify.
- React Router.

## Future Changes
-  Signing in using Google.
-  Signing in using Facebook.
-  Update saved passwords.
