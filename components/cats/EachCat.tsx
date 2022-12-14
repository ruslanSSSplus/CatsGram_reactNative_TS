import React from 'react';
import {Button, Image, Pressable, StyleSheet} from "react-native";
import {Text, View} from "../Themed";

import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {CatsType} from "../../Types/Types";

type PropsType = {
    item: CatsType
    favorite: Array<CatsType> | any
    addFav: (id: string) => void
    deleteFav: (id: string) => void
    deleteCat: (id: string) => void
}

const EachCat: React.FC<PropsType> = ({item, deleteCat, deleteFav, addFav, favorite}) => {
    return (
        <View>
            <Image source={{uri: item.url}} style={styles.tinyLogo}/>
            <View style={styles.fixToText}>
                {
                    !favorite.includes(item) ?
                        <Pressable onPress={() => addFav(item.id)}>
                            <Text style={styles.text}>❤</Text>
                        </Pressable>
                        :
                        <Pressable onPress={() => deleteFav(item.id)}>
                            <Text style={styles.text}>💔</Text>
                        </Pressable>
                }
                <Pressable onPress={() => deleteCat(item.id)}>
                    <Text style={styles.text}>❌</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    tinyLogo: {
        width: vw(100),
        height: vw(100),
        marginBottom: 20
    },
    text: {
        fontSize: 40,
    },
    fixToText: {
        marginTop: 10,
        backgroundColor: 'transparent',
        position: 'absolute',
        width: vw(90),
        marginLeft: vw(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default EachCat;