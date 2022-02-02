const Span = ({ children, fontSize }) => {

    const styles = {
        fontSize: `${fontSize}px`,
        color: `#3174e5`,
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '1.3em'
    }

    return(
        <span style={styles}>
            {children}
        </span>
    )
}

export default Span;