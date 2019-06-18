import React from 'react'
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native'

const UserList = (props) => {
    debugger;

    const {id, name, email, profile} = props.data

    return (
        <View style={style.touchContainer}>
            <Text style={style.textContainer}>
                {name}
            </Text>

            <TouchableOpacity style={{width: (Dimensions.get('window').width - 10) * .1}} onPress={() => props.navigation.navigate("UserDetail",{
                id,
                name,
                email,
                profile,
                isEditable: true
            })}>
                <Image
                    source={require('../images/icons8-edit-26.png')}
                    style={style.imageContainer}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{width: (Dimensions.get('window').width - 10) * .1}} onPress={() => props.navigation.navigate("UserDetail",{
                id,
                name,
                email,
                profile,
                isEditable: false
            })}>
                <Image
                    source={require('../images/view.png')}
                    style={style.imageContainer}
                />
            </TouchableOpacity>

            <TouchableOpacity style={{width: (Dimensions.get('window').width - 10) * .1}} onPress={() => props.deleteUser(id)}>
                <Image
                    source={require('../images/icons8-trash-24.png')}
                    style={style.imageContainer}
                />
            </TouchableOpacity>
        </View>
    )
}

const style = {
    textContainer: {
        color: '#000',
        fontSize: 24,
        margin: 10,
        width: (Dimensions.get('window').width - 10) * .6
    },
    touchContainer: {
        borderRadius: 5,
        borderColor: 'rgb(28,74,119)',
        borderWidth: 2,
        margin: 5,
        height: 75,
        width: Dimensions.get('window').width - 10,
        backgroundColor: 'rgb(68,161,164)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        margin: 10,
        height: 25
    }
}

export default UserList