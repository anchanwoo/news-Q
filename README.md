# ニュースQ (NewsQ)

This is a Next.js starter project in Firebase Studio, designed as an AI-powered news analysis platform.

To get started, take a look at `src/app/page.tsx`.

---

## Local Development (Editing in Cursor, VS Code, etc.)

You can edit this project on your local computer using any code editor. Follow these steps to get set up:

### 1. Exporting Your Code from Firebase Studio

This project needs to be linked to a version control system like Git and hosted on a platform like GitHub.

1.  **Initialize Git and Push to GitHub:** If you haven't already, you'll need to initialize a Git repository here and push your code to a new repository on [GitHub](https://github.com).
    ```bash
    # (Inside the Firebase Studio terminal)
    git init -b main
    git add .
    git commit -m "Initial commit from Firebase Studio"
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    git push -u origin main
    ```
    *(Replace `YOUR_USERNAME/YOUR_REPOSITORY` with your actual GitHub repository details.)*

### 2. Setting Up Your Local Environment

1.  **Clone the Repository:** Open a terminal on your local machine and clone the code from your GitHub repository.
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    cd YOUR_REPOSITORY
    ```

2.  **Install Dependencies:** Once you are inside the project directory, install all the necessary packages using npm.
    ```bash
    npm install
    ```

3.  **Set Up Environment Variables:** The app may require environment variables for connecting to services like Firebase.
    *   Create a new file named `.env.local` in the root of your project.
    *   Copy the contents of the `.env` file into `.env.local`.
    *   To connect to your own Firebase project locally, you will need to create a service account key and add its path to this file. For example: `GOOGLE_APPLICATION_CREDENTIALS="path/to/your/service-account-key.json"`

4.  **Run the Development Server:** Start the Next.js development server.
    ```bash
    npm run dev
    ```

The application should now be running on [http://localhost:9002](http://localhost:9002). You can now open the project folder in Cursor AI, VS Code, or your preferred editor and start making changes!

---

## Deployment to Production (Live Service)

This project is configured for deployment using [Firebase App Hosting](https://firebase.google.com/docs/app-hosting), a fully-managed, serverless platform built for production workloads.

To launch your app as a live service, you'll need to deploy it from your local machine using the Firebase CLI.

### 1. Set Up Your Firebase Project

1.  **Create a Firebase Project:** If you haven't already, go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Upgrade to the Blaze Plan:** To use the Google AI APIs (for news analysis) and for hosting resources beyond the free tier, you must upgrade your project to the "Blaze (Pay as you go)" billing plan. You will be billed for your usage of Google Cloud services.
3.  **Enable App Hosting:** In your Firebase project, navigate to the "Build" section and select "App Hosting". Follow the on-screen instructions to create a new backend and connect your GitHub repository.

### 2. Deploying Your App

Firebase App Hosting uses a Git-based workflow. Deployments are triggered automatically when you push commits to your main branch on GitHub.

1.  **Commit and Push Your Changes:** After making changes locally, commit them to your Git repository and push them to GitHub.
    ```bash
    git add .
    git commit -m "My latest changes for production"
    git push origin main
    ```
2.  **Automatic Deployment:** App Hosting will detect the new push, automatically build your Next.js application, and deploy it. You can monitor the progress in the Firebase Console under App Hosting.

### 3. (Optional) Connect a Custom Domain

Once your app is live, you can connect your own domain name (e.g., `www.your-app-name.com`).

1.  Go to the App Hosting page in the Firebase Console.
2.  Click "Add custom domain" and follow the instructions to verify your domain ownership and point your DNS records to Firebase.

Your app is now a live, production-ready service that automatically updates its content daily!
