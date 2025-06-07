# Chatvibe

The Chatvibe is a real-time, scalable, and secure messaging platform built with modern web technologies. This project demonstrates a full-stack implementation of a chat system, supporting one-to-one messaging, user authentication, and group messaging capabilities. The application is designed with scalability in mind, utilizing multiple backend servers, Redis for user-server mapping, and MongoDB for persistent message storage. It is containerized using Docker for easy deployment and includes an API Gateway for efficient request routing.

## Key Features
- **Real-Time Messaging**: Leverages WebSocket (via Socket.IO) for seamless, bidirectional communication between clients and servers.
- **User Authentication**: Implements secure signup and login using JWT (JSON Web Tokens) and bcrypt for password hashing, with MongoDB for user data storage.
- **Scalable Architecture**: Supports multiple backend servers with Redis for user-to-server mapping, ensuring efficient message routing.
- **Group Messaging**: Enables group chat functionality for multiple users.
- **Offline Messaging**: Stores messages in MongoDB, allowing users to retrieve conversations when they come online.
- **Responsive UI**: Built with Next.js, React, and Tailwind CSS for a modern, user-friendly interface.
- **Containerization**: Uses Docker and Docker Compose for consistent development and deployment environments.
- **API Gateway**: Implements an API Gateway using `http-proxy-middleware` to route requests to appropriate services.
- **State Management**: Utilizes Zustand for lightweight and efficient state management in the frontend.
- **Deployment**: Includes configurations for deploying on AWS ECS with Docker containers hosted on Amazon ECR, and setup instructions for EC2 instances.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS, Socket.IO-Client, Axios
- **Backend**: Node.js, Express.js, Socket.IO, MongoDB, Mongoose, Redis, JWT, bcrypt
- **DevOps**: Docker, Docker Compose, AWS ECS, Amazon ECR, Nginx (API Gateway)
- **State Management**: Zustand (React)
- **Testing**: Postman for API testing

## Project Structure
- `/backend`: Core backend service handling WebSocket connections and message routing.
- `/auth-backend`: Authentication service managing user signup/login and JWT generation.
- `/frontend`: Next.js frontend for the chat interface and user interactions.
- `/db`: MongoDB connection setup and schemas for users and conversations.
- `/routes`: Express routes for authentication, user management, and message retrieval.
- `/middleware`: Token verification middleware for securing API endpoints.
- `/zustand`: Zustand stores for managing authentication, users, and chat state.
- `/docker`: Dockerfiles and Docker Compose configurations for containerization.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/agamswami/Chatvibe.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   Run in `/backend`, `/auth-backend`, and `/frontend`.
3. Set up environment variables in `.env` files (see `.env.example` for reference).
4. Start MongoDB and Redis services.
5. Run the application using Docker:
   ```bash
   docker-compose up
   ```
6. Access the app at `http://localhost:3000`.

## Deployment
- **AWS ECS**: Deploy by pushing Docker images to Amazon ECR and configuring task definitions and services.
- **EC2 Instance**: Deploy using Docker and Docker Compose on an EC2 instance.

## Future Enhancements
- Add end-to-end encryption for messages.
- Implement read receipts and typing indicators.
- Support file sharing and multimedia messages.
- Enhance group messaging with admin controls and notifications.

This project serves as a robust foundation for building scalable real-time chat applications, with a focus on modern development practices and cloud deployment.


