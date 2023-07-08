import { useEffect, useState } from 'react';
import { SafeAreaView, Text, TextInput, View, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { modalStyles } from '../styles';


const FormularioGasto = ({
    mostrarModal,
    guardarGasto,
    eliminarGasto,
    setGasto,
    gasto
}) => {

    const [nombre, guardarNombre] = useState('')
    const [cantidad, guardarCantidad] = useState('')
    const [categoria, guardarCategoria] = useState('')
    const [id, guardarId] = useState('')
    const [fecha, guardarFecha] = useState('')

    useEffect(() => {
        if(gasto?.nombre){
            guardarNombre(gasto.nombre)
            guardarCantidad(gasto.cantidad)
            guardarCategoria(gasto.categoria)
            guardarId(gasto.id)
            guardarFecha(gasto.fecha)
        } 
      }, [gasto])
      

    return ( 
        <SafeAreaView style={modalStyles.modal}>

            <View style={modalStyles.contenedorBotones}>

            <Pressable 
                style={[modalStyles.btn, modalStyles.btnCancelar]}
                onPress={() => {
                    mostrarModal(false)
                    setGasto({})
                }}
                >
                <Text style={modalStyles.btnTexto}>Cancelar</Text>
            </Pressable>

            <Pressable 
                style={[modalStyles.btn, modalStyles.btnEliminar]}
                onPress={() => eliminarGasto(id)}
                >
                <Text style={modalStyles.btnTexto}>Eliminar</Text>
            </Pressable>
            </View>

            <View style={modalStyles.formulario}>

                <View>
                    {gasto?.nombre 
                    ? <Text style={modalStyles.titulo}>Editar gasto</Text>
                    : <Text style={modalStyles.titulo}>Nuevo gasto</Text>
                    }
                    
                </View>

                <View style={modalStyles.campo}>
                    <Text style={modalStyles.label}>Nombre gasto</Text>
                    <TextInput 
                        style={modalStyles.input}
                        placeholder='Nombre del gasto ej. comida'
                        placeholderTextColor='#00000040'
                        onChangeText={ guardarNombre }
                        value={nombre}
                    />
                </View>

                <View style={modalStyles.campo}>
                    <Text style={modalStyles.label}>Cantidad gasto</Text>
                    <TextInput
                        keyboardType='numeric'
                        style={modalStyles.input}
                        placeholder='Nombre del gasto ej. 300'
                        placeholderTextColor='#00000040'
                        onChangeText={ guardarCantidad }
                        value={cantidad}
                    />
                </View>

                <View style={modalStyles.campo}>
                    <Text style={modalStyles.label}>Categoria gasto</Text>
                    <Picker 
                        selectedValue={categoria}
                        onValueChange={ (valor) => {
                            guardarCategoria(valor)
                        }}
                        >
                        <Picker.Item label='-- Seleccione --' value=''/>
                        <Picker.Item label='Ahorro' value='ahorro'/>
                        <Picker.Item label='Comida' value='comida'/>
                        <Picker.Item label='Casa' value='casa'/>
                        <Picker.Item label='Varios' value='varios'/>
                        <Picker.Item label='Ocio' value='ocio'/>
                        <Picker.Item label='Salud' value='salud'/>
                        <Picker.Item label='Suscripciones' value='suscripciones'/>
                    </Picker>
                </View>

                <Pressable 
                    style={modalStyles.botonAgregar}
                    onPress={ () => guardarGasto({
                        nombre,
                        cantidad,
                        categoria,
                        id,
                        fecha
                    })}>
                    {gasto?.nombre
                    ? <Text style={modalStyles.btnTexto}>Actualizar</Text>
                    : <Text style={modalStyles.btnTexto}>Guardar</Text>
                    }
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
 
export default FormularioGasto;