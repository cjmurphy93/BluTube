# BluTube

Welcome to [BluTube](https://www.blu-tube.com/#/)! This is a pixel-perfect clone of YouTube.

On BluTube, users can not only watch and search for videos, but after making an account they can upload their own!
That's not all! Registered Users can leave comments and replies on videos, as well as likes on those comments or even the video itself.

## Technologies

- Backend:
    - Ruby on Rails
    - PostgreSQL

- Frontend:
    - React
    - Redux
    - HTML 5
    - SCSS

- AWS S3 for file storage

- Heroku for hosting

## Features

### User Authentication

- Users can optionally create their own accounts or login if they have already registered.
- a Demo User account is also available.

### Video Uploads

- Users that are logged in can upload their own videos to the site.
- Videos can optionally be dragged and dropped on a 2 part upload screen.
- Users can edit the title and description of the video, as well as delete it entirely.

### Comments

- Every video has a comments section that anyone can see.
- Logged in users can leave comments on a video, or reply to comments. This is done through polymorphic associations in Rails.

### Likes
- Every video and comment has its own counts of likes and dislikes displayed for everyone.
- Logged in Users can like or dislike both comments and videos through polymorphic associations.

### Search
- Users can search for videos by title, description, or uploader.

## Comming Soon...
- Thumbnails
- Subscriptions
- User profile photos