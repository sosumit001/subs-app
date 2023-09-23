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
            <section style={ModalContentStyle}  >
                <button className='w-[70px] h-[70px] bg-violet-600 text-blue-50 rounded-[50%]' style={{position:'absolute', top:'50%', right:'0rem', transform:'translate(50%, -50%)' }} onClick={()=>{
                    props?.onClose()
                }}>esc</button>

                <img  style={{ borderRadius: '5px' }} loading="lazy" width={250} height={250} src={props.src} alt="rick and morty" />
                <div style={{opacity:0, animation:'opacityInc 1s forwards'}}>
                <div>{props?.name}</div>
                <div>{props?.origin.name}</div>
                <div>{props?.status}</div>
                </div>

            </section>
        </main>
    )
}

export default Modal