import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import globalStyles from '../styles';
import Gasto from './Gasto';

const ListadoGastos = ({
    gastos,
    mostrarModal,
    setGasto,
    filtro,
    gastosFiltrados,
    guardarFiltro,
    guardarGastosFiltrados}) => {


    useEffect(() => {

        if(gastos.length === 0){
            guardarFiltro('')
            guardarGastosFiltrados([])
        }
      
    }, [gastos])
    


    return ( 
        <View style={[styles.contenedor,  gastos.length > 0  ?  styles.listaSiGastos : styles.ListaNoGastos]}>
            <Text style={globalStyles.titulo}>
                Gastos { filtro != '' ? filtro : ''}
            </Text>

            { filtro ? gastosFiltrados.map( gasto => 
                (<Gasto
                    key = {gasto.id}
                    gasto = {gasto}
                    mostrarModal = {mostrarModal}
                    setGasto = {setGasto}
                />
            )) : gastos.map( gasto => 
                (<Gasto
                    key = {gasto.id}
                    gasto = {gasto}
                    mostrarModal = {mostrarModal}
                    setGasto = {setGasto}
                />
            ))}

            { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) && (
                <Text style={styles.noGastos}>No hay gastos</Text>
            )}

            
        </View>
     );
}

const styles = StyleSheet.create({
    contenedor:{
        marginBottom: 50
    },
    noGastos:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20
    },
    ListaNoGastos:{
        marginTop: 70
    },
    listaSiGastos:{
        marginTop: 30
    }
})

export default ListadoGastos;