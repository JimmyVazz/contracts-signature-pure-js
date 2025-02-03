# React Digital Signature Component

## Overview
This project is a React component that allows users to sign digitally using a canvas-based signature pad. Unlike many existing libraries that add unnecessary weight to a project, this implementation is built purely with HTML5 Canvas and JavaScript, ensuring lightweight performance and full control over the functionality. The signatures are saved as Base64 images, and the implementation to store them in a database is currently in progress. Eventually, the saved signatures will be embedded into a signed PDF document.

## Features
- Digital signature capture using a canvas element.
- Name input field to associate the signature with a signer.
- Signature validation to ensure a name is provided before signing.
- Ability to clear and re-sign before finalizing.
- Planned feature: Save signatures to a database and generate a signed PDF.

## Installation
To use this component in your React project, clone the repository and install dependencies:

```sh
npm install
```

or

```sh
yarn install
```

## Usage
Import and use the `PrivacyNotice` component in your application:

```tsx
import PrivacyNotice from './components/PrivacyNotes/PrivacyNotice';

function App() {
  return <PrivacyNotice />;
}

export default App;
```

## Running the Project
To start the development server, run:

```sh
npm run dev
```

To build the project for production, run:

```sh
npm run build
```

## Components

### `PrivacyNotice`
- Collects user name input.
- Handles the signature process.
- Displays the signature pad component.

### `SignaturePad`
- Enables users to draw their signature on a canvas.
- Converts the drawing into a Base64 image.
- Prevents modifications after signing.
- Allows clearing and re-signing before saving.

## Future Improvements
- Implement backend storage for signatures.
- Integrate with a database to store signed records.
- Generate a signed PDF containing the stored signature.

## Technologies Used
- React (TypeScript)
- HTML5 Canvas
- CSS for styling

## License
This project is licensed under the MIT License.

