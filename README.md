

# OctAPI - Frontend Wrapper for OctoPrint

OctAPI is a frontend wrapper for OctoPrint , built with React and Material UI to provide a modern and clean user interface. The goal of this project was mainly formative, but some other may prefer this cleaner interface

## Features

- Connect to your OctoPrint instance via its API
- View the status of your printer, including the current job, temperature, and progress
- Control your printer with intuitive buttons and sliders for common actions like homing, heating, and moving the printer head
- Monitor the progress of your prints in real-time, with a visual representation of the print bed and a progress bar showing completion percentage

## Installation
To install OctAPI, follow these steps:

1. Clone the repository to your local machine.
2. Locate the .env file and put provide the API KEY and API URL.
3. Deploy with `docker-compose up --build -d`

## Configuration

To configure OctAPI, edit the `.env` file in the frontend folder. Here, you can update the `API_KEY` and `API_URL` variables to match your OctoPrint instance. For example:


Once the development server is running, open a browser and navigate to `http://localhost:5173`. You should see the OctAPI interface, where you can connect to your OctoPrint instance and start controlling your printer.

## Contributing

Contributions to OctAPI are welcome! If you find a bug or have a feature request, please open an issue or submit a pull request. Make sure to follow the existing code style and tests, and include documentation for any changes.

## TO-DO
- Multiple printers support
- Resizable & movable cards
- Multiple user support
- Safeguards?
