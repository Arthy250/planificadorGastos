import React from 'react';
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native';
import globalStyles from '../styles';


const NuevoPresupuesto = ({
    handleNuevoPresupuesto, 
    presupuesto, 
    guardarPresupuesto}) => {   

    return ( 
        <View style={globalStyles.contenedor}>
            <Text style={styles.label}>Nuevo presupuesto</Text>
            <TextInput
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto: Ej. 300'
                placeholderTextColor='#00000040'
                style={styles.input}
                value={presupuesto.toString()}
                onChangeText={guardarPresupuesto}
            />

            <Pressable 
                style={styles.boton}
                onPress={ () => handleNuevoPresupuesto(presupuesto)}
                >
                <Text style={styles.botonTexto}>Agregar presupuesto</Text>
            </Pressable>
        </View>
     );
}

const styles = StyleSheet.create({
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'
    },
    input:{
        backgroundColor: '#F5F5F5',
        padding:10,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 20
    },
    boton:{
        backgroundColor:'#1848A4',
        padding: 10,
        borderRadius: 10
    },
    botonTexto:{
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})
 
export default NuevoPresupuesto;