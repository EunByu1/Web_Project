import React, {useEffect, useState} from "react";

const UnmountTest = () => {

    useEffect(()=>{
        console.log("Mount!");

        return ()=>{
            // UnMount 시점에 실행되게 됨
            console.log("UnMount!")
        }
    }, [])
    return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
    const [isVisible, setIsVisiblet ] = useState(false);
    const toggle = () => setIsVisiblet(!isVisible);

    return (
    <div style={{padding:20}}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest/>}
    </div>
    );
};

export default Lifecycle;
