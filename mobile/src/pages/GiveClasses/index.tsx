import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

function GiveClasses () {
    return (
        <View style={ styles.texto }>
            <Text>Dar aulas!</Text>
        </View>
    );
}

export default GiveClasses;
