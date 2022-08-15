import {useRef, useEffect, useMemo, useCallback, useReducer} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


const reducer = (state, action)=> {
  switch(action.type){
    case 'INIT': {
      return action.data
    }

    case 'CREATE': {
      const created_date = new Date().getTime()
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }

    case 'REMOVE': {
      return state.filter((it) => it.id !== action.targetId);
    }

    case 'EDIT': {
      return state.map((it) => 
      it.id === action.targetId ? {...it, content:action.newContent} : it);
    }
    
    default :
      return state;
  }
}

function App() {
// useState를 이용하여 State 설정  
  //const [data, setData] = useState([]);


// useReducer를 이용하여 State 설정 
  const [data, dispatch] = useReducer(reducer, []);

  
// id 설정을 위한 Reference Object
  const dateId = useRef(0);


// API 호출 
  const getData = async() =>{
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
      ).then((res) => res.json())
    
    const initData = res.slice(0, 20).map((it)=>{
      return {
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random() * 5) + 1,
        created_date : new Date().getTime(),
        id: dateId.current++
      };
    });

    dispatch({type:"INIT", data:initData})
  };



// Update 
  useEffect(()=>{
    getData();
  }, []);



// 저장 관련 State 변경 함수  
// useCallback : 함수 재사용 
  const onCreate = useCallback((author, content, emotion) => {

      dispatch({
        type:'CREATE', 
        data:{author, content, emotion, id : dateId.current}
      })

      dateId.current += 1;
  }, []);



// 삭제 관련 State 변경 함수 
  const onRemove = useCallback((targetId)=>{
    dispatch({type:"REMOVE", targetId})
  }, []);



// 수정 관련 state 변경 함수 
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type : "EDIT", targetId, newContent})
  }, []);
  


// Memoization : 일기 분석 값 return
  const getDiaryAnalysis = useMemo(() => {
    // 1) 기분이 좋은 일기 개수 
    const goodCount = data.filter((it)=> it.emotion >= 3).length;
    
    // 2) 기분이 나쁜 일기 개수
    const badCount = data.length - goodCount;

    // 3) 기분이 좋은 일기 비율 
    const goodRatio = (goodCount / data.length) * 100;

    return {goodCount, badCount, goodRatio};
    }, [data.length]
  );



// 일기 분석 결과 비구조화 할당 
  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;



  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>

      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 : {goodCount}</div>
      <div>기분 나쁜 일기 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>

      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
};

export default App;
