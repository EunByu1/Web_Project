// component 재사용하는 실습용 

import React, {useState, useEffect} from "react";

// 첫번째 자식 Component 
// prop인 text가 바뀌지 않으면, rendering 안일어남
const Textview = React.memo(({text}) => {
    useEffect(()=>{
        console.log(`Update :: Text : ${text}`);
    });

    return <div>{text}</div>;
})

// 두번째 자식 Component
// prop인 count가 바뀌지 않으면, rendering 안일어남
const Countview = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`Update :: count : ${count}`);
    })
    return <div>{count}</div>
})


const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [text, setText] = useState("");

    return (
        <div style={{padding: 50}}>
            <div>
                <h2>Count</h2>
                <Countview count = {count}/>
                <button onClick={()=>setCount(count+1)}>+</button>
            </div>

            <div>
                <h2>text</h2>
                <Textview text={text}/>
                <input value = {text}
                       onChange={(e)=>setText(e.target.value)} />
            </div>
        </div>
    )
};

export default OptimizeTest;
