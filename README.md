Duplo Backend API Assessement
==============================================

This API is a sample Course Enrollment API.
----------
Docker Image Link
----------
https://hub.docker.com/repository/docker/moriagape/duplo-api

You can pull with
docker pull moriagape/duplo-api:latest

Clone repository and run npm install to setup dependencies

Create a `.env` file
----------------------------
Add the parameters below (`add your own values`)

**Environment Variables:**
```
PORT=4444
BASE_URL=''
DATABASE_USER || 'postgres',
DATABASE_PASSWORD || 'jebzmos4',
DATABASE_NAME || 'duplo',
DATABASE_DIALECT || 'postgres',
DATABASE_HOST || 'localhost',
DATABASE_PORT || 5432,
SENDGRID_API_KEY='Sample API key in sample.env file'
```

Get API running
----------------------------
```
npm start or run docker-compose up
```
Check For Linting
-------------
```
npm run lint
```
Run Test
-------------
```
npm test
```

## Documentation
Link to hosted swagger doc: 

