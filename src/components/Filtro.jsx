import { View, Text } from "react-native";
import { filtroStyles } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";

const Filtro = ({filtro, guardarFiltro, gastos, guardarGastosFiltrados}) => {

    useEffect(() => {

      if(filtro === ''){
        guardarGastosFiltrados([])
      } else {
        const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro );
        guardarGastosFiltrados(gastosFiltrados)
      }

    }, [filtro])
    

    return ( 
        <View style={filtroStyles.contenedor}>
            <Text style={filtroStyles.label}>Filtrar gastos</Text>

            <Picker 
                selectedValue={filtro}
                onValueChange={(valor) => {
                    guardarFiltro(valor)
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
     );
}


 
export default Filtro;