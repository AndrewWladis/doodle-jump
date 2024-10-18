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
    },
    "red": {
        introduced: 'Season 1',
        style: {
            backgroundColor: '#e63946'
        }
    },
    "green": {
        introduced: 'Season 1',
        style: {
            backgroundColor: '#4a7a41'
        }
    }
}

export { skins, barStyles };
