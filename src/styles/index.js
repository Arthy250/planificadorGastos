const globalStyles = {
    contenedor:{
        backgroundColor:'#fff',
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 20,
        transform: [{
            translateY: 50
        }],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'
    },
    titulo:{
        textAlign:'center',
        fontSize: 30,
        color:'#64748B',
        fontWeight: '700'
    },
}

export const modalStyles = {
    modal:{
        flex: 1,
        backgroundColor: '#1E40AF',
    },
    contenedorBotones:{
        flexDirection: 'row',
        marginTop: 30
    },
    btn:{
        flex: 1,
        padding: 10,
        marginHorizontal:10
    },
    btnEliminar:{
        backgroundColor: 'red'
    },
    btnCancelar:{
        backgroundColor: '#DB2777'
    },
    btnTexto:{
        color: '#fff',
        textAlign: 'center',
        fontWeight:'600',
        textTransform: 'uppercase'
    },
    formulario:{
        ...globalStyles.contenedor,
        transform: [{
            translateY: 40
        }],
    },
    titulo:{
        textAlign:'center',
        fontSize: 30,
        marginBottom: 30,
        color:'#64748B'
    },
    campo:{
        marginVertical: 10
    },
    label:{
        color:'#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight:'600'
    },
    input:{
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    botonAgregar:{
        backgroundColor: '#3B82F6',
        padding:10,
        marginTop: 20
    }
}

export const gastoStyles = {
    contenedor:{
        ...globalStyles.contenedor,
        transform: [{
            translateY: 30
        }],
        marginBottom: 20
    },
    contenido:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    contenedorImagen:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    imagen:{
        width: 80,
        height: 80,
        marginRight: 20
    },
    contenedorTexto:{
        flex: 1,
    },
    categoria:{
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    nombre:{
        fontSize: 22,
        color:'#64748B',
        marginBottom: 5
    },
    cantidad:{
        fontSize: 20,
        fontWeight: '700'
    },
    fecha:{
        fontWeight: '700',
        fontSize: 16,
        color: '#DB2777'
    }
}

export const filtroStyles ={
    contenedor:{
        ...globalStyles.contenedor,
        transform: [{translateY:0}],
        marginTop: 80
    },
    label:{
        fontSize: 22,
        fontWeight: '700',
        color: '#64748B'
    }
}

export default globalStyles