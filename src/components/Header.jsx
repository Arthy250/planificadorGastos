import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
const Header = () => {
    return ( 
        <SafeAreaView>
            <Text style={styles.texto}>Planificador de gastos</Text>
        </SafeAreaView>
     );
}

const styles = StyleSheet.create({
    texto: {
        textAlign: 'center',
        fontSize: 30,
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: '700',
        paddingTop: 20
    }
})
 
export default Header;