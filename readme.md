# Ignite IR Boilerplate ("router-flux mobx")

## The latest and greatest boilerplate for Infinite Red opinions

This is the boilerplate that [Infinite Red](https://infinite.red) uses as a way to test bleeding-edge changes to our React Native stack.

Currently includes:

* React Native 0.57.7 (but you can change this if you want to experiment)
* react-native-router-flux
* mobx-react
* mobx-sync
* And more!

## Quick Start

When you've installed the [Ignite CLI](https://github.com/infinitered/ignite), you can get started with this boilerplate like this:

```
ignite new MyLatestCreation -b ignite-router-flux-mobx
```

You can also change the React Native version, just keep in mind, we may not have tested this just yet.

```sh
ignite new MyLatestCreation -b ignite-router-flux-mobx --react-native-version 0.58.0
```

## Boilerplate walkthrough

Your `App` folder is where most of the goodies are found in an Ignite Next app. Let's walk through them in more detail. Start with `Containers/App.js` (described below) and work your way down the walkthrough in order.

### Containers

Containers are (mostly) full screens, although they can be sections of screens or application containers.

* `App.js` - your main application. 
* `RootContainer.js` - main view of your application. Contains your status bar and navigation component
* `LaunchScreen.js` - this is the first screen shown in your application. It's loaded into the Navigation component
* `LoginScreen.js` - an example login screen. Read the comments in there to learn more!
* `Styles` - styling for each of the above containers and screens

To generate a new Container or Screen you can use the following generator commands:

* `ignite g container New` - Will create a `New.js` and also a `Styles/NewStyle.js`.
* `ignite g screen New` - Will create a `NewScreen.js` and also a `Styles/NewScreenStyle.js`. Important to mention that the `screen` generator will add the `Screen` on the file/class name to make easier to identify.

Those commands will also add the new container to the navigations file.

### Navigation

Your primary and other navigation components reside here.

* `AppNavigation.js` - loads in your initial screen and creates your menu(s) in a StackNavigation
* `Styles` - styling for the navigation

### Components

React components go here...pretty self-explanatory. We won't go through each in detail -- open each file to read the comments and view the code.

To generate a new Component you can use the following generator commands:

* `ignite g component New` - Will create a `New.js` and also a `Styles/NewStyle.js`.
* `ignite g component path/New` - The same as above, but will use a relative path
* `ignite g component --folder path` - An alternative to `ignite g component path/index`
* `ignite g component --folder path new ` - An alternative to `ignite g component relativePath/New`

### Storybook

[Storybook](https://storybook.js.org/) has been setup to show off components in the different states. Storybook is a great way to develop and test components outside of use in your app. Simply run `npm run storybook` to get started. All stores are contained in the `*.story.js` files along side the components.

### Themes

Styling themes used throughout your app styles.

* `ApplicationStyles.js` - app-wide styles
* `Colors.js` - defined colors for your app
* `Fonts.js` - defined fonts for your app
* `Images.js` - loads and caches images used in your app
* `Metrics.js` - useful measurements of things like navBarHeight

### Config

Initialize and configure things here.

* `AppConfig.js` - simple React Native configuration here
* `DebugConfig.js` - define how you want your debug environment to act
### Fixtures

Contains json files that mimic API responses for quicker development. These are used by the `Services/FixtureApi.js` object to mock API responses.

### Stores

Contains a preconfigured Stores setup. Review each file carefully to see how Mobx interacts with your application.

Here again we have generators to help you out. You just have to use one of the following:

* `ignite g store Task` - Will generate and link the store for `Task`.

### Services

Contains your API service and other important utilities for your application.

* `Api.js` - main API service, giving you an interface to communicate with your back end
* `FixtureApi.js` - mocks your API service, making it faster to develop early on in your app

### Lib

We recommend using this folder for modules that can be extracted into their own NPM packages at some point.

### Images

Contains actual images (usually png) used in your application.

### Transforms

Helpers for transforming data between API and your application and vice versa. An example is provided that you can look at to see how it works.

### Tests

This folder (located as a sibling to `App`) contains sample Jest snapshot and unit tests for your application.

If you would like to have the `ignite generate` command include the generation of tests when available, add 
`"test": "jest"` or `"test": "ava"` to `./ignite/ignite.json`, depending on the test runner you are using.
