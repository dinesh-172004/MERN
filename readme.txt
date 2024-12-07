step 1: cloning the githubfile
"git clone https://github.com/dinesh-172004/MERN.git"

step 2:setting up backend >
create a database in mongodb compass
create a collection in the database called "admins" and insert data for admin login verification
example :db["admins"].insertOne({
  "username": "dinesh17",
  "password": "172004@dinesh"
});
you can insert username and password as your wish but you have to login with the specified username only

then also copy the connection string  >
in vs terminal move to the backend directory cd backend  >
npm install >
open index.js >
on line 23, paste your connectionstring/<your database name"
npm start

step 3:settingup front end
create new terminal in main folder and move to frontend folder cd frontend
npm install
npm run dev
