import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    Dimensions,
    Platform,
    TextInput
} from 'react-native'
import Modal from 'react-native-modal'

class ModalDemo extends Component {

    state = {
        isModalVisible: true,
        message: '',
        data: ''
    };

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible, data: this.state.message});
    };

    render() {

        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Dimensions.get("window").height

        return (
            <View style={styles.container}>
                <Button title="Show Modal" onPress={this.toggleModal}/>
                <Text>{this.state.data}</Text>
                <Modal
                    isVisible={this.state.isModalVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={200}
                >
                    <View style={{flex:1}}>
                        <Text>I am the modal content!</Text>
                        <TextInput placeholder={'Enter any message!!'} onChangeText={(data) => this.setState({message: data})}/>
                        <Button title="Hide Modal" onPress={this.toggleModal}/>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        marginTop: 24,
    }
}

export default ModalDemo