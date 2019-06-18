import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {
    updateUser
} from '../Action/UserActions'

var id, name, email, isEditable, profile;

class UserDetail extends Component {

    state = {
        name: '',
        email: '',
        profile: ''
    }

    constructor(props) {
        super(props)
        const {navigation} = this.props
        id = navigation.getParam('id', '')
        name = navigation.getParam('name', '')
        email = navigation.getParam('email', '')
        profile = navigation.getParam('profile', '')
        isEditable = navigation.getParam('isEditable', '')
    }

    componentDidMount() {
        this.setState({
            name: name,
            email: email,
            profile: profile
        })
    }

    render() {
        debugger;
        return (
            <View>
                <View style={style.containerStyle}>

                    <TextInput
                        editable={isEditable}
                        style={style.dataStyle}
                        onChangeText={(name) => this.setState({name: name})}
                    >
                        {this.state.name}
                    </TextInput>

                    <TextInput
                        editable={isEditable}
                        style={style.dataStyle}
                        onChangeText={(email) => this.setState({email: email})}
                    >
                        {this.state.email}
                    </TextInput>

                    <TextInput
                        editable={isEditable}
                        style={style.dataStyle}
                        onChangeText={(profile) => this.setState({profile: profile})}
                    >
                        {this.state.profile}
                    </TextInput>
                </View>

                {isEditable &&
                <TouchableOpacity
                    style={style.buttonStyle}
                    onPress={async () => {
                        await this.props.updateUser(id, {
                            "name": this.state.name,
                            "email": this.state.email,
                            "profile": this.state.profile
                        });
                        this.props.navigation.goBack()
                    }}
                >
                    <Text style={{color: 'rgb(28,74,119)', fontSize: 25, fontWeight: 'bold'}}>{'Update Data'}</Text>
                </TouchableOpacity>
                }
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
        padding: 10
    },
    dataStyle: {
        fontSize: 25,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5
    },
    buttonStyle: {
        fontSize: 25,
        padding: 5,
        borderColor: 'black',
        borderWidth: 1,
        margin: 5,
        borderRadius: 10,
        alignSelf: 'center'
    }
}

mapStateToProps = state => {
    debugger
    return {
        userData: state.User.userData
    }
}

export default connect(mapStateToProps, {
    updateUser
})(UserDetail)