import {useState, useRef, useEffect, useMemo} from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


function App() {
// State 설정  
  const [data, setData] = useState([]);


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
    
    console.log(initData);
    setData(initData);
  };



// Update 
  useEffect(()=>{
    getData();
  }, []);



// 저장 관련 State 변경 함수  
  const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
        author, 
        content,
        emotion,
        created_date,
        id : dateId.current
      }
      dateId.current += 1;
      setData([newItem, ...data]);
  };



// 삭제 관련 State 변경 함수 
  const onRemove = (targetId)=>{
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    setData(newDiaryList);
  }



// 수정 관련 state 변경 함수 
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) => 
        it.id === targetId ? {...it, content:newContent} : it)
    )
  }
  


// Memoization : 일기 분석 값 return
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

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
