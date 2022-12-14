import {
    ActivityIndicator,
    Button,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    TextStyle,
    ViewStyle, View, Text
} from 'react-native';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {actions, getNewCatsThunkCreater} from "../redux/reducers/catsReducer";
import {AppStateType} from "../redux/reduxStore";
import {RootTabScreenProps} from '../types';
import EachCat from "../components/cats/EachCat";

import {vw, vh, vmin, vmax} from 'react-native-expo-viewport-units';
import {CatsType} from "../Types/Types";

export default function CatsGram() {

    const dispatch = useDispatch()
    const {cats, currentPage, isFetching, favorite} = useSelector((state: AppStateType) => state.cats)

    const [favoriteOn, setFavoriteOn] = useState(false)

    useEffect(() => {
        if (isFetching) {
            dispatch(getNewCatsThunkCreater(currentPage))
        }
    }, [isFetching])


    const deleteCat = (id: string) => {
        dispatch(actions.deleteFav(id))
        dispatch(actions.deleteCat(id))
    }
    const addFav = (id: string) => {
        dispatch(actions.addFav(id))
    }
    const deleteFav = (id: string) => {
        dispatch(actions.deleteFav(id))
    }


    const renderItem = ({item}: { item: CatsType }) => {
        return (
            <EachCat item={item} deleteCat={deleteCat} deleteFav={deleteFav} addFav={addFav} favorite={favorite}/>
        )
    }
    const renderLoader = () => {
        return (
            <View>
                <ActivityIndicator size={"large"} color='#aaa'/>
            </View>
        )
    }
    const loadMoreCats = () => {
        dispatch(actions.setFetching(true))
    }

    return (
        <View style={styles.container}>
            {favoriteOn ?
                <Pressable onPress={() => setFavoriteOn(!favoriteOn)}>
                    <Text style={styles.text as any}>Все котики</Text>
                </Pressable>
                :
                <Pressable onPress={() => setFavoriteOn(!favoriteOn)}>
                    <Text style={styles.text}>Любимые котики</Text>
                </Pressable>
            }
            {!favoriteOn ?

                <FlatList data={cats} renderItem={renderItem}
                          keyExtractor={item => item.id}
                          ListFooterComponent={renderLoader}
                          onEndReached={loadMoreCats}
                          onEndReachedThreshold={0}

                /> :
                <ScrollView>
                    {favorite.map((cat: CatsType) => <EachCat item={cat} favorite={favorite} addFav={addFav}
                                                              deleteFav={deleteFav} deleteCat={deleteCat}/>)}
                </ScrollView>
            }
        </View>
    );
}
type Style = {
    container: ViewStyle;
    text: TextStyle;

};

const styles = StyleSheet.create<Style>({
    container: {
        flex: 1,
        width: '100%'
    },
    text: {
        marginTop: 16,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        backgroundColor: "black",
        color: "#ff007a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "italic",
        marginBottom: 20
    }
});
