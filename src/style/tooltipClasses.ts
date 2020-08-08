const tooltipClasses = {
    tooltip: {
        fontSize: '2vh',
        lineHeight: '2vh',
        fontWeight: 'normal',
        backgroundColor: '#555',
        color: 'white',
        textAlign: 'center',
        padding: '5px 5px',
        borderRadius: '5px',
        position: 'absolute',
        zIndex: '1001',
        bottom: '100%',
        left: '0',
        opacity: '0',
        transition: 'opacity 0.3s',
        visibility: 'hidden',
        userSelect: 'none',
        '&::after':  {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, 0)',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: '#555 transparent transparent transparent',
        }
    },
    tooltipTarget: {
        '&:hover $tooltip': {
            visibility: 'visible',
            opacity: 1,
        }
    }
}

export default tooltipClasses