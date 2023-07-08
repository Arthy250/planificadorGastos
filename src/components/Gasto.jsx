import { View, Text, Image, Pressable } from "react-native";
import { gastoStyles } from "../styles";
import { formatearCantidad, formatearFecha } from "../helpers";
import { diccionarioIconos } from "../db/DiccionarioIconos";

const Gasto = ({gasto, mostrarModal, setGasto}) => {

    const {nombre, cantidad, categoria, fecha, id} = gasto

    const handleAcciones = () => {
        mostrarModal(true)
        setGasto(gasto)
    }

    return ( 
        <Pressable onPress={() => handleAcciones()} style={gastoStyles.contenedor}>
            <View style={gastoStyles.contenido}>
                <View style={gastoStyles.contenedorImagen}>
                    <Image style={gastoStyles.imagen} source={ diccionarioIconos[categoria] }/>
                    <View style={gastoStyles.contenedorTexto}>
                        <Text style={gastoStyles.nombre}>{nombre}</Text>
                        <Text style={gastoStyles.categoria}>{categoria}</Text>
                        <Text style={gastoStyles.fecha}>{formatearFecha(fecha)}</Text>
                    </View>
                </View>
                <Text style={gastoStyles.cantidad}>{formatearCantidad(cantidad)}</Text>
            </View>
        </Pressable>
     );
}
 
export default Gasto;