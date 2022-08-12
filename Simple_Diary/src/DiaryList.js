import DiaryItem from "./DiaryItem";

const DiaryList = ({onRemove, diaryList, onEdit}) => {
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>

            <div>
                {diaryList.map((it)=>(
                    // key값은 map이 가져가고, props로는 {...it}이 전달됨!
                    <DiaryItem key={it.id} onRemove={onRemove} onEdit={onEdit} {...it}/>
                ))}
            </div>
        </div>
    );
}

DiaryList.defaultProps = {
    diaryList:[],
}; 

export default DiaryList;
