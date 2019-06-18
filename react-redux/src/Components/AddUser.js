import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import {
    addUser
} from '../Action/UserActions'

class AddUser extends Component {

    state = {
        name: '',
        email: '',
        profile: ''
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <View style={style.containerStyle}>
                    <Text style={{fontSize: 16}}>{'Enter name: '}</Text>

                    <TextInput
                        style={style.dataStyle}
                        placeholder={'Jhon Smit'}
                        onChangeText={(name) => this.setState({name: name})}>
                    </TextInput>
                </View>

                <View style={style.containerStyle}>
                    <Text style={{fontSize: 16}}>{'Enter email: '}</Text>

                    <TextInput
                        style={style.dataStyle}
                        placeholder={'jhonsmit@gmail.com'}
                        onChangeText={(email) => this.setState({email: email})}>
                    </TextInput>
                </View>

                <View style={style.containerStyle}>
                    <Text style={{fontSize: 16}}>{'Enter profile: '}</Text>

                    <TextInput
                        style={style.dataStyle}
                        placeholder={'Student'}
                        onChangeText={(profile) => this.setState({profile: profile})}>
                    </TextInput>
                </View>

                <TouchableOpacity style={style.buttonStyle} onPress={async () => {
                    debugger
                    await this.props.addUser({
                        "name": this.state.name,
                        "email": this.state.email,
                        "profile": this.state.profile
                    });
                    this.props.navigation.goBack()
                }
                }>
                    <Text style={{color: 'rgb(28,74,119)', fontSize: 25}}>{'Save User'}</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const style = {
    containerStyle: {
        borderRadius: 5,
        borderColor: 'rgb(28,74,119)',
        borderWidth: 2,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dataStyle: {
        fontSize: 16,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        width: Dimensions.get('window').width * .6
    },
    buttonStyle: {
        padding: 5,
        borderColor: 'white',
        borderWidth: 5,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'white'
    }
}

mapStateToProps = state => {
    debugger
    return {
        userData: state.User.userData
    }
    debugger
}

export default connect(mapStateToProps, {
    addUser,
})(AddUser)