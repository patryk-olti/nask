const Span = ({ children, fontSize }: any) => {

    const styles = {
        fontSize: `${fontSize}rem`,
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