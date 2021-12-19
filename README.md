
<img src="https://raw.githubusercontent.com/mirsahib/BanGIAA/main/assets/images/figma.png" />

## BanGIAA
Bangladesh grocery image annotation app

## Purpose
The idea of the app came to my mind when i try to create an image recognition model on Bangladesh grocery item.I have google to find a datasets which will be specific to my countries grocery item.But is is hard to find such kind of datasets.
## Installation
Clone the repository
```js
git clone https://github.com/mirsahib/BanGIAA.git
```
Install dependencies. Make sure you already have nodejs(16+),yarn and expo-cli are installed in your system.
```js
yarn install
```
After successfull installation run
```js
expo start
```

### Environment Variable
In the route directory create a `.env` and copy paste the following.(Follow the reference to setup environment variable on expo project)

```
CREATE_USER_API=<Your Mongodb realm create user webhook URL>
READ_USER_API=<Your Mongodb realm read user webhook URL>
UPLOAD_DATA_API=<Your Mongodb realm create data webhook URL>
UPLOAD_IMAGE_API=<Your Mongodb realm create user webhook URL>
```
## Contribution

If you want to contribute and make this project much better for other developer have a look at Issues.

If you created something awesome and want to contribute then feel free to open a pull request.


## Reference
[How to Properly Use Environment Variables in an Expo React Native App](https://medium.com/swlh/how-to-properly-use-environment-variables-in-an-expo-react-native-app-7ab852590b30)

