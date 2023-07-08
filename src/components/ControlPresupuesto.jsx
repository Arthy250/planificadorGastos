import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import globalStyles from '../styles';
import { formatearCantidad } from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';


const ControlPresupuesto = ({presupuesto, gastos, resetApp}) => {

    const [disponible, guardarDisponible] = useState(0)
    const [gastado, guardarGastado] = useState(0)
    const [porcentaje, guardarPorcentaje] = useState(0);
    const [colorPorcentaje, guardarColorPorcentaje] = useState('#3bf286')

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => (Number(gasto.cantidad) + total), 0 );

        const totalDisponible = presupuesto - totalGastado;

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100
        )

        if(nuevoPorcentaje <= 50){
            guardarColorPorcentaje('#3bf286')
        } else if ( nuevoPorcentaje > 50 && nuevoPorcentaje < 75) {
            guardarColorPorcentaje('#fcad03')
        } else {
            guardarColorPorcentaje('#d1341f')
        }

        setTimeout(() => {
            guardarPorcentaje(nuevoPorcentaje);
        }, 1000)

        guardarDisponible(totalDisponible);
        guardarGastado(totalGastado);
    }, [gastos])
    

    return ( 
        <View style={globalStyles.contenedor}>
            
            <View style={styles.centrarGrafica}>
                <CircularProgress 
                    value={porcentaje} 
                    radius={130}
                    duration={1500}
                    valueSuffix={'%'}
                    title = 'Gastado'
                    inActiveStrokeColor={'#f5f5f5'}
                    inActiveStrokeWidth={10}
                    activeStrokeColor={colorPorcentaje}
                    activeStrokeWidth={10}
                    titleStyle={{fontWeight:'bold', fontSize:20}}
                    titleColor= {'#64748B'}
                />
            </View>

            <Pressable 
                style={styles.boton}
                onPress={ () => resetApp()}
                >
                <Text style={styles.textoBoton}>Reiniciar app</Text>
            </Pressable>
            
            <View style={styles.contenedorTexto}>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Presupuesto: </Text>
                    {formatearCantidad(presupuesto)}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible: </Text>
                    {formatearCantidad(disponible)}
                </Text>
                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado: </Text>
                    {formatearCantidad(gastado)}
                </Text>
                
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    centrarGrafica: {
        alignItems: 'center'
    },
    imagen:{
        width: 230,
        height: 230
    },
    contenedorTexto:{
        marginTop: 50
    },
    valor:{
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label:{
        fontWeight: '700',
        color: '#3B82F6'
    },
    boton:{
        backgroundColor: '#DB2777',
        padding: 10,
        marginTop: 40,
        borderRadius: 10
    },
    textoBoton:{
        textAlign:'center',
        color: '#fff',
        fontWeight:'700',
        textTransform: 'uppercase'
    }
})

export default ControlPresupuesto;