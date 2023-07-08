import {useState, useEffect} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  Image,
  Modal,
  ScrollView
} from 'react-native';

//Componentes
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from "./src/components/Filtro";
import { generarId } from './src/helpers';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const [presupuestoValido, guardarPresupuestoValido] = useState(false);
  const [presupuesto, guardarPresupuesto] = useState('');
  const [gastos, guardarGastos] = useState([])
  const [modal, mostrarModal] = useState(false)
  const [gasto, setGasto] = useState({})
  const [filtro, guardarFiltro] = useState('')
  const [gastosFiltrados, guardarGastosFiltrados] = useState([])

  useEffect(() => {
    
    const obtenerPresupuestoStorage = async() =>{
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        
        if(presupuestoStorage > 0){
          guardarPresupuesto(presupuestoStorage)
          guardarPresupuestoValido(true)
        }

      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()

  }, [])

  useEffect(() => {
    
    if(presupuestoValido){
      const almacenarPresupuestoStorage =  async() => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }

      almacenarPresupuestoStorage()
    }

  }, [presupuestoValido])

  useEffect(() => {
    const obtenerGastosStorage = async () => {
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos')
        guardarGastos(gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  }, [])

  useEffect(() => {

    const guardarGastosStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage();
    
  }, [gastos])
  
  const handleNuevoPresupuesto = (presupuesto) => {
    if(Number(presupuesto) > 0){
      guardarPresupuestoValido(true)
    }
    else {
      Alert.alert(
        'Error', 'El presupuesto no puede ser 0 o menor', 'Ok'
      )
    }
  }

  const guardarGasto = (gasto) => {
    if([ gasto.nommbre, gasto.categoria, gasto.cantidad ].includes('')){
      Alert.alert(
        'Error', 'Todos los campos son obligatorios', 'Ok'
      )
      return
    }

    if (gasto.id){
      // Actualizar gastos
      const gastosActualizados = gastos.map( gastoActualizado => gastoActualizado.id === gasto.id ? gasto : gastoActualizado)
      guardarGastos(gastosActualizados)
    } else {
      // Añadir el nuevo gasto al state
      gasto.id = generarId();
      gasto.fecha = Date.now()

      guardarGastos([...gastos, gasto])
    }

    mostrarModal(!modal)
  }

  const eliminarGasto = id => {
    Alert.alert(
      '¿Deseas eliminar este registro?', 'Un registro eliminado no se puede recuperar', [
      { text: "No", style:'cancel' },
      { text: "Si, eliminar", onPress: () => {

        const gastosActualizados = gastos.filter(gastoEliminar => gastoEliminar.id !== id)

        guardarGastos(gastosActualizados)
        mostrarModal(!modal)
        setGasto({})
      } }
    ]);
  }

  const resetApp = () => {
    Alert.alert(
      'Deseas resetar la app',
      'Esto eliminara presupuesto y gastos',
      [
        { text: 'No', style: 'cancel'},
        { text: 'Si, eliminar', onPress: async() => {
          try {
            await AsyncStorage.clear();

            guardarPresupuestoValido(false);
            guardarPresupuesto('');
            guardarGastos([]);
          } catch (error) {
            console.log(error)
          }
        }}
      ]
    )
  }

  return (
    <View style={styles.contenedor}>
      <ScrollView>
        <View style={styles.header}>
          <Header/>

          { 
          !presupuestoValido 
            ? (
              <NuevoPresupuesto 
                presupuesto = {presupuesto}
                guardarPresupuesto = {guardarPresupuesto}
                handleNuevoPresupuesto = {handleNuevoPresupuesto}
              />
              )
            : (
              <ControlPresupuesto
                presupuesto = {presupuesto}
                gastos = {gastos}
                resetApp = {resetApp}
              />
            )
          }

        </View>

        {presupuestoValido &&
            (
              <>
              {gastos.length > 0  && (
                <Filtro
                  filtro = {filtro}
                  guardarFiltro = {guardarFiltro}
                  gastos = {gastos}
                  guardarGastosFiltrados = {guardarGastosFiltrados}
                />
              )}
              
              <ListadoGastos
                gastos = {gastos}
                mostrarModal = {mostrarModal}
                setGasto = {setGasto}
                filtro = {filtro}
                gastosFiltrados = {gastosFiltrados}
                guardarFiltro = {guardarFiltro}
                guardarGastosFiltrados = {guardarGastosFiltrados}
              />
              </>
              
            )
        }
      </ScrollView>

      {modal && (
        <Modal
        animationType='slide'
        visible={modal}
        onRequestClose={() => {
          mostrarModal(!modal)
        }}
      >
       <FormularioGasto
        mostrarModal={mostrarModal}
        guardarGasto = {guardarGasto}
        eliminarGasto = {eliminarGasto}
        gasto = {gasto}
        setGasto = {setGasto}
       /> 
      </Modal>
      )}

      {presupuestoValido && 
        (
        <Pressable onPress={ () => mostrarModal(!modal)}>
          <Image style={styles.botonAgregar} source={require('./src/img/nuevo-gasto.png')}  />
        </Pressable>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex:1,
    backgroundColor: '#F5F5F5',
  },
  header:{
    backgroundColor: '#3B82F6',
    minHeight: 400
  },
  botonAgregar:{
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 40,
    right: 30
  }
})

export default App;
