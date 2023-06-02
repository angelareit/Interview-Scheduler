# Interview Scheduler

Interview Scheduler is a single page application (SPA) built using React. Users can view, book, edit, and delete interviews within certain days available. Data is persisted by an API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. Jest and Cyprus are used for end-to-end and integration testing.

Please see [scheduler api](https://github.com/angelareit/scheduler-api) for the API used in this project.

### adding interviews
![image](https://github.com/angelareit/Interview-Scheduler/blob/master/docs/pics/Add-Interviewer.gif?raw=true)

### editing interviews
![image](https://github.com/angelareit/Interview-Scheduler/blob/master/docs/pics/Edit-Interviewer.gif?raw=true)

### deleting interviews
![image](https://github.com/angelareit/Interview-Scheduler/blob/master/docs/pics/Delete-Interviewer.gif?raw=true)

### Technical Specifications
  - React
  - Webpack, Babel
  - Axios, WebSockets
  - Axios
  - Storybook, Webpack Dev Server, Jest, Testing Library
  
The Scheduler client application is created using Create React App. Express is the basis for the Scheduler API server application.

Both servers run concurrently; requests are proxied from the Webpack development server to the API server.
## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
