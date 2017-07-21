# VSTS Mobile Pull Request
Currently Visual Studio Team Services (VSTS) has support for Pull Requests on desktop view only. Sometime, we just want to take a sneak peek on a pull request on a mobile device. GitHub has a good support for that, but VSTS is lacking this functionality. This project aims to add this feature to VSTS by creating a react native mobile app that will use the existing VSTS's APIs to show pull requests on mobile devices.

## Prerequisites:
1. Install node/watchman: https://facebook.github.io/react-native/docs/getting-started.html#node-watchman
2. Install react native cli: https://facebook.github.io/react-native/docs/getting-started.html#the-react-native-cli
3. Install XCode: https://facebook.github.io/react-native/docs/getting-started.html#xcode

## Running the app
After cloning the repo, and inside the project folder run:
1. `npm insall`
2. `react-native run-ios`

## Running the app on vscode 
After cloning the repo, and inside the project folder run:
1. `npm insall`
2. Choose the `Debug iOS` option in VSCode and Run it.

## Enable Live Reload in iOS
On the simulator, while the iOS app is running, click `Command+D` and choose `Enable Live Reload`. 
Now every time, you save a `js` file, it will automatically update the release. 
It won't work for `.ts` or `.tsx` files.
