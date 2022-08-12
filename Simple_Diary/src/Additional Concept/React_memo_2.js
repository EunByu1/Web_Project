// component 재사용하는 실습용 

import React, {useState, useEffect} from "react";

// 첫번째 자식 Component
const CounterA = React.memo(({count}) => {
    useEffect(()=>{
        console.log(`CounterA Update - count: ${count}`);
    });
    return <div>{count}</div>
});



// 두번째 자식 Component
const CounterB = React.memo(({obj}) => {
    useEffect(()=>{
        console.log(`CounterB Update - count: ${obj.count}`);
    });

    return <div>{obj.count}</div>
});

const OptimizeTest = () => {

    const [count, setCount] = useState(1);
    const [obj, setObj] = useState({
        count : 1
    });

    return (
        <div style={{padding: 50}}>
            <div>
                <h2>Counter A</h2>
                <CounterA count = {count} />
                <div>값이 변하지 않았으므로 React.memo 작동 안함</div>
                <button onClick={()=>setCount(count)}>A button</button>
            </div>

            <div>
                <h2>Counter B</h2>
                <CounterB obj = {obj} />
                <div>객체 비교 => 얕은 비교</div>
                <button onClick={()=>setObj({
                    count : obj.count
                })}>B button</button>
            </div>
        </div>
    );
};

export default OptimizeTest;
