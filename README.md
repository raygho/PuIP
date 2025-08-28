# PuIP - Public IP Address Display

A simple, elegant web application that displays your public IP address with a beautiful dark midnight blue gradient background.

## Features

- **Multiple IP Service Providers**: Uses 5 different IP services for maximum reliability
- **Automatic Fallback**: If one service fails, automatically tries the next one
- **Timeout Protection**: 5-second timeout per service to prevent hanging
- **Error Handling**: User-friendly error messages with retry functionality
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, minimalist design with smooth animations

## Files

- `index.html` - Main HTML structure
- `main.js` - JavaScript logic for IP fetching and UI management
- `styles.css` - CSS styling with dark gradient background
- `PuIP.ico` - Favicon

## How It Works

1. The application tries multiple IP service APIs in sequence
2. Each service has a 5-second timeout to ensure responsiveness
3. If a service fails, it automatically tries the next one
4. Displays the IP address when successful, or an error message with retry option
5. Includes keyboard shortcuts (F5 or Ctrl+R) for manual retry

## IP Services Used

- api.ipify.org
- ipapi.co
- api.my-ip.io
- httpbin.org
- api.seeip.org

## Usage

Simply open `index.html` in any modern web browser. The application will automatically fetch and display your public IP address.

## Browser Compatibility

Works with all modern browsers that support:
- ES6+ JavaScript (async/await)
- CSS3 gradients
- Fetch API

## License

Open source project for educational and personal use.
