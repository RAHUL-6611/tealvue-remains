import { useState, useEffect } from 'react'


function UseDimension(){

    const [dimension, setDimension] = useState({
		width: document.documentElement.clientWidth,
		height: document.documentElement.clientHeight,
	});
    useEffect(()=>{
        function setNewDimension(){
            setDimension({
                width : document.documentElement.clientWidth,
                height : document.documentElement.clientHeight
            })
        }

            window.addEventListener("resize", setNewDimension);
            return () => window.removeEventListener("resize", setNewDimension);
        
    },[])

    return { dimension, setDimension};
}

export default UseDimension