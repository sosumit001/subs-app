import React from 'react'

const ModalStyle = {
    width:'100%',
    height:'100%',
    position: 'fixed',
    top: '0',
    left: '0',
    display:'grid',
    placeContent:'center',
    backdropFilter: "brightness(50%)",
    zIndex:'999'
}

const ModalContentStyle = {
    position:'relative',
    background:'whitesmoke',
    padding:'2rem',
    width:'50%',
    height: '50%',
    borderRadius:'5px',
    animation: "modalPop .3s ease-in-out forwards"
}


const Modal = (props) => {
    return (
        <main style={ModalStyle}>
            <section style={ModalContentStyle}>
                <button  onClick={()=>{
                    props?.onClose()
                }}>esc</button>

            </section>
        </main>
    )
}

export default Modal