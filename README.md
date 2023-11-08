## InViewContentRenderer

This Mendix pluggable widget lazy-loads and renders content as it enters the viewport, optimizing resource usage and
improving the performance of Mendix apps.

## Features

-   **Efficient Lazy-Loading**: Dynamically loads content in Mendix pages as the user scrolls, reducing initial load
    times.
-   **Performance Optimization**: Enhances user experience by minimizing resource usage on page load.
-   **Mendix Studio Pro Integration**: Easily integrated into Mendix applications via drag-and-drop in Mendix Studio
    Pro.
-   **Customizability**: Flexible design allowing for custom content rendering as needed.
-   **Viewport Detection**: Utilizes modern browser IntersectionObserver API for detecting when content enters the
    viewport.

## Usage

To use the `InViewContentRenderer` widget in your Mendix app:

1. Download the widget from the Mendix Marketplace and add it to your app project.
2. In Mendix Studio Pro, navigate to the page where you want the content to be lazily loaded.
3. Drag and drop the `InViewContentRenderer` widget onto your page.
4. Configure the widget properties, if necessary, to specify the content that should be rendered lazily.
5. Run your app locally or publish it to see the lazy-loading in action.

## Issues, suggestions and feature requests

We welcome your feedback and contributions. Please report any issues or suggest features on our GitHub repository:

[Report an issue or suggest a feature](https://github.com/your-repo/inview-content-renderer/issues)

## Development and contribution

1. Clone the repository to your local machine.
2. Install the necessary packages using `npm install`.
3. Use `npm start` to begin compilation in watch mode.
4. Make changes to the source code. The widget will automatically recompile.
5. Test the widget within your Mendix app by importing the MPK file from the `dist` folder.

Contribution guidelines:

-   **Code Contributions**: Submit pull requests with detailed descriptions of changes.
-   **Issue Reporting**: Use the GitHub issues template to report problems or suggest features.
-   **Documentation**: Help improve or correct the documentation.
