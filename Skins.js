import { Image } from "react-native";

const skins = {
    "burger": {
        introduced: 'Season 1',
        name: "burger",
        image: <Image source={require('./assets/burger.png')} />
    },
    "chickensandwich": {
        introduced: 'Season 1',
        name: "chickensandwich",
        image: <Image source={require('./assets/chickensandwich.png')} />
    }
}

const barStyles = {
    "white": {
        introduced: 'Season 1',
        style: {
            backgroundColor: 'white'
        }
    },
    "thinoutline": {
        introduced: 'Season 1',
        style: {
            borderWidth: 2,
            borderColor: 'white'
        }
    }
}

export { skins, barStyles };
